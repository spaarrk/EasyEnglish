const Router = require('express');
const router = new Router();
const statisticsController = require('../controllers/statisticsController');

router.post('/dashboard', statisticsController.getDashboard);
router.post('/progress', statisticsController.createProgress);

module.exports = router;
