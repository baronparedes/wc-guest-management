import { useEffect, useRef } from 'react';
import { useRootState } from 'store';

export function useGuestSavedEffect(callback: () => void) {
    const mounted = useRef(false);
    const savedGuest = useRootState((state) => state.dashboard.savedGuest);
    useEffect(() => {
        if (mounted.current) callback();
        else mounted.current = true;
        // eslint-disable-next-line
    }, [savedGuest]);
}
