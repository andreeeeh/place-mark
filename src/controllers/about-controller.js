export const aboutController = {
  index: {
    handler: function (request, h) {
      return h.view("main", { title: "About PlaceMark", isAuthenticated: request.auth.isAuthenticated });
    },
  },
};
