import React from 'react';
import { Container } from 'react-bootstrap';
import DisplayLabel from '../@ui/DisplayLabel';
import DashboardGuestsContainer from './DashboardGuestsContainer';

const DashboardView = () => {
    return (
        <Container>
            <DisplayLabel>dashboard</DisplayLabel>
            <DashboardGuestsContainer />
        </Container>
    );
};

export default DashboardView;
