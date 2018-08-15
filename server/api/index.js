const router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/spotify', require('./spotify'));
router.use('/rooms', require('./rooms'));
router.use('/queues', require('./queues'));

router.use((req, res, next) => {
  const error = new Error('Hellooooo');
  error.status = 404;
  next(error);
});
