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
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: 1534970000000,
    spotifyLink: 'spotify:track:0nIOdc64Sa3fZeAdtsCwiA',
    currentPlayingTime: 0,
    isPlaying: 'TRUE',
    imageUrl:
      'https://i.scdn.co/image/5ea35e3f68bc0b585783573a21f822881190512a',
    imagePlayerURL:
      'https://i.scdn.co/image/129985fcd954a66366236c757eba802bf9ac9a09',
    trackName: 'Hallelujah - (Frederick Approved)',
    artistName: 'Kurt Nilsen',
    upVotes: 0,
    downVotes: 0,
    duration: 299680,
    roomId: 3
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: 1534970000000,
    spotifyLink: 'spotify:track:0nIOdc64Sa3fZeAdtsCwiA',
    currentPlayingTime: 0,
    isPlaying: 'TRUE',
    imageUrl:
      'https://i.scdn.co/image/5ea35e3f68bc0b585783573a21f822881190512a',
    imagePlayerURL:
      'https://i.scdn.co/image/129985fcd954a66366236c757eba802bf9ac9a09',
    trackName: 'Hallelujah - (Frederick Approved)',
    artistName: 'Kurt Nilsen',
    upVotes: 0,
    downVotes: 0,
    duration: 299680,
    roomId: 8
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: 1534970000000,
    spotifyLink: 'spotify:track:0PGLRTN0X6DrXh645WJCIY',
    currentPlayingTime: 0,
    isPlaying: 'TRUE',
    imageUrl:
      'https://i.scdn.co/image/3a0305eaaf5d25e677817a410c4827f4e60ab30e',
    imagePlayerURL:
      'https://i.scdn.co/image/d43d8ee4486c6e98f87f28fc2b706e7da6bec176',
    trackName: 'I Really Like You',
    artistName: 'Carly Rae Jepsen',
    upVotes: 0,
    downVotes: 0,
    duration: 204773,
    roomId: 5
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: 1534970000000,
    spotifyLink: 'spotify:track:0nIOdc64Sa3fZeAdtsCwiA',
    currentPlayingTime: 0,
    isPlaying: 'TRUE',
    imageUrl:
      'https://i.scdn.co/image/5ea35e3f68bc0b585783573a21f822881190512a',
    imagePlayerURL:
      'https://i.scdn.co/image/129985fcd954a66366236c757eba802bf9ac9a09',
    trackName: 'Hallelujah - (Frederick Approved)',
    artistName: 'Kurt Nilsen',
    upVotes: 0,
    downVotes: 0,
    duration: 299680,
    roomId: 7
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: 1534970000000,
    spotifyLink: 'spotify:track:0nIOdc64Sa3fZeAdtsCwiA',
    currentPlayingTime: 0,
    isPlaying: 'TRUE',
    imageUrl:
      'https://i.scdn.co/image/5ea35e3f68bc0b585783573a21f822881190512a',
    imagePlayerURL:
      'https://i.scdn.co/image/129985fcd954a66366236c757eba802bf9ac9a09',
    trackName: 'Hallelujah - (Frederick Approved)',
    artistName: 'Kurt Nilsen',
    upVotes: 0,
    downVotes: 0,
    duration: 299680,
    roomId: 9
  },
  {
    voters: '',
    votes: -1,
    addedBy: 8,
    startTimeStamp: 1534970000000,
    spotifyLink: 'spotify:track:0nIOdc64Sa3fZeAdtsCwiA',
    currentPlayingTime: 0,
    isPlaying: 'TRUE',
    imageUrl:
      'https://i.scdn.co/image/5ea35e3f68bc0b585783573a21f822881190512a',
    imagePlayerURL:
      'https://i.scdn.co/image/129985fcd954a66366236c757eba802bf9ac9a09',
    trackName: 'Hallelujah - (Frederick Approved)',
    artistName: 'Kurt Nilsen',
    upVotes: 0,
    downVotes: 1,
    duration: 299680,
    roomId: 6
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: 1534970000000,
    spotifyLink: 'spotify:track:3ZffCQKLFLUvYM59XKLbVm',
    currentPlayingTime: 0,
    isPlaying: 'TRUE',
    imageUrl:
      'https://i.scdn.co/image/a1982d961375042cc4b0543235f4d02ad60f3077',
    imagePlayerURL:
      'https://i.scdn.co/image/2027dbfec96249cdc12ff804738898afce24a7a5',
    trackName: 'Wake Me Up When September Ends',
    artistName: 'Green Day',
    upVotes: 0,
    downVotes: 0,
    duration: 285653,
    roomId: 2
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:3bidbhpOYeV4knp8AIu8Xn',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/6a457dd648f1ddb90a7fe6e38e141dafe1eca039',
    imagePlayerURL:
      'https://i.scdn.co/image/410191f75b2d2d48adb5a5d80d2acd09f811ff47',
    trackName: "Can't Hold Us - feat. Ray Dalton",
    artistName: 'Macklemore & Ryan Lewis',
    upVotes: 0,
    downVotes: 0,
    duration: 258342,
    roomId: 3
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:5Z01UMMf7V1o0MzF86s6WJ',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/d8e64797fed77c9fd5dd53a41dd887b1bace8cb1',
    imagePlayerURL:
      'https://i.scdn.co/image/ba7945c7b69615d0b6ff1366d751d10cb232f55c',
    trackName: 'Lose Yourself - Soundtrack Version',
    artistName: 'Eminem',
    upVotes: 0,
    downVotes: 0,
    duration: 326466,
    roomId: 3
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:2HHtWyy5CgaQbC7XSoOb0e',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/4d3543b4092b787fc43fcf184b74ef3d83dea27f',
    imagePlayerURL:
      'https://i.scdn.co/image/4d4825b7f73179ecab1c3016b4c3bad9bd8dfb85',
    trackName: 'Eye of the Tiger',
    artistName: 'Survivor',
    upVotes: 0,
    downVotes: 0,
    duration: 243773,
    roomId: 3
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:1Oenqmtbzt331Pgv0ODfS2',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/b33abcd2267b0756bc80204c3b14c0f31db23548',
    imagePlayerURL:
      'https://i.scdn.co/image/c39590d181070021f69351fc1e1e15cec4832371',
    trackName: 'Outta Your Mind',
    artistName: 'Lil Jon',
    upVotes: 0,
    downVotes: 0,
    duration: 250746,
    roomId: 1
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:2sPva3d85R7yKf60y7QZpD',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/9402ada8c39c713df3a8dd2a86d01a81156fc348',
    imagePlayerURL:
      'https://i.scdn.co/image/5be241444fc7cd5b9d150d020756cc4ecc4b2f95',
    trackName: 'La La La',
    artistName: 'LMFAO',
    upVotes: 0,
    downVotes: 0,
    duration: 210560,
    roomId: 1
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:48kwdkeHEJEuMzcKklPv5b',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/39d444b611fc95a1b473fd4aff57aee086636123',
    imagePlayerURL:
      'https://i.scdn.co/image/3f1290ee11db0d61ab1a66bde9a839bd54837bdf',
    trackName: 'Sorry For Party Rocking',
    artistName: 'LMFAO',
    upVotes: 0,
    downVotes: 0,
    duration: 203973,
    roomId: 1
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:0Rdfu7NQubmGmYz90usRCU',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/9402ada8c39c713df3a8dd2a86d01a81156fc348',
    imagePlayerURL:
      'https://i.scdn.co/image/5be241444fc7cd5b9d150d020756cc4ecc4b2f95',
    trackName: 'Yes',
    artistName: 'LMFAO',
    upVotes: 0,
    downVotes: 0,
    duration: 183693,
    roomId: 1
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:1V4jC0vJ5525lEF1bFgPX2',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/9402ada8c39c713df3a8dd2a86d01a81156fc348',
    imagePlayerURL:
      'https://i.scdn.co/image/5be241444fc7cd5b9d150d020756cc4ecc4b2f95',
    trackName: 'Shots',
    artistName: 'LMFAO',
    upVotes: 0,
    downVotes: 0,
    duration: 222133,
    roomId: 1
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:0obBFrPYkSoBJbvHfUIhkv',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/39d444b611fc95a1b473fd4aff57aee086636123',
    imagePlayerURL:
      'https://i.scdn.co/image/3f1290ee11db0d61ab1a66bde9a839bd54837bdf',
    trackName: 'Sexy And I Know It',
    artistName: 'LMFAO',
    upVotes: 0,
    downVotes: 0,
    duration: 199480,
    roomId: 1
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:0IkKz2J93C94Ei4BvDop7P',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/1da6377937478106ba7a8db6f60d764cbc7a0f50',
    imagePlayerURL:
      'https://i.scdn.co/image/ef70af3c5ef4f72c6581f52ff8ac12f5d310a9da',
    trackName: 'Party Rock Anthem',
    artistName: 'LMFAO',
    upVotes: 0,
    downVotes: 0,
    duration: 262173,
    roomId: 1
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:4pmc2AxSEq6g7hPVlJCPyP',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/4e285392cf5716aa693868e589a774a2b1f8e9a4',
    imagePlayerURL:
      'https://i.scdn.co/image/c0609e6dc026fc527519cf476008f8a7eb52ba1f',
    trackName: "Jumpin', Jumpin'",
    artistName: "Destiny's Child",
    upVotes: 0,
    downVotes: 0,
    duration: 230200,
    roomId: 8
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:7H6ev70Weq6DdpZyyTmUXk',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/4e285392cf5716aa693868e589a774a2b1f8e9a4',
    imagePlayerURL:
      'https://i.scdn.co/image/c0609e6dc026fc527519cf476008f8a7eb52ba1f',
    trackName: 'Say My Name',
    artistName: "Destiny's Child",
    upVotes: 0,
    downVotes: 0,
    duration: 271333,
    roomId: 8
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:4dvQg9sD8k9y4qiEURuj8v',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/0b265a96a4b34eeae6368bdb78912bfe4c90746e',
    imagePlayerURL:
      'https://i.scdn.co/image/2e7c50a42a1904154866551d63205bc50a02d02f',
    trackName: 'Lose My Breath',
    artistName: "Destiny's Child",
    upVotes: 0,
    downVotes: 0,
    duration: 242013,
    roomId: 8
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:6uYAPqxP69zfpCbsTHXgiz',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/0b265a96a4b34eeae6368bdb78912bfe4c90746e',
    imagePlayerURL:
      'https://i.scdn.co/image/2e7c50a42a1904154866551d63205bc50a02d02f',
    trackName: 'Cater 2 U',
    artistName: "Destiny's Child",
    upVotes: 0,
    downVotes: 0,
    duration: 245400,
    roomId: 8
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:4FTOpNYcGxnQdGNWSxIcio',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/0b265a96a4b34eeae6368bdb78912bfe4c90746e',
    imagePlayerURL:
      'https://i.scdn.co/image/2e7c50a42a1904154866551d63205bc50a02d02f',
    trackName: "Soldier (feat. T.I. & Lil' Wayne)",
    artistName: "Destiny's Child",
    upVotes: 0,
    downVotes: 0,
    duration: 325573,
    roomId: 8
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:79aTRrHLj79usLjMciPk3T',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/22e9ce4f7776755191227c436ebeb519512208bd',
    imagePlayerURL:
      'https://i.scdn.co/image/a846cdbf98ab3b165ce5354b293bb4df0c558bf2',
    trackName: 'Midnight Mood',
    artistName: 'Bill Evans',
    upVotes: 0,
    downVotes: 0,
    duration: 260839,
    roomId: 7
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:5m90lsdwLftrkF3U2OXh1k',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/b7ef019a316b5c7bbad8e5980c7a3fcc65174fc0',
    imagePlayerURL:
      'https://i.scdn.co/image/68b306cd806ee7cc9867bd11cee64e80f02a3377',
    trackName: 'Rat Jazz',
    artistName: 'Midnight Tyrannosaurus',
    upVotes: 0,
    downVotes: 0,
    duration: 217057,
    roomId: 7
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:5vb7At47uO0yPGfmYnAHuw',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/611fed55dff11d4071e2d84895ffcf17d388d49d',
    imagePlayerURL:
      'https://i.scdn.co/image/4c5a0b4482919abe636d43749a37fbc20d3b9102',
    trackName: "'Round Midnight",
    artistName: 'Miles Davis',
    upVotes: 0,
    downVotes: 0,
    duration: 355333,
    roomId: 7
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:1wl5b2lw3YagQtZiYZbQWP',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/0a8311cba55b12305309b564925ba2216424e1a8',
    imagePlayerURL:
      'https://i.scdn.co/image/4a2468ed129214392b488f89e7f871e4f76e35d7',
    trackName: "'Round Midnight",
    artistName: 'Thelonious Monk',
    upVotes: 0,
    downVotes: 0,
    duration: 193840,
    roomId: 7
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:1QX5wlAYhgqEwcWCuej2GP',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/0ee67b8a9009562bb110220a003437572dcadd55',
    imagePlayerURL:
      'https://i.scdn.co/image/7215545d5222c5ac8b1884a4c1cc749ba76fc765',
    trackName: 'Midnight In Brazil',
    artistName: 'The Deli',
    upVotes: 0,
    downVotes: 0,
    duration: 153535,
    roomId: 7
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:5e0vgBWfwToyphURwynSXa',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/3a0305eaaf5d25e677817a410c4827f4e60ab30e',
    imagePlayerURL:
      'https://i.scdn.co/image/d43d8ee4486c6e98f87f28fc2b706e7da6bec176',
    trackName: 'Run Away With Me',
    artistName: 'Carly Rae Jepsen',
    upVotes: 0,
    downVotes: 0,
    duration: 251320,
    roomId: 5
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:1kPpge9JDLpcj15qgrPbYX',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/c4794e4db5f764eddc3be4ab5210f8ef34a7bf61',
    imagePlayerURL:
      'https://i.scdn.co/image/8d0c364782a76794f8e75be4c1cea7e45c047e77',
    trackName: 'Good Time',
    artistName: 'Owl City',
    upVotes: 0,
    downVotes: 0,
    duration: 205933,
    roomId: 5
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:3TGRqZ0a2l1LRblBkJoaDx',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/b5beb6e614792d7e463e3f055e7e4c2643dfb794',
    imagePlayerURL:
      'https://i.scdn.co/image/3c8ecd66a7e8a70d3ec7ae961ce823ac76f03539',
    trackName: 'Call Me Maybe',
    artistName: 'Carly Rae Jepsen',
    upVotes: 0,
    downVotes: 0,
    duration: 193400,
    roomId: 5
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:0nIOdc64Sa3fZeAdtsCwiA',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/5ea35e3f68bc0b585783573a21f822881190512a',
    imagePlayerURL:
      'https://i.scdn.co/image/129985fcd954a66366236c757eba802bf9ac9a09',
    trackName: 'Hallelujah - (Frederick Approved)',
    artistName: 'Kurt Nilsen',
    upVotes: 0,
    downVotes: 0,
    duration: 299680,
    roomId: 5
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:2gZUPNdnz5Y45eiGxpHGSc',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/6cf0001035578534d00d37b0371108f24fbf63c9',
    imagePlayerURL:
      'https://i.scdn.co/image/cafd8763a050dabc4f6157172bb09a23d09abde3',
    trackName: 'POWER',
    artistName: 'Kanye West',
    upVotes: 0,
    downVotes: 0,
    duration: 292093,
    roomId: 9
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:6C7RJEIUDqKkJRZVWdkfkH',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/ab51387d467672b4e24625d1ad4e57b3f8d3a2ab',
    imagePlayerURL:
      'https://i.scdn.co/image/01bb4663dcfa3b8b4fd405ef493dfe447805aa57',
    trackName: 'Stronger',
    artistName: 'Kanye West',
    upVotes: 0,
    downVotes: 0,
    duration: 311866,
    roomId: 9
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:5brMyscUnQg14hMriS91ks',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/5487acf8d22aa518645d90135d8a9a1fed3e902e',
    imagePlayerURL:
      'https://i.scdn.co/image/4585d9da3de372888f25611987405a9efcd93b38',
    trackName: 'Kanye',
    artistName: 'The Chainsmokers',
    upVotes: 0,
    downVotes: 0,
    duration: 229946,
    roomId: 9
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:3qnoOm4fwZPBS116f5hpgF',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/662874fdaaf3c42f98e9163c23525d36aabc8ecf',
    imagePlayerURL:
      'https://i.scdn.co/image/05cf2f8b56e595bcbf50fccb894f5fb6c2427750',
    trackName: 'All Mine',
    artistName: 'Kanye West',
    upVotes: 0,
    downVotes: 0,
    duration: 145506,
    roomId: 9
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:3DoBTwfr8yi2LN08SBpFkN',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/658cd20258f0aa9429f33c8d9688037df30eb343',
    imagePlayerURL:
      'https://i.scdn.co/image/d91a0b311a6b775708b4cdb64a0bbf0640366d66',
    trackName: 'Watch (feat. Lil Uzi Vert & Kanye West)',
    artistName: 'Travis Scott',
    upVotes: 0,
    downVotes: 0,
    duration: 217405,
    roomId: 9
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:4sPmO7WMQUAf45kwMOtONw',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/7afb855c28a2c8ad5ed9d51460736f4022e60bbf',
    imagePlayerURL:
      'https://i.scdn.co/image/602102500b9cebde7559a5f9c16daaaef2846440',
    trackName: 'Hello',
    artistName: 'Adele',
    upVotes: 0,
    downVotes: 0,
    duration: 295493,
    roomId: 4
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:4BHzQ9C00ceJxfG16AlNWb',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/7afb855c28a2c8ad5ed9d51460736f4022e60bbf',
    imagePlayerURL:
      'https://i.scdn.co/image/602102500b9cebde7559a5f9c16daaaef2846440',
    trackName: 'Send My Love (To Your New Lover)',
    artistName: 'Adele',
    upVotes: 0,
    downVotes: 0,
    duration: 223080,
    roomId: 4
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:6P7tTFzn6oNa0GL8w8oazE',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/41312e3db766172d9d1033926de43166a0780a45',
    imagePlayerURL:
      'https://i.scdn.co/image/f566598febbcaa5e073adb70f761998831dfb285',
    trackName: 'Make You Feel My Love',
    artistName: 'Adele',
    upVotes: 0,
    downVotes: 0,
    duration: 212040,
    roomId: 4
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:4kflIGfjdZJW4ot2ioixTB',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/7ace39dafcac6a253a026ffa473e0f14389fa1d8',
    imagePlayerURL:
      'https://i.scdn.co/image/4dd5a511e378838ef564cc343304019b8f430bcd',
    trackName: 'Someone Like You',
    artistName: 'Adele',
    upVotes: 0,
    downVotes: 0,
    duration: 285040,
    roomId: 4
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:0IkKz2J93C94Ei4BvDop7P',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/1da6377937478106ba7a8db6f60d764cbc7a0f50',
    imagePlayerURL:
      'https://i.scdn.co/image/ef70af3c5ef4f72c6581f52ff8ac12f5d310a9da',
    trackName: 'Party Rock Anthem',
    artistName: 'LMFAO',
    upVotes: 0,
    downVotes: 0,
    duration: 262173,
    roomId: 6
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:0s6OWiWGuiCcm1Muzch5A8',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/1b0cf3ec5171e229dd2063fadaf5d56995d69067',
    imagePlayerURL:
      'https://i.scdn.co/image/fde6eab13d284ce1b702aae21eca02563ab6c37f',
    trackName: 'Fix a Drink',
    artistName: 'Chris Janson',
    upVotes: 0,
    downVotes: 0,
    duration: 188933,
    roomId: 6
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:47nm8czanMUzIqHsnr5x61',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/8516149bae1a411684cb43ae00f14dd0cc897311',
    imagePlayerURL:
      'https://i.scdn.co/image/fa162a3f58dbfbf404a61702be81d05a34e6ddb3',
    trackName: 'Red Solo Cup',
    artistName: 'Toby Keith',
    upVotes: 0,
    downVotes: 0,
    duration: 223386,
    roomId: 6
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:6p2liQLGoDaLXgND68bfVt',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/f6f66dc1ac833603ae9997132b9b84a726461099',
    imagePlayerURL:
      'https://i.scdn.co/image/e7bc470f67b359bf1bb18d10efc1be419b3d9312',
    trackName: 'Coming Undone',
    artistName: 'Korn',
    upVotes: 1,
    downVotes: 1,
    duration: 199773,
    roomId: 2
  },
  {
    voters: '',
    votes: 0,
    addedBy: 8,
    startTimeStamp: '',
    spotifyLink: 'spotify:track:6W21LNLz9Sw7sUSNWMSHRu',
    currentPlayingTime: 0,
    isPlaying: 'FALSE',
    imageUrl:
      'https://i.scdn.co/image/178f98aadf9fc8d56d82cb1a1402db5991382bd2',
    imagePlayerURL:
      'https://i.scdn.co/image/c26ce66ab4d6fd71658189d0bafeb473234a0f63',
    trackName: 'Freak On a Leash',
    artistName: 'Korn',
    upVotes: 0,
    downVotes: 0,
    duration: 255733,
    roomId: 2
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
