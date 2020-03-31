import { DocumentQuery } from 'mongoose';
import { Guest, GuestDocument, GuestModel } from '../@models/guest';
import { getNextSequence } from '../@models/sequence';
import { InfoSlip, ReportCategory } from '../@types/models';
import { getCurrentDateFormatted } from '../@utils/dates';

type GuestDocumentQuery = DocumentQuery<
    GuestDocument[],
    GuestDocument,
    {}
>;

export default class GuestService {
    public queryByCategory(
        query: GuestDocumentQuery,
        category?: ReportCategory,
        index?: string,
        slot?: string
    ): GuestDocumentQuery {
        if (category && index && slot) {
            switch (category) {
                case 'age':
                    break;
                case 'activity':
                    break;
            }
        }

        return query;
    }

    public queryByAge() {}

    public queryByDateRange(
        query: GuestDocumentQuery,
        fromDate?: Date,
        toDate?: Date
    ): GuestDocumentQuery {
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
            query.where({ visitDate: visitDate });
        }
        return query;
    }

    public queryByCriteria(
        query: GuestDocumentQuery,
        byCriteria?: string
    ) {
        if (byCriteria) {
            const orQueries = [];
            const expression = new RegExp(byCriteria, 'i');
            const seriesId = Number(byCriteria);
            !isNaN(seriesId) && orQueries.push({ series: seriesId });
            orQueries.push({ volunteer: expression });
            orQueries.push({ guest: expression });
            return query.or(orQueries);
        }
        return query;
    }

    public async fetchGuestsByCategory(
        fromDate?: Date,
        toDate?: Date,
        category?: ReportCategory,
        index?: string,
        slot?: string
    ): Promise<Guest[]> {
        let query = GuestModel.find();
        query = this.queryByDateRange(query, fromDate, toDate);
        query = this.queryByCategory(query, category, index, slot);
        return query;
    }

    public async fetchGuestsByDateRange(
        fromDate?: Date,
        toDate?: Date
    ): Promise<Guest[]> {
        const query = this.queryByDateRange(
            GuestModel.find(),
            fromDate,
            toDate
        );
        return query;
    }

    public async fetchGuests(
        byVisitDate?: Date,
        byCriteria?: string
    ): Promise<Guest[]> {
        let query = GuestModel.find();
        if (byVisitDate)
            query = query.where({ visitDate: new Date(byVisitDate) });
        query = this.queryByCriteria(query, byCriteria);
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
