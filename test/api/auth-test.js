import { assert } from "chai";
import { placeMarkService } from "./place-mark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { testUser, userCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    placeMarkService.clearAuth();
    await placeMarkService.createUser(testUser);
    await placeMarkService.authenticate(userCredentials);
    await placeMarkService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await placeMarkService.createUser(testUser);
    const response = await placeMarkService.authenticate(userCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await placeMarkService.createUser(testUser);
    const response = await placeMarkService.authenticate(userCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    placeMarkService.clearAuth();
    try {
      await placeMarkService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
