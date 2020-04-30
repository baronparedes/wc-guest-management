import DisplayLabel from 'components/@ui/DisplayLabel';
import React from 'react';
import { Container } from 'react-bootstrap';
import DashboardContainer from './DashboardContainer';

const DashboardView = () => {
    return (
        <Container>
            <DisplayLabel>dashboard</DisplayLabel>
            <DashboardContainer />
        </Container>
    );
};

export default DashboardView;
