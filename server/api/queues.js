const router = require('express').Router();
const {Room, QueueItem} = require('../db/models');
module.exports = router;

router.put('/', async (req, res, next) => {
  // console.log('REQUEST USER: ', req.user);
  // console.log('REQUEST BODY: ', req.body);
  // console.log('Request body item: ', req.body.item);
  try {
    const newItem = await QueueItem.create(req.body.item);
    res.status(201).send(newItem);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:roomId', async (req, res, next) => {
  let queue;
  let room;
  try {
    queue = await QueueItem.findAll({
      where: {
        roomId: req.params.roomId
      }
    });
    // console.log('just rceated', queue);
    // console.log('unsorted queue is', queue);
    room = await Room.findOne({where: {id: req.params.roomId}});

    let playingIndex = queue.findIndex(element => {
      return element.isPlaying === true;
    });

    // console.log('playingIndex is', playingIndex);
    if (playingIndex !== -1) {
      let nowPlaying = await queue.splice(playingIndex, 1);
      // console.log('after splice', queue);
      sortArray(queue);
      queue.unshift(nowPlaying[0]);
    }
    // console.log('sorted queue is', queue);
    res.json(queue);
  } catch (err) {
    next(err);
  }

  try {
  } catch (err) {
    next(err);
  }
});

const sortArray = arr => {
  // console.log('array in sort method', arr);
  arr.sort((a, b) => {
    // if (room.isDemocratic) {
    // console.log('a and b', a.id, b.id, a.votes, b.votes);
    return b.votes - a.votes;
    // }
    // else {
    //   const dB = await new Date(b.createdAt);
    //   const dA = await new Date(a.createdAt);
    //   const timeB = dB.getTime();
    //   const timeA = dA.getTime();
    //   return timeB - timeA;
    // }
  });
};

router.delete('/:itemId', async (req, res, next) => {
  try {
    const queueItem = await QueueItem.findById(req.params.itemId);
    if (queueItem) {
      queueItem.destroy();
    } else {
      console.log('Error: no queue item found with this ID');
    }
    res.status(204).end();
  } catch (err) {
    console.log(err);
  }
});

router.put('/:songId', async (req, res, next) => {
  try {
    var queueItem = await QueueItem.findById(req.params.songId);
    queueItem = await queueItem.update(req.body);
    res.send(queueItem);
  } catch (err) {
    console.log(err);
  }
});
