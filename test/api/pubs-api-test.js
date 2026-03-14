import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { testUser, userCredentials, testUsers, testNewPubPayload, testPubPayloads } from "../fixtures.js";
import { placeMarkService } from "./place-mark-service.js";

suite("Pub API tests", () => {
  setup(async () => {
    placeMarkService.clearAuth();
    try {
      await placeMarkService.createUser(testUser);
    } catch (e) {
      // may already exist from a previous run
    }
    await placeMarkService.authenticate(userCredentials);
    await placeMarkService.deleteAllUsers();
    await placeMarkService.createUser(testUser);
    await placeMarkService.authenticate(userCredentials);
    await placeMarkService.deleteAllPubs();
  });

  teardown(async () => {});

  test("create a pub", async () => {
    const returnedPub = await placeMarkService.createPub(testNewPubPayload);
    assertSubset({ name: testNewPubPayload.name, description: testNewPubPayload.description }, returnedPub);
    assert.isDefined(returnedPub._id);
  });

  test("get a pub - success", async () => {
    const created = await placeMarkService.createPub(testNewPubPayload);
    const returnedPub = await placeMarkService.getPub(created._id);
    assert.deepEqual(created, returnedPub);
  });

  test("get a pub - bad id", async () => {
    try {
      await placeMarkService.getPub("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a pub - deleted pub", async () => {
    const created = await placeMarkService.createPub(testNewPubPayload);
    await placeMarkService.deletePub(created._id);
    try {
      await placeMarkService.getPub(created._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Pub with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("delete a pub - success", async () => {
    const created = await placeMarkService.createPub(testNewPubPayload);
    const response = await placeMarkService.deletePub(created._id);
    assert.equal(response.status, 204);
    const returnedPubs = await placeMarkService.getAllPubs();
    assert.equal(returnedPubs.length, 0);
  });

  test("delete a pub - bad id", async () => {
    try {
      await placeMarkService.deletePub("not-an-id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("update a pub - success", async () => {
    const created = await placeMarkService.createPub(testNewPubPayload);
    const updatedPayload = { ...testNewPubPayload, name: "Updated Pub Name" };
    const returnedPub = await placeMarkService.updatePub(created._id, updatedPayload);
    assert.equal(returnedPub.name, "Updated Pub Name");
    assert.equal(returnedPub._id, created._id);
  });

  test("get pubs by category", async () => {
    for (let i = 0; i < testPubPayloads.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placeMarkService.createPub(testPubPayloads[i]);
    }

    const returnedPubs = await placeMarkService.getAllPubs("daytime");
    assert.equal(returnedPubs.length, testPubPayloads.length);
  });
});
