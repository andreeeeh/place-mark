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
    firstName: "Bart",
    lastName: "Simpson",
    email: "bart@simpson.com",
    password: "secret",
  },
];

export const testNewPub = {
  name: "The Cobblestone",
  description: "Traditional pub with live music sessions.",
  latitude: 53.3498,
  longitude: -6.2789,
  categories: {
    daytime: true,
    nighttime: true,
    liveMusic: true,
    dj: false,
  },
};

export const testPubList = [
  {
    name: "The Brazen Head",
    description: "Historic pub in Dublin city.",
    latitude: 53.3438,
    longitude: -6.2867,
    categories: { daytime: true, nighttime: true, liveMusic: false, dj: false },
  },
  {
    name: "Whelan's",
    description: "Live venue with a lively atmosphere.",
    latitude: 53.3338,
    longitude: -6.2651,
    categories: { daytime: false, nighttime: true, liveMusic: true, dj: true },
  },
  {
    name: "The Stag's Head",
    description: "Classic Victorian-style pub.",
    latitude: 53.3442,
    longitude: -6.2645,
    categories: { daytime: true, nighttime: true, liveMusic: false, dj: false },
  },
];
