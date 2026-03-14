import { accountsController } from "./controllers/accounts-controller.js";
// import { dashboardController } from "./controllers/dashboard-controller.js";
// import { placeController } from "./controllers/place-controller.js";
// import { commentController } from "./controllers/comment-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "POST", path: "/signup", config: accountsController.signup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/login", config: accountsController.login },
  { method: "GET", path: "/logout", config: accountsController.logout },
  // { method: "GET", path: "/dashboard", config: dashboardController.index },

  // { method: "GET", path: "/places", config: placeController.index },
  // { method: "GET", path: "/place/create", config: placeController.showCreate },
  // { method: "POST", path: "/place", config: placeController.create },
  // { method: "GET", path: "/place/{id}", config: placeController.showDetails },
  // { method: "GET", path: "/place/{id}/edit", config: placeController.showEdit },
  // { method: "POST", path: "/place/{id}/update", config: placeController.update },
  // { method: "POST", path: "/place/{id}/delete", config: placeController.deletePlace },
  // { method: "GET", path: "/place/{id}/delete", config: placeController.deletePlace },

  // { method: "POST", path: "/place/{id}/comment", config: commentController.addComment },
  // { method: "GET", path: "/comment/{commentId}/delete", config: commentController.deleteComment },
];
