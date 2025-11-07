const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const validateTask = require('../middleware/validateTask');
const { ErrorCodes, ErrorMessages } = require('../constants/errorCodes');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project"
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request - title is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validateTask, async (req, res, next) => {
  try {
    const { title, completed = false } = req.body;
    const task = await taskService.createTask(title, completed);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated task"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request - title is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', validateTask, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    
    const task = await taskService.updateTask(id, title, completed);
    
    if (!task) {
      return res.status(404).json({ 
        error: ErrorMessages[ErrorCodes.TASK_NOT_FOUND],
        code: ErrorCodes.TASK_NOT_FOUND
      });
    }
    
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.deleteTask(id);
    
    if (!task) {
      return res.status(404).json({ 
        error: ErrorMessages[ErrorCodes.TASK_NOT_FOUND],
        code: ErrorCodes.TASK_NOT_FOUND
      });
    }
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /tasks/{id}/completed:
 *   patch:
 *     summary: Toggle task completion status
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task completion status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id/completed', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.toggleTaskCompleted(id);
    
    if (!task) {
      return res.status(404).json({ 
        error: ErrorMessages[ErrorCodes.TASK_NOT_FOUND],
        code: ErrorCodes.TASK_NOT_FOUND
      });
    }
    
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

