const {expect} = require ('chai');
const {
    sequelize,
    dataTypes,
    checkModelName,
    checkUniqueIndex,
    checkPropertyExists
} = require('sequelize-test-helpers')
const UserModel = require('../server/db/models/user')
const RoomModel = require('../server/db/models/room');
const QueueItem = require('../server/db/models/queueItem');



describe(' +++++++++++++++++++++ SEQUELIZE MODELS  +++++++++++++++++++++', () => {

describe('#User-model', () => {
    const User = {name :'user1' , email: 'user1@email.com' , imageUrl: 'hsdlkfhlaksf', refreshToken: 'KJHGGDUW' , accessToken: 'JBKACBUQEY'}

    // checkModelName(UserModel)('User')

    context('properties', () => {
        ;[
            'name',
            'email',
            'imageUrl',
            'refreshToken',
            'accessToken'
        ].forEach(checkPropertyExists(User))
    })
});



describe('#Room-model', () => {
    const Room = { name: 'Room1', isPrivate: true, description: 'blahblah', imageUrl: 'KJHGGDUW' }

    // checkModelName(RoomModel)('room')

    context('properties', () => {
        ;[
             'name',
            'isPrivate',
            'imageUrl',
            'description',
        ].forEach(checkPropertyExists(Room))
    })
});


describe('#queueItem-model', () => {
    const queueItem = { trackName: 'track1', spotifyLink: 'http....', artistName: 'blahblah', imageUrl: 'KJHGGDUW', roomId: 3}

    // checkModelName(RoomModel)('room')

    context('properties', () => {
        ;[
            'spotifyLink',
            'trackName',
            'imageUrl',
            'artistName',
            'roomId'
        ].forEach(checkPropertyExists(queueItem))
    })
});
});