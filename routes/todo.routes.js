import { Router } from "express";
import { body } from "express-validator";
import { validator } from "../middlewares/validator.middleware.js";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.post("/",
    [
        body("name").notEmpty()
            .withMessage("todo name required"),
        body("description")
            .notEmpty()
            .withMessage("description required")
    ],
    validator,
    addTodo

)

router.put("/:id", updateTodo)
// todo: add isAuthenticated middleware
router.get("/", fetchTodos);

router.delete("/:id", deleteTodo)

export default router;