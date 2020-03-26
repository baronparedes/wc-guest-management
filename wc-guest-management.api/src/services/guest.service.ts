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

    private printWelcomeLetters(guests: Guest[]) {
        guests.forEach(g => {
            console.log(g._id);
        });
    }

    public async welcomeGuests(
        infoSlip: InfoSlip,
        print?: boolean
    ): Promise<Guest[]> {
        if (!infoSlip.guests || infoSlip.guests === '') {
            throw new Error('Guest name(s) must be provided.');
        }

        const guests: Guest[] = [];
        const guestInfos = infoSlip.guests.split(/\n/);

        // array.forEach does not work with await
        for (let index = 0; index < guestInfos.length; index++) {
            const guest = guestInfos[index];
            if (guest && guest !== '') {
                const seq = await getNextSequence('guest');
                guests.push({
                    visitDate: new Date(infoSlip.visitDate),
                    tableNumber: infoSlip.tableNumber,
                    volunteer: infoSlip.volunteer,
                    guest: guest,
                    series: seq,
                    createdDate: new Date()
                });
            }
        }

        const inserted = await GuestModel.insertMany(guests);
        print && this.printWelcomeLetters(inserted);
        return inserted;
    }
}
