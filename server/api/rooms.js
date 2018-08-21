const router = require('express').Router();
const {Room} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({include: {all: true}});
    res.json(rooms);
    done();
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id, {include: {all: true}});
    res.json(room);
  } catch (err) {
    console.log('err');
  }
});

router.put('/', async (req, res, next) => {
  const newRoom = await Room.create(req.body);
  res.status(201).send(newRoom);
});

router.delete('/:id', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    await room.destoy();
    res.status(204);
  } catch (err) {
    console.log('deleted unsuccessfully', err);
  }
});

module.exports = router;
