import React from 'react';
import { Container } from 'react-bootstrap';
import DisplayLabel from '../@ui/DisplayLabel';
import BackroomGuestContainer from './BackroomGuestsContainer';
import GuestMetadataForm from './GuestMetadataForm';

const BackroomView = () => {
    return (
        <Container>
            <DisplayLabel>Backroom</DisplayLabel>
            {false && <BackroomGuestContainer />}
            <GuestMetadataForm />
        </Container>
    );
};

export default BackroomView;
