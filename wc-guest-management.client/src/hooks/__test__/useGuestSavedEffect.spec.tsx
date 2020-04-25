import { act } from '@testing-library/react-hooks';
import { getCurrentDateFormatted } from '@utils/dates';
import { renderHookWithProvider } from '@utils/test-renderers';
import { useGuestSavedEffect } from 'hooks/useGuestSavedEffect';
import { dashboardActions } from 'store/reducers/dashboard.reducer';

describe('useGuestSavedEffect', () => {
    it('should not execute callback on render', () => {
        const cb = jest.fn(() => null);
        renderHookWithProvider(() => useGuestSavedEffect(cb));
        expect(cb.mock.calls.length).toBe(0);
    });

    it('should execute callback on savedGuest change', () => {
        const cb = jest.fn(() => null);
        const { store } = renderHookWithProvider(() => useGuestSavedEffect(cb));

        act(() => {
            store.dispatch(
                dashboardActions.guestSaved({
                    guest: 'test-guest-1',
                    tableNumber: 1,
                    visitDate: getCurrentDateFormatted(),
                    volunteer: 'test-volunteer-1',
                })
            );
        });
        expect(cb.mock.calls.length).toBe(1);

        act(() => {
            store.dispatch(
                dashboardActions.guestSaved({
                    guest: 'test-guest-2',
                    tableNumber: 2,
                    visitDate: getCurrentDateFormatted(),
                    volunteer: 'test-volunteer-2',
                })
            );
        });
        expect(cb.mock.calls.length).toBe(2);
    });
});
