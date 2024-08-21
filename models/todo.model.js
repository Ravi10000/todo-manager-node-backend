import { model, Schema } from 'mongoose';

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    // todo: add createdBy reference
});

const Todo = model("Todo", todoSchema);
export default Todo;