import { Router } from "express";
import { body, param } from "express-validator";
import { validator } from "../middlewares/validator.middleware.js";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.post("/",
    [
        body("name").notEmpty()
            .withMessage("todo name required"),
    ],
    validator,
    addTodo

)
router.put("/:id", [body("completed").isBoolean().withMessage("completed should be true or false").optional(), param("id").isMongoId().withMessage("invalid todo id")], validator, updateTodo);
router.get("/", fetchTodos);
router.delete("/:id", [param("id").isMongoId().withMessage("invalid todo id")], validator, deleteTodo)

export default router;