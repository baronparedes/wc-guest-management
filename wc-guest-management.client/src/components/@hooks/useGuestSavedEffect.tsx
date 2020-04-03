import { useEffect } from 'react';
import { useRootState } from '../../store';

export const useGuestSavedEffect = (callback: () => void) => {
    const savedGuest = useRootState(state => state.dashboard.savedGuest);
    useEffect(() => {
        callback();
        // eslint-disable-next-line
    }, [savedGuest]);
};
