import * as faker from 'faker';
import { Profile } from '../../@models/profile';
import AuthService from '../auth-service';
import ProfileService from '../profile-service';

describe('AuthService', () => {
    const mockedProfile: Profile = {
        name: faker.name.findName(),
        username: faker.internet.userName(),
    };

    const setupAuthService = () => {
        const username = faker.internet.userName();
        const password = faker.internet.password();
        const credentials = `${username}:${password}`;
        const encodedCredentials = new Buffer(credentials).toString('base64');
        const target = new AuthService();
        return {
            username,
            password,
            encodedCredentials,
            target,
        };
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should authenticate a valid profile', async () => {
        const getProfileSpy = jest
            .spyOn(ProfileService.prototype, 'getProfile')
            .mockReturnValueOnce(new Promise((resolve) => resolve(mockedProfile)));
        const { target, encodedCredentials, username, password } = setupAuthService();
        const actual = await target.authenticate(`Basic ${encodedCredentials}`);
        expect(actual.profile).toStrictEqual(mockedProfile);
        expect(actual.token).toBeTruthy();
        expect(getProfileSpy).toBeCalledTimes(1);
        expect(getProfileSpy).toBeCalledWith(username, password);
    });

    it('should throw an error when profile is invalid', async () => {
        const getProfileSpy = jest
            .spyOn(ProfileService.prototype, 'getProfile')
            .mockReturnValueOnce(
                new Promise((resolve, reject) => reject(new Error('err')))
            );
        const { target, encodedCredentials, username, password } = setupAuthService();
        await expect(
            target.authenticate(`Basic ${encodedCredentials}`)
        ).rejects.toThrowError('err');
        expect(getProfileSpy).toBeCalledTimes(1);
        expect(getProfileSpy).toBeCalledWith(username, password);
    });
});
