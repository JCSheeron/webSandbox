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
        dups.forEach((element, idx) => {
          // remove the duplicate ids
          client
            .db('fulljs')
            .collection('contests')
            .update(
              { nameIds: { $in: element } },
              { $pull: { nameIds: { $in: element } } },
              { multi: true }
            )
            .then(() => {
              // Now we want to add in the id we want to retain.
              // Use addToSet so it is only added if not there already
              client
                .db('fulljs')
                .collection('contests')
                .update(
                  { nameIds: { $in: element } },
                  { $addToSet: { nameIds: nonDups[idx] } },
                  {}
                )
              .then(() => {
                // now remove duplicate names from the names collection.
                client
                  .db('fulljs')
                  .collection('names')
                  .deleteMany({ _id: { $in: element } });
              });
            });
          });
        }
      .catch(console.error);
);

