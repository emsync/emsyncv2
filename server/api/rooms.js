const router = require('express').Router();
const {Room} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const rooms = await Room.findAll({include: {all: true}});
    res.json(rooms);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id, {include: {all: true}});
    res.json(room);
  } catch (err) {
    res.json(`Room doesn't exist`);
    console.log('err');
  }
});

router.post('/', async (req, res, next) => {
  // console.log('REQ>BODY', req.body);
  try {
    const newRoom = await Room.create(req.body);
    // console.log('created room', newRoom);
    res.status(201).json(newRoom);
  } catch (err) {
    console.log(err);
    res.status(400).json('Room not created');
  }
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
