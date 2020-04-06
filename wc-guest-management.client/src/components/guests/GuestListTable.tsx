import React from 'react';
import { Table } from 'react-bootstrap';
import { GuestListProps } from './GuestList';
import GuestListRow from './GuestListRow';

const GuestListTable = (props: GuestListProps) => {
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
                    props.guests.map((guest) => {
                        return (
                            <GuestListRow
                                key={guest._id as string}
                                {...guest}></GuestListRow>
                        );
                    })}
            </tbody>
        </Table>
    );
};

export default GuestListTable;
