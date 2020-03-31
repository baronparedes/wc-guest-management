import { Guest } from '../@models/guest';
import {
    DashboardCategory,
    DashboardCategoryCriteria,
    DashboardLineItem,
    DashboardMetric,
    DashboardReport,
    Slot
} from '../@types/models';

export default class DashboardService {
    private getActivityCriterias(): DashboardCategoryCriteria[] {
        const category = 'guests by activity';
        const result: DashboardCategoryCriteria[] = [
            {
                label: 'accepted',
                criteria: (guest: Guest) => {
                    return guest.action === 'A';
                }
            },
            {
                label: 'not accepted',
                criteria: (guest: Guest) => {
                    return guest.action === 'DNA';
                }
            },
            {
                label: 'counseled',
                criteria: (guest: Guest) => {
                    return guest.action === 'Counseled';
                }
            },
            {
                label: 'prayed',
                criteria: (guest: Guest) => {
                    return guest.action === 'Prayed';
                }
            },
            {
                label: 'n/a',
                criteria: (guest: Guest) => {
                    return !guest.action;
                }
            }
        ];
        return result;
    }

    private getAgeCriterias(): DashboardCategoryCriteria[] {
        const result: DashboardCategoryCriteria[] = [
            {
                label: '< 20',
                criteria: (guest: Guest) => {
                    return guest.age > 20;
                }
            },
            {
                label: '21 - 30',
                criteria: (guest: Guest) => {
                    return 21 <= guest.age && guest.age <= 30;
                }
            },
            {
                label: '31 - 40',
                criteria: (guest: Guest) => {
                    return 31 <= guest.age && guest.age <= 40;
                }
            },
            {
                label: '41 - 50',
                criteria: (guest: Guest) => {
                    return 41 <= guest.age && guest.age <= 50;
                }
            },
            {
                label: '< 50',
                criteria: (guest: Guest) => {
                    return guest.age < 50;
                }
            },
            {
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
        title: string,
        criterias: DashboardCategoryCriteria[]
    ): DashboardCategory {
        const metrics: DashboardLineItem[] = criterias.map(c => {
            const filteredData = data.filter(c.criteria);
            const item: DashboardLineItem = {
                label: c.label,
                metrics: this.getSummary(filteredData)
            };
            return item;
        });
        const result: DashboardCategory = {
            title: title,
            metrics: metrics
        };
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
            categories: [
                this.getSummaryByCategory(
                    data,
                    'guests by age',
                    this.getAgeCriterias()
                ),
                this.getSummaryByCategory(
                    data,
                    'guests by activity',
                    this.getActivityCriterias()
                )
            ]
        };
        return result;
    }
}
