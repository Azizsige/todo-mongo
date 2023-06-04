// routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const todoController = require("../controllers/todoController");

router.get("/", authMiddleware.authenticateToken, todoController.getTodos);
router.post("/", authMiddleware.authenticateToken, todoController.createTodo);
router.put("/:id", authMiddleware.authenticateToken, todoController.updateTodo);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  todoController.deleteTodo
);

module.exports = router;
