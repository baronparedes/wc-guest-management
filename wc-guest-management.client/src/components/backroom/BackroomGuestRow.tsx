import React from 'react';
import { Models } from '../../@types/models';
import DisplayText from '../@ui/DisplayText';

type Props = {
    info: Models.GuestMetadata;
};

const BackroomGuestRow = (props: Props) => {
    const { info } = props;
    return (
        <tr>
            <td>
                <h2>{info.id}</h2>
            </td>
            <td>
                <DisplayText>{info.guest}</DisplayText>
            </td>
            <td>
                <DisplayText>{info.volunteer}</DisplayText>
            </td>
            <td>Actions</td>
        </tr>
    );
};

export default BackroomGuestRow;
