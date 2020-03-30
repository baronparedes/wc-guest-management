export interface InfoSlip {
    visitDate: string;
    tableNumber?: number;
    volunteer: string;
    guests: string;
}

export type Slot = 'AM' | 'NN' | 'PM' | 'N/A';

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
