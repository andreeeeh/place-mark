import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testNewPub, testPubList, testUser } from "../fixtures.js";

suite("Pub Model tests", () => {
  let user;
  let testPubs;

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
    await db.pubStore.deleteAll();

    user = await db.userStore.addUser(testUser);

    testPubs = [];
    for (let i = 0; i < testPubList.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const pub = await db.pubStore.addPub({ ...testPubList[i], userId: user._id });
      testPubs.push(pub);
    }
  });

  test("create a pub", async () => {
    const newPub = await db.pubStore.addPub({ ...testNewPub, userId: user._id });
    assert.containSubset(newPub, testNewPub);
    assert.isDefined(newPub._id);
  });

  test("delete all pubs", async () => {
    let returnedPubs = await db.pubStore.getAllPubs();
    assert.equal(returnedPubs.length, 3);
    await db.pubStore.deleteAll();
    returnedPubs = await db.pubStore.getAllPubs();
    assert.equal(returnedPubs.length, 0);
  });

  test("get a pub - success", async () => {
    const pub = await db.pubStore.addPub({ ...testNewPub, userId: user._id });
    const returnedPub = await db.pubStore.getPubById(pub._id);
    assert.containSubset(returnedPub, testNewPub);
  });

  test("delete one pub - success", async () => {
    await db.pubStore.deletePubById(testPubs[0]._id);
    const returnedPubs = await db.pubStore.getAllPubs();
    assert.equal(returnedPubs.length, testPubs.length - 1);

    const deletedPub = await db.pubStore.getPubById(testPubs[0]._id);
    assert.isNull(deletedPub);
  });

  test("get a pub - bad params", async () => {
    let nullPub = await db.pubStore.getPubById("");
    assert.isNull(nullPub);
    nullPub = await db.pubStore.getPubById();
    assert.isNull(nullPub);
  });

  test("delete one pub - fail", async () => {
    await db.pubStore.deletePubById("bad-id");
    const allPubs = await db.pubStore.getAllPubs();
    assert.equal(allPubs.length, testPubs.length);
  });

  test("update a pub", async () => {
    const pubToUpdate = testPubs[0];
    const updatedPubData = {
      _id: pubToUpdate._id,
      name: "Updated Pub Name",
      description: "Updated description",
      latitude: 53.31,
      longitude: -6.2,
      categories: {
        daytime: false,
        nighttime: true,
        liveMusic: true,
        dj: true,
      },
    };

    await db.pubStore.updatePub(updatedPubData);
    const returnedPub = await db.pubStore.getPubById(pubToUpdate._id);

    assert.equal(returnedPub.name, updatedPubData.name);
    assert.equal(returnedPub.description, updatedPubData.description);
    assert.equal(returnedPub.latitude, updatedPubData.latitude);
    assert.equal(returnedPub.longitude, updatedPubData.longitude);
    assert.deepEqual(returnedPub.categories, updatedPubData.categories);
  });
});
