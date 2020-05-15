import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, client) => {
  assert.equal(null, err);

  let contestCount = 0;
  client
    // get all the contests
    .db('fulljs')
    .collection('contests')
    .find({})
    .each((err, contest) => {
      assert.equal(null, err);
      if (!contest) {
        return;
      }

      contestCount++;
      client
        // for each contest, get the _id for every manual name id associated with the contest
        .db('fulljs')
        .collection('names')
        .find({ id: { $in: contest.nameIds } })
        .project({ _id: 1 })
        // put the ids in an array of objects
        // [ { _id: ObjectId("xxxx") }, {...}, {...} ]
        // then create a new array mapping each element to its _id,
        // so this second array is just an array of ObjectIDs
        .toArray()
        .then((_ids) => {
          const newIds = _ids.map((o) => o._id);
          client
            // Then for each contest, update the nameIds to be the array of
            // object ids.
            .db('fulljs')
            .collection('contests')
            .updateOne({ id: contest.id }, { $set: { nameIds: newIds } })
            .then(() => {
              console.info('Updated', contest._id);
              contestCount--;
              if (contestCount === 0) {
                client.close();
              }
            });
        })
        .catch(console.error);
    });
});
