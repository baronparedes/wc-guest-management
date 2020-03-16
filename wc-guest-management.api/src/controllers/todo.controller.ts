import {
    BodyProp,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Route
} from 'tsoa';
import TodoModel, { Todo } from '../models/todo';

@Route('/api/todo')
export class TodoControler extends Controller {
    @Get('/')
    public async getAll(): Promise<Todo[]> {
        const items = await TodoModel.find({});
        return items;
    }

    @Get('/{id}')
    public async get(id: string): Promise<Todo> {
        const todo = await TodoModel.findById(id);
        return todo;
    }

    @Post()
    public async create(
        @BodyProp() description: string
    ): Promise<Todo> {
        const todo = new TodoModel({ description });
        await todo.save();
        return todo as Todo;
    }

    @Put('/{id}')
    public async update(
        id: string,
        @BodyProp() description: string
    ): Promise<void> {
        await TodoModel.findByIdAndUpdate(id, {
            $set: { description }
        });
    }

    @Delete('/{id}')
    public async delete(id: string): Promise<void> {
        await TodoModel.findByIdAndDelete(id);
    }
}
