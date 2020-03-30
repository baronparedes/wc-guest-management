import { Guest } from '../@models/guest';

export interface InfoSlip {
    visitDate: string;
    tableNumber?: number;
    volunteer: string;
    guests: string;
}

export type Slot = 'AM' | 'NN' | 'PM' | 'N/A';
export type Activity = 'A' | 'DNA' | 'Prayed' | 'Counseled';

export interface DashboardMetric {
    slot: Slot;
    count: number;
}

export interface DashboardLineItem {
    label: string;
    category: string;
    metrics: DashboardMetric[];
}

export interface DashboardReport {
    totalGuests: number;
    summary: DashboardMetric[];
    ageCategory: DashboardLineItem[];
    activityCategory: DashboardLineItem[];
}

export interface DashboardCategoryCriteria {
    category: string;
    label: string;
    criteria: (guest: Guest) => boolean;
}
