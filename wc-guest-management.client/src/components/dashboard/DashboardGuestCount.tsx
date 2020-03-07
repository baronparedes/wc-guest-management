import React from 'react';
import { Badge } from 'react-bootstrap';

const DashboardGuestCount: React.FC<{ count?: number }> = props => {
    return (
        <h3>
            Queued
            <Badge className="ml-2" variant="primary">
                {props.count}
            </Badge>
        </h3>
    );
};

export default DashboardGuestCount;
