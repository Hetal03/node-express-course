/* const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask
 // getTask,
 // updateTask,
 // deleteTask,
} = require('../controllers/tasks');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
 
 */
/* const express = require('express');
const router = express.Router();
const { getAllTasks, createTask } = require('../controllers/tasks');

router.route('/').get(getAllTasks).post(createTask);

module.exports = router;
 */

const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/tasks');

// Route to get all tasks and create a new task
router.route('/').get(getAllTasks).post(createTask);

// Routes for operations on a specific task by ID
router
  .route('/:id')
  .get(getTask)       // GET single task
  .patch(updateTask)  // UPDATE task
  .delete(deleteTask) // DELETE task

module.exports = router;
