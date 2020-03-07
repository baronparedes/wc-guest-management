import React from 'react';
import { Container } from 'react-bootstrap';
import DisplayLabel from '../@ui/DisplayLabel';
import BackroomGuestContainer from './BackroomGuestsContainer';

const BackroomView = () => {
    return (
        <Container>
            <DisplayLabel>Backroom</DisplayLabel>
            <BackroomGuestContainer />
        </Container>
    );
};

export default BackroomView;
