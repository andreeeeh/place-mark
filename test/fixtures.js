export const serviceUrl = "http://localhost:3000";

export const testUser = {
  firstName: "Maggie",
  lastName: "Simpson",
  email: "maggie@simpson.com",
  password: "secret",
};

export const userCredentials = {
  email: "maggie@simpson.com",
  password: "secret",
};
export const testUsers = [
  {
    firstName: "Homer",
    lastName: "Simpson",
    email: "homer@simpson.com",
    password: "secret",
  },
  {
    firstName: "Marge",
    lastName: "Simpson",
    email: "marge@simpson.com",
    password: "secret",
  },
  {
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret",
  },
];

// source: https://www.visitdublin.com/
export const testNewPub = {
  name: "Mulligan's",
  description: "It has been at the core of the city's cultural and imbibing life for nearly 300 years.",
  latitude: 53.34699497584233,
  longitude: -6.255104528837972,
  categories: {
    daytime: true,
    nighttime: true,
    liveMusic: false,
    dj: false,
  },
};

// source: https://www.visitdublin.com/
export const testPubList = [
  {
    name: "The Brazen Head",
    description: "Dating back to 1198, The Brazen Head is one of Ireland's oldest pubs",
    latitude: 53.34510638975115,
    longitude: -6.275298041026639,
    categories: { daytime: true, nighttime: true, liveMusic: false, dj: false },
  },
  {
    name: "The Temple Bar",
    description: "A genuinely warm welcome backed up by first rate modern service and traditional Irish music, is the hallmark of this friendly spot in Dublin City centre.",
    latitude: 53.892853508136454,
    longitude: -3.6274771291586947,
    categories: { daytime: true, nighttime: true, liveMusic: true, dj: true },
  },
];

// Flat-format fixtures for API tests
export const testNewPubPayload = {
  name: "Mulligan's",
  description: "It has been at the core of the city's cultural and imbibing life for nearly 300 years.",
  latitude: 53.34699497584233,
  longitude: -6.255104528837972,
  daytime: true,
  nighttime: true,
  liveMusic: false,
  dj: false,
};

export const testPubPayloads = [
  {
    name: "The Brazen Head",
    description: "Dating back to 1198, The Brazen Head is one of Ireland's oldest pubs",
    latitude: 53.34510638975115,
    longitude: -6.275298041026639,
    daytime: true,
    nighttime: true,
    liveMusic: false,
    dj: false,
  },
  {
    name: "The Temple Bar",
    description: "A genuinely warm welcome. Traditional Irish music in Dublin City centre.",
    latitude: 53.892853508136454,
    longitude: -3.6274771291586947,
    daytime: true,
    nighttime: true,
    liveMusic: true,
    dj: true,
  },
];
