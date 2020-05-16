import { Guest } from '../@models/guest';
import {
    DashboardCategory,
    DashboardCategoryCriteria,
    DashboardLineItem,
    DashboardMetric,
    DashboardReport,
    ReportCategory,
    Slot,
} from '../@types/models';

export default class DashboardService {
    private createActivityCriteria(
        label: string,
        action?: string
    ): DashboardCategoryCriteria {
        return {
            label: label.toLowerCase(),
            criteria: (g) => g.action === label,
            documentQuery: (q) => q.where({ action: action ?? label }),
        };
    }

    public getActivityCriterias(): DashboardCategoryCriteria[] {
        const result: DashboardCategoryCriteria[] = [
            this.createActivityCriteria('Accepted', 'A'),
            this.createActivityCriteria('Not Accepted', 'DNA'),
            this.createActivityCriteria('Counseled'),
            this.createActivityCriteria('Prayed'),
            {
                label: 'na',
                criteria: (guest) => !guest.action,
                documentQuery: (q) =>
                    q.or([
                        { action: null },
                        { action: { $exists: false } },
                        { action: '' },
                    ]),
            },
        ];
        return result;
    }

    private createAgeBetweenCriteria(
        label: string,
        lower: number,
        upper: number
    ): DashboardCategoryCriteria {
        return {
            label,
            criteria: (guest) => lower <= guest.age && guest.age <= upper,
            documentQuery: (q) => q.where({ age: { $gte: lower, $lte: upper } }),
        };
    }

    public getAgeCriterias(): DashboardCategoryCriteria[] {
        const result: DashboardCategoryCriteria[] = [
            {
                label: '<=20',
                criteria: (guest) => guest.age < 20,
                documentQuery: (q) => q.where({ age: { $lte: 20 } }),
            },
            this.createAgeBetweenCriteria('21-30', 21, 30),
            this.createAgeBetweenCriteria('31-40', 31, 40),
            this.createAgeBetweenCriteria('41-50', 41, 50),

            {
                label: '>50',
                criteria: (guest) => guest.age > 50,
                documentQuery: (q) => q.where({ age: { $gt: 50 } }),
            },
            {
                label: 'na',
                criteria: (guest) => !guest.age,
                documentQuery: (q) => q.or([{ age: null }, { age: { $exists: false } }]),
            },
        ];
        return result;
    }

    private getSummaryByCategory(
        data: Guest[],
        title: ReportCategory,
        criterias: DashboardCategoryCriteria[]
    ): DashboardCategory {
        const metrics: DashboardLineItem[] = criterias.map((c) => {
            const filteredData = data.filter(c.criteria);
            const item: DashboardLineItem = {
                label: c.label,
                metrics: this.getSummary(filteredData),
            };
            return item;
        });
        const result: DashboardCategory = {
            title: title,
            metrics: metrics,
        };
        return result;
    }

    private getDashboardMetric(data: Guest[], slot?: Slot): DashboardMetric {
        const result: DashboardMetric = {
            slot: slot ? slot : 'NA',
            count: data.filter((d) => d.worshipTime === slot).length,
        };
        return result;
    }

    private getSummary(data: Guest[]): DashboardMetric[] {
        const result = [
            this.getDashboardMetric(data, '9 AM'),
            this.getDashboardMetric(data, '12 NN'),
            this.getDashboardMetric(data, '3 PM'),
            this.getDashboardMetric(data, '6 PM'),
            // this.getDashboardMetric(data)
        ];
        return result;
    }

    public toDashboardReport(data: Guest[]): DashboardReport {
        const result: DashboardReport = {
            totalGuests: data.length,
            summary: this.getSummary(data),
            categories: [
                this.getSummaryByCategory(data, 'age', this.getAgeCriterias()),
                this.getSummaryByCategory(data, 'activity', this.getActivityCriterias()),
            ],
        };
        return result;
    }
}
