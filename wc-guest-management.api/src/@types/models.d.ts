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
    metrics: DashboardMetric[];
}

export interface DashboardCategory {
    title: string;
    metrics: DashboardLineItem[];
}

export interface DashboardReport {
    totalGuests: number;
    summary: DashboardMetric[];
    categories: DashboardCategory[];
}

export interface DashboardCategoryCriteria {
    label: string;
    criteria: (guest: Guest) => boolean;
}
