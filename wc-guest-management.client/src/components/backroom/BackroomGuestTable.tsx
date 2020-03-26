import React from 'react';
import { Table } from 'react-bootstrap';
import { Guest } from '../../Api';
import BackroomGuestRow from './BackroomGuestRow';
import GuestMetadataForm from './GuestMetadataForm';

type Props = {
    guests?: Guest[];
};

const BackroomGuestTable = (props: Props) => {
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
                            <BackroomGuestRow
                                key={guest._id as string}
                                {...guest}>
                                <GuestMetadataForm metadata={guest} />
                            </BackroomGuestRow>
                        );
                    })}
            </tbody>
        </Table>
    );
};

export default BackroomGuestTable;
