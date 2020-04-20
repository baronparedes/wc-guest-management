import { Guest, GuestDocumentQuery } from '../@models/guest';
import { Profile } from '../@models/profile';

export interface InfoSlip {
    visitDate: string;
    worshipTime?: Slot;
    tableNumber?: number;
    volunteer: string;
    guests: string;
}

export type ReportCategory = 'age' | 'activity';
export type Slot = '9 AM' | '12 NN' | '3 PM' | '6 PM' | 'NA';
export type Activity = 'A' | 'DNA' | 'Prayed' | 'Counseled';

export interface GuestCategoryCriteria {
    category: string;
    index: string;
    slot: string;
}

export interface DashboardMetric {
    slot: Slot;
    count: number;
}

export interface DashboardLineItem {
    label: string;
    metrics: DashboardMetric[];
}

export interface DashboardCategory {
    title: ReportCategory;
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
    documentQuery?: (query: GuestDocumentQuery) => GuestDocumentQuery;
}

export interface AuthProfile {
    profile: Profile;
    scopes?: string[];
}
