import PrintInfo from 'components/@ui/PrintInfo';
import React from 'react';
import { Card, CardColumns, ListGroup } from 'react-bootstrap';
import { GuestListProps } from './GuestList';

const GuestListArea = (props: GuestListProps) => {
    const tables = [...new Set(props.guests.map((g) => g.tableNumber))];

    return (
        <>
            <CardColumns className="m-3">
                {tables.map((table) => {
                    const guestsByTable = props.guests.filter(
                        (g) => g.tableNumber === table
                    );
                    const volunteer = guestsByTable[0].volunteer;
                    return (
                        <Card style={{ width: '300px' }} key={table}>
                            <Card.Header className="bg-primary text-white">
                                <h4>table {table}</h4>
                            </Card.Header>
                            <Card.Body className="p-0 m-0">
                                <ListGroup variant="flush">
                                    {guestsByTable.map((guest) => {
                                        return (
                                            <ListGroup.Item>
                                                <strong>{guest.guest}</strong>
                                                <label className="text-muted float-right">
                                                    {guest.series}
                                                </label>
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer>
                                <label>{volunteer}</label>
                                <PrintInfo className="float-right" guests={guestsByTable} />
                            </Card.Footer>
                        </Card>
                    );
                })}
            </CardColumns>
        </>
    );
};

export default GuestListArea;
