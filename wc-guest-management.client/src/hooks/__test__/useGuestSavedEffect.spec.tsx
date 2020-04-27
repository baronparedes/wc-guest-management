import { act } from '@testing-library/react-hooks';
import { generateFakeGuest } from '@utils/fake-models';
import { renderHookWithProvider } from '@utils/test-renderers';
import { useGuestSavedEffect } from 'hooks/useGuestSavedEffect';
import { dashboardActions } from 'store/reducers/dashboard.reducer';

describe('useGuestSavedEffect', () => {
    it('should not execute callback on render', () => {
        const cb = jest.fn(() => null);
        renderHookWithProvider(() => useGuestSavedEffect(cb));
        expect(cb).not.toHaveBeenCalled();
    });

    it('should execute callback on savedGuest change', () => {
        const cb = jest.fn(() => null);
        const { store } = renderHookWithProvider(() => useGuestSavedEffect(cb));

        act(() => {
            store.dispatch(dashboardActions.guestSaved(generateFakeGuest()));
        });
        expect(cb).toHaveBeenCalledTimes(1);

        act(() => {
            store.dispatch(dashboardActions.guestSaved(generateFakeGuest()));
        });
        expect(cb).toHaveBeenCalledTimes(2);
    });
});
