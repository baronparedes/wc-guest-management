import * as mongoose from 'mongoose';

export interface Profile {
    _id?: string;
    name: string;
    username: string;
    password?: string;
    scopes?: string;
}

export type ProfileDocument = Profile & mongoose.Document;

export type ProfileDocumentQuery = mongoose.DocumentQuery<
    ProfileDocument[],
    ProfileDocument,
    {}
>;

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    scopes: { type: String },
});

export const ProfileModel = mongoose.model<ProfileDocument>('profile', ProfileSchema);
