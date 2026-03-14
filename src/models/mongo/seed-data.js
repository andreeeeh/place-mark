export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      password: "admin",
      isAdmin: true,
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      isAdmin: false,
    },
  },
  pubs: {
    _model: "Pub",
    mulligans: {
      name: "Mulligan's",
      description: "It has been at the core of the city's cultural and imbibing life for nearly 300 years.",
      latitude: 53.34699497584233,
      longitude: -6.255104528837972,
      categories: { daytime: true, nighttime: true, liveMusic: false, dj: false },
      userId: "->users.homer",
    },
    brazenHead: {
      name: "The Brazen Head",
      description: "Dating back to 1198, The Brazen Head is one of Ireland's oldest pubs",
      latitude: 53.34510638975115,
      longitude: -6.275298041026639,
      categories: { daytime: true, nighttime: true, liveMusic: false, dj: false },
      userId: "->users.homer",
    },
    templeBar: {
      name: "The Temple Bar",
      description: "A genuinely warm welcome backed up by first rate modern service and traditional Irish music, is the hallmark of this friendly spot in Dublin City centre.",
      latitude: 53.892853508136454,
      longitude: -3.6274771291586947,
      categories: { daytime: true, nighttime: true, liveMusic: true, dj: true },
      userId: "->users.homer",
    },
  },
};
