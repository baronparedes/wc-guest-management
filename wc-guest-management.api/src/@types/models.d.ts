export interface InfoSlip {
    visitDate: string;
    tableNumber?: number;
    volunteer: string;
    guests: string;
}

export interface DashboardMetric {
    slot: string;
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
