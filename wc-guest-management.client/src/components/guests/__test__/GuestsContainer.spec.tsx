import { fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { getCurrentDateFormatted } from '@utils/dates';
import { generateFakeGuest, generateFakeGuests } from '@utils/fake-models';
import { renderWithProviderAndRestful } from '@utils/test-renderers';
import { Guest } from 'Api';
import GuestList from 'components/guests/GuestList';
import GuestsContainer from 'components/guests/GuestsContainer';
import nock from 'nock';
import React from 'react';
import { dashboardActions } from 'store/reducers/dashboard.reducer';

type GuestListProps = React.ComponentProps<typeof GuestList>;
jest.mock('components/guests/GuestList', () => (props: GuestListProps) => {
    return (
        <div>
            <div data-testid="guestlist-guests">{JSON.stringify(props.guests)}</div>
            <div data-testid="guestlist-areaToggle">{props.areaToggle.toString()}</div>
            <button data-testid="guestlist-button" onClick={props.onAreaToggle}></button>
        </div>
    );
});

describe('GuestsContainer', () => {
    const base = 'http://localhost';
    const mockedGuests = generateFakeGuests();
    const mockedRefreshGuests = generateFakeGuests();

    afterEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });

    async function assertRenderGuests(result: Guest[] | string, response = 200) {
        nock(base)
            .get('/api/guest')
            .query({
                fromDate: getCurrentDateFormatted(),
            })
            .reply(response, result);
        const target = renderWithProviderAndRestful(<GuestsContainer />, base);
        await waitFor(() => expect(target.getByRole('progressbar')).toBeInTheDocument());
        await waitForElementToBeRemoved(() => target.getByRole('progressbar'));
        return {
            ...target,
        };
    }

    async function assertRefetchGuests(
        trigger: (target: ReturnType<typeof renderWithProviderAndRestful>) => void,
        queryParams: {}
    ) {
        const target = await assertRenderGuests(mockedGuests);
        nock(base)
            .get('/api/guest')
            .query({ ...queryParams })
            .reply(200, mockedRefreshGuests);
        trigger(target);
        await waitFor(() => expect(target.getByRole('progressbar')).toBeInTheDocument());
        await waitForElementToBeRemoved(() => target.getByRole('progressbar'));
        await waitFor(() => {
            expect(target.getByTestId('guestlist-guests').textContent).toStrictEqual(
                JSON.stringify(mockedRefreshGuests)
            );
        });
    }

    it('should toggle by area', async () => {
        const { getByTestId } = await assertRenderGuests(mockedGuests);
        expect(getByTestId('guestlist-areaToggle').textContent).toBe('false');
        fireEvent.click(getByTestId('guestlist-button'));
        await waitFor(() => {
            expect(getByTestId('guestlist-areaToggle').textContent).toBe('true');
        });
        fireEvent.click(getByTestId('guestlist-button'));
        await waitFor(() => {
            expect(getByTestId('guestlist-areaToggle').textContent).toBe('false');
        });
    });

    it('should refetch data when guest is saved', async () => {
        const queryParams = {
            fromDate: getCurrentDateFormatted(),
        };
        await assertRefetchGuests(({ store }) => {
            store.dispatch(dashboardActions.guestSaved(generateFakeGuest()));
        }, queryParams);
    });

    it('should refetch data on refresh', async () => {
        const queryParams = {
            criteria: '',
            fromDate: getCurrentDateFormatted(),
        };
        await assertRefetchGuests(({ getByText }) => {
            fireEvent.click(getByText(/refresh/i));
        }, queryParams);
    });

    it('should succesfully fetch data on render', async () => {
        const { getByTestId } = await assertRenderGuests(mockedGuests);
        await waitFor(() => {
            expect(getByTestId('guestlist-guests').textContent).toStrictEqual(
                JSON.stringify(mockedGuests)
            );
        });
    });

    it('should fail to fetch data on render', async () => {
        const { getByRole } = await assertRenderGuests('err', 500);
        await waitFor(() => {
            expect(getByRole('error').textContent).toBe('err');
        });
    });
});
