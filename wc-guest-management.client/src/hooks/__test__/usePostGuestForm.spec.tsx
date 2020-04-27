import { act, cleanup, renderHook } from '@testing-library/react-hooks';
import { generateFakeGuest } from '@utils/fake-models';
import { renderHookWithProviderAndRestful } from '@utils/test-renderers';
import { PostGuestFormProps, usePostGuestForm } from 'hooks/usePostGuestForm';
import nock from 'nock';

describe('usePostGuestForm', () => {
    const base = 'http://localhost';
    const expectedData = generateFakeGuest();
    const onPreSubmit = jest.fn(() => {
        return expectedData;
    });
    const onFormSaved = jest.fn();
    const props: PostGuestFormProps<typeof expectedData> = {
        defaultValues: expectedData,
        id: expectedData._id as string,
        onPreSubmit,
        onFormSaved,
    };

    afterEach(() => {
        cleanup();
        nock.cleanAll();
        jest.clearAllMocks();
    });

    it('should render', () => {
        renderHook(() =>
            usePostGuestForm({
                defaultValues: '',
                id: '',
                onPreSubmit: jest.fn(),
            })
        );
    });

    it('should post data to api server then notify store', async () => {
        nock(base)
            .put(
                `/api/guest/${expectedData._id}`,
                JSON.stringify({ guestData: expectedData })
            )
            .reply(200, expectedData);

        const { result, store, waitForNextUpdate } = renderHookWithProviderAndRestful(
            () => usePostGuestForm(props),
            base
        );

        act(() => {
            result.current.onSubmit(expectedData);
        });

        expect(result.current.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
        expect(store.getState().dashboard.savedGuest).toStrictEqual(expectedData);
        expect(onPreSubmit).toHaveBeenCalledTimes(1);
        expect(onFormSaved).toHaveBeenCalledTimes(1);
    });

    it('should error when posting data to api server', async () => {
        nock(base)
            .put(
                `/api/guest/${expectedData._id}`,
                JSON.stringify({ guestData: expectedData })
            )
            .reply(500, 'err');

        const { result, store, waitForNextUpdate } = renderHookWithProviderAndRestful(
            () => usePostGuestForm(props),
            base
        );

        act(() => {
            result.current.onSubmit(expectedData);
        });

        expect(result.current.loading).toBe(true);
        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
        expect(store.getState().dashboard.savedGuest).toStrictEqual(undefined);
        expect(result.current.error?.data).toBe('err');
        expect(onPreSubmit).toHaveBeenCalledTimes(1);
        expect(onFormSaved).not.toHaveBeenCalled();
    });
});
