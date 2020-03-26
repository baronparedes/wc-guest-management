import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export type ModalProps = {
    title?: React.ReactNode;
    modalSize?: 'sm' | 'lg' | 'xl';
    onAction?: () => void;
    label?: string;
};

type Props = {
    toggle?: boolean;
    onClose?: () => void;
};

const ModalContainer: React.FC<Props & ModalProps> = props => {
    return (
        <Modal
            show={props.toggle}
            onHide={props.onClose}
            size={props.modalSize}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    close
                </Button>
                <Button variant="primary" onClick={props.onAction}>
                    {props.label ? props.label : 'ok'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalContainer;
