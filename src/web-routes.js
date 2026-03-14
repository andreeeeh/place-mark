import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
// import { commentController } from "./controllers/comment-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "POST", path: "/signup", config: accountsController.signup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "POST", path: "/login", config: accountsController.login },
  { method: "GET", path: "/logout", config: accountsController.logout },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/pub", config: dashboardController.create },
];
