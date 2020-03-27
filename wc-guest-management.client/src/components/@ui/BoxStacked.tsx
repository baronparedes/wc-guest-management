import React from 'react';
import styled from 'styled-components';

const StyledBoxStacked = styled('div')`
    height: 110px;
    width: 110px;
    position: absolute;
    background-color: #ffc107;
    z-index: 1;
    margin: 1em;
    margin-left: 0.5em;
`;

const BoxStacked: React.FC<{ className?: string }> = props => {
    return (
        <StyledBoxStacked className={props.className}>
            {props.children}
        </StyledBoxStacked>
    );
};

export default BoxStacked;
