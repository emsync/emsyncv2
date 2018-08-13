'use strict';

const db = require('../server/db');
const {User} = require('../server/db/models');
const {Room} = require('../server/db/models');

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
    name: 'Funky Room',
    description: 'Best funky room on earth!',
    imageUrl: 'https://static.thenounproject.com/png/87940-200.png'
  },
  {
    name: 'Not So Funky Room',
    description: 'Meh funky room on earth!',
    imageUrl:
      'https://vignette.wikia.nocookie.net/nintendo/images/3/3f/Funky_Kong_portal_icon.png/revision/latest?cb=20120822060521&path-prefix=en'
  },
  {
    name: 'Rap Room',
    description: 'RAP-it up!!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhmqfO9vZ9bsnow6PfUdDdPLEeddLYF9bPmTHvcA5dorZ-fnYM'
  },
  {
    name: 'Pop Room',
    description: 'So pop-ish!!'
  },
  {
    name: 'Classical Room',
    description: 'Room for the classic'
  }
];

const randomUser = userList => {
  return Math.floor(Math.random(0) * Math.floor(userList.length));
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

  await Promise.all(
    createdRooms.map(room =>
      room.setUsers(createdUsers[randomUser(createdUsers)].id)
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
