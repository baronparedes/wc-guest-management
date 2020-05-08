import { Guest, useUpdateGuestData } from 'Api';
import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { dashboardActions } from 'store/reducers/dashboard.reducer';

export type PostGuestFormProps<T = undefined> = {
    defaultValues: T;
    id: string;
    onPreSubmit: (formData: T) => Guest;
    onFormSaved?: (savedData: Guest) => void;
};

export function usePostGuestForm<T = undefined>(props: PostGuestFormProps<T>) {
    const dispatch = useDispatch();
    const { handleSubmit, register, reset } = useForm<T>({
        defaultValues: props.defaultValues,
    });
    const { loading, error, mutate } = useUpdateGuestData({
        id: props.id,
    });
    const onSubmit = (formData: T) => {
        const body = {
            guestData: props.onPreSubmit(formData),
        };
        mutate(body)
            .then((savedData) => {
                dispatch(dashboardActions.guestSaved(savedData));
                props.onFormSaved && props.onFormSaved(savedData);
            })
            .catch(() => {});
    };
    return {
        loading,
        error,
        handleSubmit,
        onSubmit,
        register,
        reset,
    };
}
