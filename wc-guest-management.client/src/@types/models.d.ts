export type ReportCategory = 'age' | 'activity';
export type Slot = 'AM' | 'NN' | 'PM' | 'NA';
export type Activity = 'A' | 'DNA' | 'Prayed' | 'Counseled';

export module Models {
    export type PrintStatus = 'printing' | 'printed' | '';
    export type CivilStatus =
        | 'Single'
        | 'Married'
        | 'Annulled / Divorced'
        | 'Widower'
        | 'Single parent'
        | '';
    export type GuestCategory =
        | 'A'
        | 'DNA'
        | 'Prayed'
        | 'Counseled'
        | '';
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
        series?: number;
        createdDate?: Date;
    };
}
