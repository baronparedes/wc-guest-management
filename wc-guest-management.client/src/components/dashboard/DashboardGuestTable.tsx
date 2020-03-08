import React from 'react';
import { Table } from 'react-bootstrap';
import { Models } from '../../@types/models';
import DashboardGuestRow from './DashboardGuestRow';

type Props = {
    guests?: Models.GuestInfo[];
};

const DashboardGuestTable = (props: Props) => {
    return (
        <Table responsive hover size="lg">
            <thead className="thead-primary">
                <tr>
                    <th>table</th>
                    <th>guest</th>
                    <th>volunteer</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.guests &&
                    props.guests.map(guest => {
                        return (
                            <DashboardGuestRow
                                key={guest.id}
                                info={guest}
                            />
                        );
                    })}
            </tbody>
        </Table>
    );
};

export default DashboardGuestTable;
