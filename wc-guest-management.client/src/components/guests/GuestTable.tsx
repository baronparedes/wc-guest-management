import React from 'react';
import { Table } from 'react-bootstrap';
import { Guest } from '../../Api';
import GuestGuestRow from './GuestRow';

type Props = {
    guests?: Guest[];
};

const GuestGuestTable = (props: Props) => {
    return (
        <Table responsive hover size="lg">
            <thead className="thead-primary">
                <tr>
                    <th>table</th>
                    <th>id</th>
                    <th>guest</th>
                    <th>volunteer</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.guests &&
                    props.guests.map(guest => {
                        return (
                            <GuestGuestRow
                                key={guest._id as string}
                                {...guest}></GuestGuestRow>
                        );
                    })}
            </tbody>
        </Table>
    );
};

export default GuestGuestTable;
