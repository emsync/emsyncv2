const router = require('express').Router();
const {Rooms, QueueItem} = require('../db/models');
module.exports = router;

router.put('/', async (req, res, next) => {
  // console.log('REQUEST USER: ', req.user);
  // console.log('REQUEST BODY: ', req.body);
  console.log('Request body item: ', req.body.item);
  try {
    const newItem = await QueueItem.create(req.body.item);
    console.log('in queues put newItem is: ', newItem);
    res.status(201).send(newItem);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:roomId', async (req, res, next) => {
  try {
    const queue = await QueueItem.findAll({
      where: {
        roomId: req.params.roomId
      }
    });
    res.send(queue);
  } catch (err) {
    next(err);
  }
});

router.delete('/:itemId', async (req, res, next) => {
  console.log('request body', req.params);
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
    console.log('update request is', req.body, req.params.songId);
    var queueItem = await QueueItem.findById(req.params.songId);
    console.log('search result is', queueItem);
    queueItem = await queueItem.update(req.body);
    res.send(queueItem);
  } catch (err) {
    console.log(err);
  }
});
