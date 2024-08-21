import Todo from "../models/todo.model.js";

export async function addTodo(req, res, next) {
    try {
        const { name, description = "" } = req.body;
        const todo = await Todo.create({ name, description });

        res.status(201).json({
            status: "success",
            message: "todo created",
            todo
        })
    } catch (error) {
        console.log({ error });
        next(error);
    }
}
export async function updateTodo(req, res, next) {
    try {
        const { id } = req.params;
        const { name, description, completed } = req.body;
        const todo = await Todo.findByIdAndUpdate(id, {
            ...(name != null && { name }),
            ...(description != null && { description }),
            ...(completed != null && { completed }),
        }, { new: true });

        res.status(200).json({
            status: "success",
            message: "todo updated",
            todo
        })
    } catch (error) {
        console.log({ error });
        next(error);
    }
}

export async function fetchTodos(req, res, next) {
    try {
        // todo: filter my todos
        const todos = await Todo.find();
        res.status(200).json({
            status: "success",
            message: "todos fetched",
            todos
        })
    } catch (error) {
        console.log({ error })
        next(error)
    }
}

export async function deleteTodo(req, res, next) {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        res.status(200).json({
            status: "todo deleted",
            todo
        })
    } catch (error) {
        console.log({ error })
        next(error)
    }
}