import * as mongoose from 'mongoose';
import { Activity, Slot } from '../@types/models';
import { getNextSequence } from './sequence';

export interface Guest {
    _id?: string;
    visitDate: Date;
    tableNumber: number;
    volunteer: string;
    guest: string;
    age?: number;
    birthDate?: string;
    mobile?: string;
    email?: string;
    civilStatus?: string;
    cityOfResidence?: string;
    cityOfWorkplace?: string;
    category?: string;
    series?: number;
    createdDate?: Date;
    worshipDay?: string;
    worshipTime?: Slot;
    action?: Activity;
    gender?: string;
}

export type GuestDocument = Guest & mongoose.Document;

export type GuestDocumentQuery = mongoose.DocumentQuery<
    GuestDocument[],
    GuestDocument,
    {}
>;

const GuestSchema = new mongoose.Schema({
    visitDate: { type: Date, required: true },
    tableNumber: { type: Number, required: true },
    volunteer: { type: String, required: true },
    guest: { type: String, required: true },
    age: Number,
    birthDate: String,
    mobile: String,
    email: String,
    civilStatus: String,
    cityOfResidence: String,
    cityOfWorkplace: String,
    category: String,
    worshipDay: String,
    worshipTime: String,
    action: String,
    gender: String,
    createdDate: { type: Date, required: true },
    series: { type: Number, required: true }
});

GuestSchema.pre<Guest & mongoose.Document>('save', async next => {
    if (!this.createdDate) this.createdDate = new Date();
    if (!this.series) this.series = await getNextSequence('guest');
    next();
});

export const GuestModel = mongoose.model<GuestDocument>(
    'guest',
    GuestSchema
);
