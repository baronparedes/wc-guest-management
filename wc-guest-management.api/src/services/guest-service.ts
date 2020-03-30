import { Guest, GuestModel } from '../@models/guest';
import { getNextSequence } from '../@models/sequence';
import { InfoSlip } from '../@types/models';
import { getCurrentDateFormatted } from '../@utils/dates';

export default class GuestService {
    public async fetchGuestsByDateRange(
        fromDate?: Date,
        toDate?: Date
    ): Promise<Guest[]> {
        const query = GuestModel.find();
        if (fromDate && toDate)
            query.where({
                visitDate: {
                    $gte: new Date(fromDate),
                    $lte: new Date(toDate)
                }
            });
        else {
            const visitDate = fromDate
                ? fromDate
                : new Date(getCurrentDateFormatted());
            console.log(visitDate, 'visitDate');
            query.where({ visitDate: visitDate });
        }
        return query;
    }

    public async fetchGuestsByCriteria(
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

    public async updateGuest(
        id: string,
        guestData: Guest
    ): Promise<Guest> {
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
