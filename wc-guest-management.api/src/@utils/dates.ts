import { Slot } from '../@types/models';

export function getCurrentDateFormatted() {
    return formatDate(new Date());
}

export function formatDate(date: Date) {
    return date.toJSON().slice(0, 10).replace(/-/g, '-');
}

export function getCurrentTimeSlot(): Slot {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return '9 AM';
    if (hour < 15) return '12 NN';
    if (hour < 18) return '3 PM';
    return '6 PM';
}
