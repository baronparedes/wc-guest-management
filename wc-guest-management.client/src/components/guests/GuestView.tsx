import DisplayLabel from 'components/@ui/DisplayLabel';
import React from 'react';
import { Container } from 'react-bootstrap';
import GuestGuestContainer from './GuestsContainer';

const GuestView = () => {
    return (
        <Container>
            <DisplayLabel>guests</DisplayLabel>
            <GuestGuestContainer />
        </Container>
    );
};

export default GuestView;
