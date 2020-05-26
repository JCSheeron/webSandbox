// Find duplicate names in the names collection.
// Then remove any references to the duplicates in the contests collection,
// but if there were any references to duplicates, then leave a reference to what
// will be the remaining, non duplicated name.
// Finally, remove the duplicates from the names collection.

import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(
  config.mongodbUri,
  { useUnifiedTopology: true },
  (err, client) => {
    assert.equal(null, err);
    // Deal with duplicate names in the names collextion each with unique Ids.
    // First group the ids into a set of duplcates. Then store all the dups but
    // one in a dups array, and the other one in a nonDups array.  Remove all
    // references in the Contests.nameIds field to the dups, and add a reference
    // to the non-dup.
    //
    // Use group on _id field to return unique ids with the same name.
    // The returned object will have this list of objects within an object structure:
    // {
    //    { _id: {name: <name> }, uniqueIds: [id1, id2 ...], count: n },
    //    { <object for next name with duplicate ids> }
    // }
    // Use count and match so that only cases with more than one uniqueId are considered.
    // Use .toArray so the final output is an array of objects, so the map
    // function can be used.
    // [
    //    { _id: {name: <name> }, uniqueIds: [id1, id2 ...], count: n },
    //    { <object for next name with duplicate ids> }
    // ]
    let dups = []; // will be an array of arrays containing duplicate name ids.
    let nonDups = []; // array of the non-duplicated id to retain.
    client
      .db('fulljs')
      .collection('names')
      .aggregate([
        {
          $group: {
            _id: { name: '$name' },
            uniqueIds: { $addToSet: '$_id' },
            count: { $sum: 1 }
          }
        },
        { $match: { count: { $gt: 1 } } }
      ])
      .toArray()
      .then((dupObjs) => {
        // If there aren't any dups, there is nothing to do!
        if (dupObjs.length) {
          console.log('Duplicates found!');
          dups = dupObjs.map((obj) => obj.uniqueIds);
          // dups has this structure:
          // [
          //  [ _id1 for name 1, ... , _idn for name 1]
          //  [ _id1 for name 2, ... , _idm for name 2]
          //  ...
          // ]
          // Go thru the dups array. shift off the first element for each
          // name and put it into the nonDups array. This serves two purposes:
          // to retain 1 id in hte nonDups array, and to make the dups array only
          // contain ids that will be removed.
          dups.forEach((element) => nonDups.push(element.shift()));
          console.log('dups');
          console.log(dups);
          console.log('non dups');
          console.log(nonDups);
          // now for each name with a dup id find the contests that reference the dup ids
          // remove the duplicate reference and replace them with the retained reference.
          // Note the dups array is an array of arrays, so each element is an array list
          // of ids.
          dups.forEach((d_ele, d_idx) => {
            client
              .db('fulljs')
              .collection('contests')
              .find({ nameIds: { $in: d_ele } })
              .toArray()
              .then((ctests) => {
                // These contests contain the duplicated ids
                // For each one, remove the duplicates and use the dup index to add
                // in the retained id (the dup and nondup arrays are parallel
                // such that the indexes correspond
                ctests.forEach((c_ele) => {
                  console.log(`Handling dups in contest id: ${c_ele._id}`);
                  console.log(`    Deleting dup id: ${d_ele}`);
                  // Remove the dup id from the contest
                  client
                    .db('fulljs')
                    .collection('contests')
                    .updateOne(
                      { _id: c_ele._id },
                      { $pull: { nameIds: { $in: d_ele } } },
                      {}
                    )
                    .then(() => {
                      console.log(
                        `    Adding in retained id: ${nonDups[d_idx]}`
                      );
                      // Add the retained id. Use add to set so it is added only once.
                      client
                        .db('fulljs')
                        .collection('contests')
                        .updateOne(
                          { _id: c_ele._id },
                          { $addToSet: { nameIds: nonDups[d_idx] } },
                          {}
                        )
                        .then(() => {
                          // Now remove duplicate ids from the names collection.
                          console.log(
                            `Deleted dup id from names collection: ${d_ele}`
                          );
                          client
                            .db('fulljs')
                            .collection('names')
                            .deleteMany({ _id: { $in: d_ele } })
                            // all done!
                            .then(() => {
                              client.close();
                            });
                        });
                    });
                });
              });
          });
        } else {
          // No duplicates found!
          console.log('No duplicates names in the names collection found!');
          client.close();
        }
      })
      .catch(console.error);
  }
);
/*
// 
  // Remove duplicated name ids from the nameIds field in the contests collection
MongoClient.connect(
  config.mongodbUri,
  { useUnifiedTopology: true },
  (err, client) => {
    assert.equal(null, err);
    client
      .db('fulljs')
      .collection('contests')
      // find contests with at least two name ids.
      .find(
        { 'nameIds.1': { $exists: true } },
        { projection: { name: 1, nameIds: 1 } }
      )
      .toArray()
      .then((ctests) => {
        // We have the contests to dedup the name ids on.
        // For each contest, remove the name ids, and then
        // put them back in with the $addToSet function, which
        // will ignore additions if there is already one present.
        ctests.forEach((ctest) => {
          console.log('Removing nameIds');
          client
            .db('fulljs')
            .collection('contests')
            .updateOne({ _id: ctest._id }, { $set: { nameIds: [] } })
            .then(() => {
              console.log('Updating nameIds');
              client
                .db('fulljs')
                .collection('contests')
                .updateOne(
                  { _id: ctest._id },
                  { $addToSet: { nameIds: { $each: ctest.nameIds } } }
                )
                .then(() => {
                  client.close();
                });
            });
        });
      })
      .catch(console.error);
  }
);
*/
