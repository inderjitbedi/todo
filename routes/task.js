const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

router.get('/list', taskController.list);
router.post('/add', taskController.add);
router.put('/delete/:taskid', taskController.delete);
router.get('/details/:taskid', taskController.details);
router.put('/update/:taskid', taskController.update);


module.exports = router;
