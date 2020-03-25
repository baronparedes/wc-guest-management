import { Guest, GuestModel } from '../@models/guest';
import { getNextSequence } from '../@models/sequence';
import { InfoSlip } from '../@types/models';

export default class GuestService {
    public async fetchGuests(
        byVisitDate?: Date,
        byVolunteer?: string
    ): Promise<Guest[]> {
        let query = {};
        if (byVisitDate) query['visitDate'] = byVisitDate;
        if (byVolunteer)
            query['volunteer'] = new RegExp('^' + byVolunteer, 'i');
        const result = GuestModel.find(query);
        return result;
    }

    public async welcomeGuests(infoSlip: InfoSlip): Promise<Guest[]> {
        if (!infoSlip.guests || infoSlip.guests === '') {
            throw new Error('Guest name(s) is required');
        }

        const guestBag: Guest[] = [];
        const guests = infoSlip.guests.split(/\n/);

        // array.forEach does not work with await
        for (let index = 0; index < guests.length; index++) {
            const guest = guests[index];
            const seq = await getNextSequence('guest');
            guestBag.push({
                visitDate: infoSlip.visitDate,
                tableNumber: infoSlip.tableNumber,
                volunteer: infoSlip.volunteer,
                guest: guest,
                series: seq,
                createdDate: new Date()
            });
        }

        const result = GuestModel.insertMany(guestBag);
        return result;
    }
}
