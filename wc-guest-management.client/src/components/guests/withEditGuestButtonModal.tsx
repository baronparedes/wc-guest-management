import React, { ComponentType, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Guest } from '../../Api';
import ModalContainer, { ModalProps } from '../@ui/ModalContainer';

export type EditableGuestProps = {
    guest: Guest;
    onFormSaved?: (saveData: Guest) => void;
};

type Props = {
    variant?:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'danger'
        | 'warning'
        | 'info'
        | 'dark'
        | 'light';
    title?: string;
};

export type GuestButtonModalProps = EditableGuestProps & ModalProps & Props;

export const withEditGuestButtonModal = <P extends GuestButtonModalProps>(
    Component: ComponentType<P>
) => {
    const WrappedComponent: React.FC<P> = props => {
        const [toggle, setToggle] = useState(false);
        const handleOnShowModal = () => setToggle(true);
        const handleOnClose = () => setToggle(false);
        const handleOnFormSaved = (savedData: Guest) => {
            handleOnClose();
        };
        return (
            <>
                <Button
                    variant={props.variant}
                    type="button"
                    onClick={handleOnShowModal}
                    title={props.title}>
                    {props.children}
                </Button>
                <ModalContainer
                    header={props.header}
                    toggle={toggle}
                    modalsize={props.modalsize}
                    onClose={handleOnClose}>
                    <Component
                        {...props}
                        guest={props.guest}
                        onFormSaved={handleOnFormSaved}
                    />
                </ModalContainer>
            </>
        );
    };

    return WrappedComponent;
};
