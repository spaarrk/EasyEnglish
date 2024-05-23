const Router = require('express');
const router = new Router();
const testTypeController = require('../controllers/testTypeController');

router.post('/', testTypeController.create);
router.get('/', testTypeController.getAll);

module.exports = router;
