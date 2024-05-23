const Router = require('express');
const router = new Router();
const sTopicController = require('../controllers/sTopicController');

router.post('/', sTopicController.create);
router.get('/', sTopicController.getAll);

module.exports = router;
