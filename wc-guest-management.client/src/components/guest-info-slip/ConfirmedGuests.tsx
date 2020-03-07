import React from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { Models } from '../../@types/models';
import DisplayLabel from '../@ui/DisplayLabel';

type Props = {
    guests: Models.GuestInfo[];
    ok: () => void;
};

const ConfirmedGuests = (props: Props) => {
    return (
        <Container className="text-center">
            <DisplayLabel>Thank You!</DisplayLabel>
            <h4 className="text-muted">
                The following guests has been queued...
            </h4>
            <ListGroup variant="flush" className="mt-3 mb-3">
                {props.guests.map(g => {
                    return (
                        <ListGroup.Item key={g.id}>
                            {g.guest}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <Button onClick={props.ok}>Start over</Button>
        </Container>
    );
};

export default ConfirmedGuests;
