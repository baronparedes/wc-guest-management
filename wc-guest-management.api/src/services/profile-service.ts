import { Profile } from '../@models/profile';

export default class ProfileService {
    constructor() {}

    public async getProfile(email: string, password: string): Promise<Profile> {
        //TODO: Get from data store
        return {
            _id: '123456',
            email,
            name: 'Baron Paredes',
        };
    }
}
