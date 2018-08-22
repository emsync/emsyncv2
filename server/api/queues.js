const router = require('express').Router();
const {Room, QueueItem} = require('../db/models');
module.exports = router;

router.put('/', async (req, res, next) => {
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
    room = await Room.findOne({where: {id: req.params.roomId}});

    let playingIndex = queue.findIndex(element => {
      return element.isPlaying === true;
    });

    if (playingIndex !== -1) {
      let nowPlaying = await queue.splice(playingIndex, 1);
      sortArray(queue);
      queue.unshift(nowPlaying[0]);
    }
    res.json(queue);
  } catch (err) {
    next(err);
  }
});

const sortArray = arr => {
  arr.sort((a, b) => {
    return b.votes - a.votes;
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
