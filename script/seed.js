'use strict';

const db = require('../server/db');
const {User} = require('../server/db/models');
const {Room} = require('../server/db/models');
const {QueueItem} = require('../server/db/models');

const newUsers = [
  {
    name: 'wormat23',
    email: 'rick@email.com',
    accessToken:
      'BQDI4KgKbJhC8wM8UKP5iPwDxcZr44AhzOjHnJWt724Hr4CUNwAVLDhPMBKU92ZP-q1U5H-AX1Wpa3nF8bMuKiYN56hcYT8PGbyHCPKMP6_bUnxn_BC-osz0sg63tpVnP8EVMsdyYIGOI_DtonJpgks5sDNDcWw',
    refreshToken:
      'AQCc8evED7Of-W3EAUdmkwMj1BB-ID1tzFHqmiepEiSpjPLxkrG-cFR4AnotC5oe8TI7RS7LQ7R7V_O3_wTBT4ZjmHWDW7RbwqyBDHnVA-ehzqbTvl1bE9upVP_403Ds5Mk'
  },
  {
    name: 'Bruce',
    email: 'bruce@email.com',
    accessToken:
      'BQBArvKXXRkMA5Br6T6D7kCinRQ7VtnbRBlASLCuP9Tk9COzVMCH2iV6pqvw9U6pYH0CDSg86w5uiSzAm5k_YeE78cb_nOqnIulCGkd26r-frkEAjYRB_hjn7Yu8Er9swtrqXLh3UqSXFB7FdFrx7SZCcDjoAuUL',
    refreshToken:
      'AQCc8evED7Of-W3EAUdmkwMj1BB-ID1tzFHqmiepEiSpjPLxkrG-cFR4AnotC5oe8TI7RS7LQ7R7V_O3_wTBT4ZjmHWDW7RbwqyBDHnVA-ehzqbTvl1bE9upVP_403Ds5Mk',
    spotifyId: 'Bruce Ledbetter'
  },
  {
    name: 'monikrz',
    email: 'monica@email.com',
    accessToken:
      'BQAnlxNVDbu82zgg7HdfylJ8E1sHroXYNBhjJSBwEOY-v7cKGBAQeKTN-_Eczxx_J6S3_wyVi8O2zrywDXUaIABJKglSVmrR4mkOlM3ZgmrGMBsYBqU9lx0d2TDGKC2GuUFdzZ7OfsFWBZkD6BouOtNxaYfZgg',
    refreshToken:
      'AQCNndBudx31uRQv5ogINkqpbPmTOdb1zDtAjpiAU_l6t6y26Cwzlmjzvv3WVYn1Kv3qXBLumakK3e2uF27NOovrhueCpPBJ4Q5AHGYxRRVOitKzWh6AtM2J-17WWeXGCKo',
    spotifyId: 'monikrz'
  },
  {
    name: 'user1',
    email: 'user1@email.com',
    accessToken: 'fake user',
    refreshToken: 'fake refresh',
    spotifyId: 'user1'
  },
  {
    name: 'user2',
    email: 'user2@email.com',
    accessToken: 'fake user',
    refreshToken: 'fake refresh',
    spotifyId: 'user2'
  },
  {
    name: 'user3',
    email: 'user3@email.com',
    accessToken: 'fake user',
    refreshToken: 'fake refresh',
    spotifyId: 'user3'
  },
  {
    name: 'user4',
    email: 'user4@email.com',
    accessToken: 'fake user',
    refreshToken: 'fake refresh',
    spotifyId: 'user4'
  }
];

const newRooms = [
  {
    name: 'Party Town',
    isPrivate: 'TRUE',
    description: 'Hit the lights, lets git lit',
    imageUrl: 'https://media2.giphy.com/media/l1KcQWMydxGgfSudy/200.gif',
    createdBy: 8,
    allowAdd: 'TRUE',
    isDemocratic: 'TRUE',
    createdAt: '2018-08-21 14:56:49.227-04',
    updatedAt: '2018-08-21 14:56:49.227-04'
  },
  {
    name: 'SAD!',
    isPrivate: 'FALSE',
    description: "I'm sad, don't bother me",
    imageUrl: 'https://media0.giphy.com/media/MuztdWJQ4PR7i/200.gif',
    createdBy: 8,
    allowAdd: 'TRUE',
    isDemocratic: 'TRUE',
    createdAt: '2018-08-21 15:00:44.39-04',
    updatedAt: '2018-08-21 15:00:44.39-04'
  },
  {
    name: 'Running',
    isPrivate: 'FALSE',
    description: 'Running tracks',
    imageUrl: 'https://media1.giphy.com/media/vF25I06jdODgA/200.gif',
    createdBy: 8,
    allowAdd: 'FALSE',
    isDemocratic: 'FALSE',
    createdAt: '2018-08-21 15:03:36.638-04',
    updatedAt: '2018-08-21 15:03:36.638-04'
  },
  {
    name: 'SUmMeR',
    isPrivate: 'FALSE',
    description: "Soakin' up the sun",
    imageUrl: 'https://media0.giphy.com/media/3o6gDUsnPH5wwhdASQ/200.gif',
    createdBy: 8,
    allowAdd: 'FALSE',
    isDemocratic: 'FALSE',
    createdAt: '2018-08-21 15:05:10.598-04',
    updatedAt: '2018-08-21 15:05:10.598-04'
  },
  {
    name: 'EMO',
    isPrivate: 'FALSE',
    description: 'Its not a phase, mom!!!!',
    imageUrl: 'https://media3.giphy.com/media/QTqpJTLjQLFjq/200.gif',
    createdBy: 8,
    isDemocratic: 'FALSE',
    createdAt: '2018-08-21 15:06:21.723-04',
    updatedAt: '2018-08-21 15:06:21.723-04'
  },
  {
    name: 'Beers n Footy',
    isPrivate: 'FALSE',
    description: 'Sunday with the boys',
    imageUrl: 'https://media0.giphy.com/media/mOOuUUIEEgq6A/200.gif',
    createdBy: 8,
    allowAdd: 'TRUE',
    isDemocratic: 'FALSE',
    createdAt: '2018-08-21 15:07:26.674-04',
    updatedAt: '2018-08-21 15:07:26.674-04'
  },
  {
    name: 'Late night working',
    isPrivate: 'FALSE',
    description: 'Songs to keep you going',
    imageUrl: 'https://media3.giphy.com/media/11BbGyhVmk4iLS/200.gif',
    createdBy: 8,
    allowAdd: 'TRUE',
    isDemocratic: 'FALSE',
    createdAt: '2018-08-21 15:08:39.484-04',
    updatedAt: '2018-08-21 15:08:39.484-04'
  },
  {
    name: 'XXX',
    isPrivate: 'FALSE',
    description: "Xanthe's room",
    imageUrl: 'https://media2.giphy.com/media/l4FB6rJP7S6wxJvKU/200.gif',
    createdBy: 8,
    allowAdd: 'TRUE',
    isDemocratic: 'FALSE',
    createdAt: '2018-08-21 15:09:21.706-04',
    updatedAt: '2018-08-21 15:09:21.706-04'
  },
  {
    name: 'GYM',
    isPrivate: 'FALSE',
    description: 'Pump it',
    imageUrl: 'https://media3.giphy.com/media/3o7TKR1b2X2JqJ6JDW/200.gif',
    createdBy: 8,
    allowAdd: 'TRUE',
    isDemocratic: 'FALSE',
    createdAt: '2018-08-21 15:10:48.145-04',
    updatedAt: '2018-08-21 15:10:48.145-04'
  }
];

const newQueueItems = [
  {
    votes: 3,
    addedBy: 1,
    spotifyLink: 'http:spotify.someSong.com',
    roomId: 4,
    trackName: '1',
    artistName: '1',
    upVotes: 50,
    downVotes: 60
  },
  {
    votes: 1,
    addedBy: 3,
    spotifyLink: 'http:spotify.someOtherSong.com',
    roomId: 4,
    trackName: '2',
    artistName: '2',
    upVotes: 150,
    downVotes: 160
  },
  {
    votes: 1,
    addedBy: 4,
    spotifyLink: 'http:spotify.someOtherSong.com',
    roomId: 4,
    trackName: '3',
    artistName: '3',
    upVotes: 250,
    downVotes: 260
  },
  {
    votes: 1,
    addedBy: 3,
    spotifyLink: 'http:spotify.someOtherSong.com',
    roomId: 2,
    trackName: '3',
    artistName: '3',
    upVotes: 350,
    downVotes: 360
  },
  {
    votes: 6,
    addedBy: 5,
    spotifyLink: 'http:spotify.someOtherSong.com',
    roomId: 2,
    trackName: '4',
    artistName: '4',
    upVotes: 450,
    downVotes: 460
  },
  {
    votes: 6,
    addedBy: 5,
    spotifyLink: 'http:spotify.someOtherSong.com',
    roomId: 1,
    trackName: '5',
    artistName: '5',
    upVotes: 550,
    downVotes: 560
  },
  {
    votes: 6,
    addedBy: 5,
    spotifyLink: 'http:spotify.someOtherSong.com',
    roomId: 1,
    trackName: '6',
    artistName: '6',
    upVotes: 650,
    downVotes: 660
  },
  {
    votes: 6,
    addedBy: 5,
    spotifyLink: 'http:spotify.someOtherSong.com',
    roomId: 2,
    trackName: '7',
    artistName: '7',
    upVotes: 750,
    downVotes: 760
  }
];

const randomId = list => {
  return Math.floor(Math.random(0) * Math.floor(list.length));
};

const seed = async () => {
  await db.sync({force: true});
  console.log('db synced!');

  const createdUsers = await Promise.all(
    newUsers.map(user => User.create(user))
  );
  const createdRooms = await Promise.all(
    newRooms.map(room => Room.create(room))
  );

  const createdQueues = await Promise.all(
    newQueueItems.map(queueItem => QueueItem.create(queueItem))
  );

  await Promise.all(
    createdUsers.map(user =>
      user.setRooms(createdRooms[randomId(createdRooms)].id)
    )
  );

  console.log(`seeded ${createdUsers.length} users`);
  console.log(`seeded successfully`);
};

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
