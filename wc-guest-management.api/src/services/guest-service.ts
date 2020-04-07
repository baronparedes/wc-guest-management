import { Guest, GuestDocumentQuery, GuestModel } from '../@models/guest';
import { getNextSequence } from '../@models/sequence';
import {
    DashboardCategoryCriteria,
    InfoSlip,
    ReportCategory,
    Slot,
} from '../@types/models';
import { getCurrentDateFormatted, getCurrentTimeSlot } from '../@utils/dates';
import DashboardService from './dashboard-service';

export default class GuestService {
    private dashboardService: DashboardService;

    constructor() {
        this.dashboardService = new DashboardService();
    }

    public queryByCategory(
        query: GuestDocumentQuery,
        category?: ReportCategory,
        index?: string,
        slot?: Slot
    ): GuestDocumentQuery {
        if (category && index && slot) {
            switch (category) {
                case 'age':
                    return this.queryByDashboardCategory(
                        query,
                        this.dashboardService.getAgeCriterias(),
                        index,
                        slot
                    );
                case 'activity':
                    return this.queryByDashboardCategory(
                        query,
                        this.dashboardService.getActivityCriterias(),
                        index,
                        slot
                    );
            }
        }

        return query;
    }

    public queryByDashboardCategory(
        query: GuestDocumentQuery,
        criterias: DashboardCategoryCriteria[],
        index?: string,
        slot?: Slot
    ): GuestDocumentQuery {
        if (index) {
            const criteria = criterias.find((c) => c.label === index);
            if (criteria && criteria.documentQuery) {
                query = criteria.documentQuery(query);
            }
        }
        if (slot && slot !== 'NA') {
            query = query.where({ worshipTime: slot });
        }
        return query;
    }

    public queryBySlot(query: GuestDocumentQuery, slot?: Slot) {
        if (slot) {
            query = query.where({ worshipTime: slot });
        }
        return query;
    }

    public queryByDateRange(
        query: GuestDocumentQuery,
        fromDate?: Date,
        toDate?: Date
    ): GuestDocumentQuery {
        if (fromDate && toDate)
            query.where({
                visitDate: {
                    $gte: new Date(fromDate),
                    $lte: new Date(toDate),
                },
            });
        else {
            const visitDate = fromDate ? fromDate : new Date(getCurrentDateFormatted());
            query.where({ visitDate: visitDate });
        }
        return query;
    }

    public queryByCriteria(query: GuestDocumentQuery, criteria?: string) {
        if (criteria) {
            const orQueries = [];
            const expression = new RegExp(criteria, 'i');
            const seriesId = Number(criteria);
            !isNaN(seriesId) && orQueries.push({ series: seriesId });
            orQueries.push({ volunteer: expression });
            orQueries.push({ guest: expression });
            query = query.or(orQueries);
        }
        return query;
    }

    public async fetchGuestsByCategory(
        fromDate?: Date,
        toDate?: Date,
        category?: ReportCategory,
        index?: string,
        slot?: Slot
    ): Promise<Guest[]> {
        let query = GuestModel.find();
        query = this.queryByDateRange(query, fromDate, toDate);
        query = this.queryByCategory(query, category, index, slot);
        return query;
    }

    public async fetchGuestsByDateRange(fromDate?: Date, toDate?: Date): Promise<Guest[]> {
        const query = this.queryByDateRange(GuestModel.find(), fromDate, toDate);
        return query;
    }

    public async fetchGuests(
        fromDate?: Date,
        toDate?: Date,
        criteria?: string,
        slot?: Slot
    ): Promise<Guest[]> {
        let query = GuestModel.find();
        query = this.queryByDateRange(query, fromDate, toDate);
        query = this.queryByCriteria(query, criteria);
        query = this.queryBySlot(query, slot);
        return query;
    }

    private printWelcomeLetters(guests: Guest[]) {
        guests.forEach((g) => {
            console.log(g._id);
        });
    }

    public async updateGuest(id: string, guestData: Guest): Promise<Guest> {
        return GuestModel.updateOne({ _id: id }, { ...guestData });
    }

    private getDayOfWeek(date: Date) {
        const dayOfWeek = date.getDay();
        return isNaN(dayOfWeek)
            ? undefined
            : [
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
              ][dayOfWeek];
    }

    private getWorshipTime(infoSlip: InfoSlip) {
        if (infoSlip && infoSlip.worshipTime && infoSlip.worshipTime !== 'NA') {
            return infoSlip.worshipTime;
        }
        return getCurrentTimeSlot();
    }

    public async welcomeGuests(infoSlip: InfoSlip, print?: boolean): Promise<Guest[]> {
        if (!infoSlip.guests || infoSlip.guests === '') {
            throw new Error('Guest name(s) must be provided.');
        }

        const guests: Guest[] = [];
        const guestInfos = [
            ...new Set(infoSlip.guests.split(/\n/).map((g) => g.toLowerCase())),
        ];

        // array.forEach does not work with await
        for (let index = 0; index < guestInfos.length; index++) {
            const guest = guestInfos[index];
            if (guest && guest !== '') {
                const seq = await getNextSequence('guest');
                const visitDate = new Date(infoSlip.visitDate);
                guests.push({
                    visitDate: visitDate,
                    tableNumber: infoSlip.tableNumber,
                    volunteer: infoSlip.volunteer,
                    worshipDay: this.getDayOfWeek(visitDate),
                    worshipTime: this.getWorshipTime(infoSlip),
                    guest: guest,
                    series: seq,
                    createdDate: new Date(),
                });
            }
        }

        const inserted = await GuestModel.insertMany(guests);
        print && this.printWelcomeLetters(inserted);
        return inserted;
    }
}
