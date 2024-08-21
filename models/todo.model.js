import { model, Schema } from 'mongoose';

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    // todo: add createdBy reference
});

const Todo = model("Todo", todoSchema);
export default Todo;