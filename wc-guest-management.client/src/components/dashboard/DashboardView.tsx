import DisplayLabel from 'components/@ui/DisplayLabel';
import React from 'react';
import { Container } from 'react-bootstrap';
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
