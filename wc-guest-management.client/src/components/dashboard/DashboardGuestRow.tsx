import React from 'react';
import { Models } from '../../@types/models';
import DisplayText from '../@ui/DisplayText';
import PrintInfo from '../@ui/PrintInfo';

type Props = {
    info: Models.GuestInfo;
};

const DashboardGuestRow = (props: Props) => {
    const { info } = props;
    return (
        <tr key={info.tableNumber}>
            <td>
                <h2>{info.tableNumber}</h2>
            </td>
            <td>
                <DisplayText>{info.guest}</DisplayText>
            </td>
            <td>
                <DisplayText>{info.volunteer}</DisplayText>
            </td>
            <td>
                <PrintInfo
                    info={info}
                    disabled={info.status === 'printing'}
                />
            </td>
        </tr>
    );
};

export default DashboardGuestRow;
