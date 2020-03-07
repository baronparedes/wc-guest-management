import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export type Props = {
    title?: React.ReactNode;
    toggle?: boolean;
    onClose?: () => void;
    onAction?: () => void;
    actionText?: string;
    size?: 'sm' | 'lg' | 'xl' | undefined;
};

const ModalContainer: React.FC<Props> = props => {
    return (
        <Modal
            show={props.toggle}
            onHide={props.onClose}
            size={props.size}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    close
                </Button>
                <Button variant="primary" onClick={props.onAction}>
                    {props.actionText ? props.actionText : 'ok'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalContainer;
