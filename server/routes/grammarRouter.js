const Router = require('express');
const router = new Router();
const grammarController = require('../controllers/grammarController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole(['ADMIN']), grammarController.create);
router.get('/', grammarController.getAll);
router.get('/:id', grammarController.getOne);
router.delete('/:id', grammarController.delete);
router.put('/:id', grammarController.update);

module.exports = router;
