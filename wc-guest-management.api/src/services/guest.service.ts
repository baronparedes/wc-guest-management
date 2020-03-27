import { Guest, GuestModel } from '../@models/guest';
import { getNextSequence } from '../@models/sequence';
import { InfoSlip } from '../@types/models';

export default class GuestService {
    public async fetchGuests(
        byVisitDate?: Date,
        byCriteria?: string
    ): Promise<Guest[]> {
        const query = GuestModel.find();
        if (byVisitDate)
            query.where({ visitDate: new Date(byVisitDate) });
        if (byCriteria) {
            const expression = new RegExp(byCriteria, 'i');
            query.or([
                { volunteer: expression },
                { guest: expression }
            ]);
        }
        return query;
    }

    private printWelcomeLetters(guests: Guest[]) {
        guests.forEach(g => {
            console.log(g._id);
        });
    }

    public async updateGuestData(
        id: string,
        guestData: Guest
    ): Promise<Guest> {
        console.log(guestData, 'saving');
        console.log(id, 'saving id');
        return GuestModel.updateOne({ _id: id }, { ...guestData });
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
