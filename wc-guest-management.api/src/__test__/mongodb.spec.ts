import * as mongoose from 'mongoose';
import { startDb, stopDb } from '../@utils/test-helper';

beforeAll(async () => {
    await startDb();
});

afterAll(async () => {
    await stopDb();
});

describe('...', () => {
    it('...', async () => {
        const User = mongoose.model('TestUser', new mongoose.Schema({ name: String }));
        const count = await User.countDocuments();
        expect(count).toEqual(0);
    });
});
