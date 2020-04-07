import { Slot } from '@models';
import { Guest } from 'Api';
import PrintInfo from 'components/@ui/PrintInfo';
import React from 'react';
import { Card, CardColumns, ListGroup } from 'react-bootstrap';
import { GuestListProps } from './GuestList';

const GuestListArea = (props: GuestListProps) => {
    function renderByTable() {
        const tables = [...new Set(props.guests.map((g) => g.tableNumber))];
        return tables.map((table) => {
            const guestsByTable = props.guests.filter((g) => g.tableNumber === table);
            return renderBySlot(table, guestsByTable);
        });
    }

    function renderBySlot(table: number, guestsByTable: Guest[]) {
        const slots = [...new Set(guestsByTable.map((g) => g.worshipTime))];
        return slots.map((slot) => {
            const guestsByTableAndSlot = guestsByTable.filter(
                (g) => g.worshipTime === slot
            );
            return renderGuests(table, guestsByTableAndSlot, slot);
        });
    }

    function renderGuests(table: number, guests: Guest[], slot?: Slot | null) {
        const volunteer = guests[0].volunteer;
        return (
            <Card style={{ width: '320px' }} key={`table-${table}`} className="mb-4">
                <Card.Header className="bg-primary text-white">
                    <h4>
                        table {table}
                        {slot && <small className="float-right">{slot}</small>}
                    </h4>
                </Card.Header>
                <Card.Body className="p-0 m-0">
                    <ListGroup variant="flush">
                        {guests.map((guest) => {
                            return (
                                <ListGroup.Item key={`guest-${guest._id}`}>
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
                    <PrintInfo className="float-right" guests={guests} />
                </Card.Footer>
            </Card>
        );
    }

    return <CardColumns className="m-3">{renderByTable()}</CardColumns>;
};

export default GuestListArea;
