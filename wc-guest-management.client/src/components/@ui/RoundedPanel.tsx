import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Panel = styled(Container)`
    background-color: #ffffff;
    padding: 0.5em;
`;

const RoundedPanel: React.FC = props => {
    return <Panel className="rounded-lg">{props.children}</Panel>;
};

export default RoundedPanel;
