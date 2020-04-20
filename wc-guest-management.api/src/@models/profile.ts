import * as mongoose from 'mongoose';

export interface Profile {
    _id?: string;
    name: string;
    email: string;
    password?: string;
}

export type ProfileDocument = Profile & mongoose.Document;

export type ProfileDocumentQuery = mongoose.DocumentQuery<
    ProfileDocument[],
    ProfileDocument,
    {}
>;

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const GuestModel = mongoose.model<ProfileDocument>('profile', ProfileSchema);
