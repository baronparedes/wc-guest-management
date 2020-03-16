import * as mongoose from 'mongoose';

export interface Todo {
    _id: string;
    description: string;
}

const TodoSchema = new mongoose.Schema({
    description: { type: String, required: true }
});

export default mongoose.model<Todo & mongoose.Document>(
    'Todo',
    TodoSchema
);
