import useForm from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Guest, useUpdateGuestData } from '../../Api';
import { dashboardActions } from '../../store/reducers/dashboard.reducer';

// function useState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

type Props<T = undefined> = {
    defaultValues: T;
    id: string;
    onPreSubmit: (formData: T) => Guest;
    onFormSaved?: (savedData: Guest) => void;
};

export function usePostGuestForm<T = undefined>(props: Props<T>) {
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm<T>({
        defaultValues: props.defaultValues
    });
    const { loading, error, mutate } = useUpdateGuestData({
        id: props.id
    });
    const onSubmit = (formData: T) => {
        mutate({
            guestData: props.onPreSubmit(formData)
        }).then(savedData => {
            dispatch(dashboardActions.guestSaved(savedData));
            props.onFormSaved && props.onFormSaved(savedData);
        });
    };
    return {
        loading,
        error,
        handleSubmit,
        onSubmit,
        register
    };
}
