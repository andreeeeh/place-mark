import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { testUser, userCredentials, testUsers } from "../fixtures.js";
import { placeMarkService } from "./place-mark-service.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    placeMarkService.clearAuth();
    await placeMarkService.createUser(testUser);
    await placeMarkService.authenticate(userCredentials);
    await placeMarkService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await placeMarkService.createUser(testUsers[i]);
    }
    await placeMarkService.createUser(testUser);
    await placeMarkService.authenticate(userCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await placeMarkService.createUser(testUser);
    assertSubset(testUser, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await placeMarkService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await placeMarkService.deleteAllUsers();
    await placeMarkService.createUser(testUser);
    await placeMarkService.authenticate(userCredentials);
    returnedUsers = await placeMarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await placeMarkService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await placeMarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await placeMarkService.deleteAllUsers();
    await placeMarkService.createUser(testUser);
    await placeMarkService.authenticate(userCredentials);
    try {
      const returnedUser = await placeMarkService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
