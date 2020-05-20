import { generateFakeGuest, generateFakeInfoSlip } from '../../@utils/fake-models';
import GuestService from '../../services/guest-service';
import { GuestInfoController } from '../guest-info-controller';

describe('GuestInfoController', () => {
    afterAll(() => jest.clearAllMocks());

    it('should welcome guests', async () => {
        const infoSlip = generateFakeInfoSlip();
        const guests = [generateFakeGuest()];
        const welcomeGuestsSpy = jest
            .spyOn(GuestService.prototype, 'welcomeGuests')
            .mockReturnValueOnce(new Promise((resolve) => resolve(guests)));

        const target = new GuestInfoController();
        const actual = await target.welcome(infoSlip);

        expect(actual).toStrictEqual(guests);
        expect(welcomeGuestsSpy).toBeCalledTimes(1);
        expect(welcomeGuestsSpy).toBeCalledWith(infoSlip, undefined);
    });
});
