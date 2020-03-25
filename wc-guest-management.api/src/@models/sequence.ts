import * as mongoose from 'mongoose';

interface Sequence {
    _id: string;
    name: string;
    next: number;
}

const SequenceSchema = new mongoose.Schema({
    name: String,
    next: Number
});

const SequenceModel = mongoose.model<Sequence & mongoose.Document>(
    'sequence',
    SequenceSchema
);

export async function getNextSequence(name: string) {
    const query = { name: name };
    const update = { $inc: { next: 1 } };
    const options = {
        new: true,
        upsert: true
    };
    const result = await SequenceModel.findOneAndUpdate(
        query,
        update,
        options
    );
    return result.next;
}
