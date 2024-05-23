const Router = require('express');
const router = new Router();
const questionController = require('../controllers/questionController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole(['ADMIN']), questionController.create);
router.get('/', questionController.getAll);
router.get('/:id', questionController.getOne);

module.exports = router;
