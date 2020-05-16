import { Profile, ProfileModel } from '../@models/profile';

export default class ProfileService {
    constructor() {}

    public async getProfile(username: string, password: string): Promise<Profile> {
        const profile = await ProfileModel.findOne({ username: username });
        if (!profile || profile.password !== password) {
            throw new Error('Username or Password is invalid');
        }
        return {
            _id: profile._id,
            name: profile.name,
            username: profile.username,
        };
    }

    public async initDefaultProfile(): Promise<Profile> {
        const defaultProfile: Profile = {
            username: 'wcadmin',
            password: 'password',
            name: 'WC Admin',
        };
        const profile = await ProfileModel.findOneAndUpdate(
            { username: 'wcadmin' },
            defaultProfile,
            { upsert: true }
        );
        return profile;
    }
}
