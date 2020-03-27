import React from 'react';
import { Container } from 'react-bootstrap';
import DisplayLabel from '../@ui/DisplayLabel';
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
