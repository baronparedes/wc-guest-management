import React from 'react';
import { Alert, Button, Container, ListGroup } from 'react-bootstrap';
import { Guest } from '../../Api';
import DisplayLabel from '../@ui/DisplayLabel';

type Props = {
    guests: Guest[];
    volunteer: string;
    ok: () => void;
};

const ConfirmedGuests = (props: Props) => {
    return (
        <Container className="text-center">
            <DisplayLabel>Thank You!</DisplayLabel>
            <h3 className="text-muted">{props.volunteer}</h3>
            <Alert variant="success">
                The following guests has been queued...
            </Alert>
            <ListGroup variant="flush" className="mt-3 mb-3">
                {props.guests.map(g => {
                    return (
                        <ListGroup.Item key={g._id ? g._id : ''}>
                            <h3>{g.guest}</h3>
                            <span className="text-muted">
                                {g.series}
                            </span>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <Button onClick={props.ok}>Start over</Button>
        </Container>
    );
};

export default ConfirmedGuests;
