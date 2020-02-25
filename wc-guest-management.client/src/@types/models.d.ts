export module Models {
    export type PrintStatus = 'printing' | 'printed' | '';
    export type CivilStatus =
        | 'single'
        | 'married'
        | 'annuleled / divorced'
        | 'widower'
        | 'single parent'
        | '';
    export type GuestCategory =
        | 'shared a'
        | 'shared dna'
        | 'prayed'
        | 'counseled';
    export type GuestInfo = {
        id: number;
        visitDate: string;
        tableNumber: number;
        volunteer: string;
        guest: string;
        status?: PrintStatus;
    };
    export type InfoSlip = {
        visitDate: string;
        tableNumber?: number;
        volunteer: string;
        guests: string;
    };
    export type GuestMetadata = {
        id: number;
        visitDate: string;
        tableNumber: number;
        volunteer: string;
        guest: string;
        age?: number;
        birthDate?: string;
        mobile?: string;
        email?: string;
        civilStatus?: CivilStatus;
        cityOfResidence?: string;
        cityOfWorkplace?: string;
        category?: GuestCategory;
    };
}
