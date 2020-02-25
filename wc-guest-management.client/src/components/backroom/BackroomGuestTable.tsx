import React from 'react';
import { Table } from 'react-bootstrap';
import { Models } from '../../@types/models';
import BackroomGuestRow from './BackroomGuestRow';

type Props = {
    guests?: Models.GuestMetadata[];
};

const BackroomGuestTable = (props: Props) => {
    return (
        <Table responsive hover size="lg">
            <thead className="thead-primary">
                <tr>
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
                            <BackroomGuestRow
                                key={guest.id}
                                info={guest}
                            />
                        );
                    })}
            </tbody>
        </Table>
    );
};

export default BackroomGuestTable;
