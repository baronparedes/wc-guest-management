import { Guest } from '../@models/guest';
import {
    DashboardCategoryCriteria,
    DashboardLineItem,
    DashboardMetric,
    DashboardReport,
    Slot
} from '../@types/models';

export default class DashboardService {
    private generateActivityCategoryCriterias(): DashboardCategoryCriteria[] {
        const category = 'activity';
        const result: DashboardCategoryCriteria[] = [
            {
                category: category,
                label: 'accepted',
                criteria: (guest: Guest) => {
                    return guest.action === 'A';
                }
            },
            {
                category: category,
                label: 'not accepted',
                criteria: (guest: Guest) => {
                    return guest.action === 'DNA';
                }
            },
            {
                category: category,
                label: 'counseled',
                criteria: (guest: Guest) => {
                    return guest.action === 'Counseled';
                }
            },
            {
                category: category,
                label: 'prayed',
                criteria: (guest: Guest) => {
                    return guest.action === 'Prayed';
                }
            },
            {
                category: category,
                label: 'n/a',
                criteria: (guest: Guest) => {
                    return !guest.action;
                }
            }
        ];
        return result;
    }

    private generateAgeCategoryCriterias(): DashboardCategoryCriteria[] {
        const category = 'age group';
        const result: DashboardCategoryCriteria[] = [
            {
                category: category,
                label: '< 20',
                criteria: (guest: Guest) => {
                    return guest.age > 20;
                }
            },
            {
                category: category,
                label: '21 - 30',
                criteria: (guest: Guest) => {
                    return 21 <= guest.age && guest.age <= 30;
                }
            },
            {
                category: category,
                label: '31 - 40',
                criteria: (guest: Guest) => {
                    return 31 <= guest.age && guest.age <= 40;
                }
            },
            {
                category: category,
                label: '41 - 50',
                criteria: (guest: Guest) => {
                    return 41 <= guest.age && guest.age <= 50;
                }
            },
            {
                category: category,
                label: '< 50',
                criteria: (guest: Guest) => {
                    return guest.age < 50;
                }
            },
            {
                category: category,
                label: 'n/a',
                criteria: (guest: Guest) => {
                    return !guest.age;
                }
            }
        ];
        return result;
    }

    private getSummaryByCategory(
        data: Guest[],
        criterias: DashboardCategoryCriteria[]
    ): DashboardLineItem[] {
        const result: DashboardLineItem[] = criterias.map(c => {
            const filteredData = data.filter(c.criteria);
            const item: DashboardLineItem = {
                category: c.category,
                label: c.label,
                metrics: this.getSummary(filteredData)
            };
            return item;
        });
        return result;
    }

    private getDashboardMetric(
        data: Guest[],
        slot?: Slot
    ): DashboardMetric {
        const result: DashboardMetric = {
            slot: slot ? slot : 'N/A',
            count: data.filter(d => d.worshipTime === slot).length
        };
        return result;
    }

    private getSummary(data: Guest[]): DashboardMetric[] {
        const result = [
            this.getDashboardMetric(data, 'AM'),
            this.getDashboardMetric(data, 'NN'),
            this.getDashboardMetric(data, 'PM'),
            this.getDashboardMetric(data)
        ];
        return result;
    }

    public toDashboardReport(data: Guest[]): DashboardReport {
        const result: DashboardReport = {
            totalGuests: data.length,
            summary: this.getSummary(data),
            activityCategory: this.getSummaryByCategory(
                data,
                this.generateAgeCategoryCriterias()
            ),
            ageCategory: this.getSummaryByCategory(
                data,
                this.generateActivityCategoryCriterias()
            )
        };
        return result;
    }
}
