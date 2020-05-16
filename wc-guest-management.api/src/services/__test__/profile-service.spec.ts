import * as faker from 'faker';
import { Profile, ProfileModel } from '../../@models/profile';
import { startDb, stopDb } from '../../@utils/test-helper';
import ProfileService from '../profile-service';

describe('Profile Service', () => {
    const data: Profile = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.findName(),
    };

    async function seedData() {
        const profile = await ProfileModel.findOneAndUpdate(
            { username: data.username },
            data,
            { upsert: true }
        );
        return profile;
    }

    beforeAll(async () => {
        await startDb();
        await seedData();
    });

    afterAll(async () => {
        await stopDb();
    });

    it('should get a profile when correct username and password is supplied', async () => {
        const target = new ProfileService();
        const actual = await target.getProfile(data.username, data.password);
        expect(actual.username).toBe(data.username);
        expect(actual.name).toBe(data.name);
    });

    it.each([
        { username: data.username, password: faker.internet.password() },
        { username: faker.internet.userName(), password: data.password },
    ])(
        'should throw an Error when invalid username or password is supplied',
        async (targetProfile) => {
            const target = new ProfileService();
            await expect(
                target.getProfile(targetProfile.username, targetProfile.password)
            ).rejects.toThrowError('Username or Password is invalid');
        }
    );
});
