import DisplayLabel from 'components/@ui/DisplayLabel';
import React from 'react';
import { Container } from 'react-bootstrap';
import GuestsContainer from './GuestsContainer';

const GuestView = () => {
    return (
        <Container>
            <DisplayLabel>guests</DisplayLabel>
            <GuestsContainer />
        </Container>
    );
};

export default GuestView;
