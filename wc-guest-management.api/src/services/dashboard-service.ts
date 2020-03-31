import { Guest, GuestDocumentQuery } from '../@models/guest';
import {
    DashboardCategory,
    DashboardCategoryCriteria,
    DashboardLineItem,
    DashboardMetric,
    DashboardReport,
    ReportCategory,
    Slot
} from '../@types/models';

export default class DashboardService {
    public getActivityCriterias(): DashboardCategoryCriteria[] {
        const result: DashboardCategoryCriteria[] = [
            {
                label: 'accepted',
                criteria: (guest: Guest) => {
                    return guest.action === 'A';
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        action: 'A'
                    });
                }
            },
            {
                label: 'not accepted',
                criteria: (guest: Guest) => {
                    return guest.action === 'DNA';
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        action: 'DNA'
                    });
                }
            },
            {
                label: 'counseled',
                criteria: (guest: Guest) => {
                    return guest.action === 'Counseled';
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        action: 'Counseled'
                    });
                }
            },
            {
                label: 'prayed',
                criteria: (guest: Guest) => {
                    return guest.action === 'Prayed';
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        action: 'Prayed'
                    });
                }
            },
            {
                label: 'na',
                criteria: (guest: Guest) => {
                    return !guest.action;
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.or([
                        { action: null },
                        { action: { $exists: false } },
                        { action: '' }
                    ]);
                }
            }
        ];
        return result;
    }

    public getAgeCriterias(): DashboardCategoryCriteria[] {
        const result: DashboardCategoryCriteria[] = [
            {
                label: '<=20',
                criteria: (guest: Guest) => {
                    return guest.age < 20;
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        age: {
                            $lte: 20
                        }
                    });
                }
            },
            {
                label: '21-30',
                criteria: (guest: Guest) => {
                    return 21 <= guest.age && guest.age <= 30;
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        age: {
                            $gte: 21,
                            $lte: 30
                        }
                    });
                }
            },
            {
                label: '31-40',
                criteria: (guest: Guest) => {
                    return 31 <= guest.age && guest.age <= 40;
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        age: {
                            $gte: 31,
                            $lte: 40
                        }
                    });
                }
            },
            {
                label: '41-50',
                criteria: (guest: Guest) => {
                    return 41 <= guest.age && guest.age <= 50;
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        age: {
                            $gte: 41,
                            $lte: 50
                        }
                    });
                }
            },
            {
                label: '>50',
                criteria: (guest: Guest) => {
                    return guest.age > 50;
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.where({
                        age: {
                            $gt: 50
                        }
                    });
                }
            },
            {
                label: 'na',
                criteria: (guest: Guest) => {
                    return !guest.age;
                },
                documentQuery: (q: GuestDocumentQuery) => {
                    return q.or([
                        { age: null },
                        { age: { $exists: false } }
                    ]);
                }
            }
        ];
        return result;
    }

    private getSummaryByCategory(
        data: Guest[],
        title: ReportCategory,
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
            slot: slot ? slot : 'NA',
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
                    'age',
                    this.getAgeCriterias()
                ),
                this.getSummaryByCategory(
                    data,
                    'activity',
                    this.getActivityCriterias()
                )
            ]
        };
        return result;
    }
}
