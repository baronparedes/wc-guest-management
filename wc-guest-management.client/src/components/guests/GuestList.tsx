import { Guest } from 'Api';
import RoundedPanel from 'components/@ui/RoundedPanel';
import React from 'react';
import { Alert, Form } from 'react-bootstrap';
import GuestListArea from './GuestListArea';
import GuestListTable from './GuestListTable';

export type GuestListProps = {
    guests: Guest[];
};

type Props = {
    areaToggle: boolean;
    onAreaToggle: () => void;
};

const GuestList = (props: GuestListProps & Props) => {
    return (
        <>
            {props.guests.length === 0 && (
                <Alert variant="info" className="text-center">
                    <strong>there were no guests found with the given criteria</strong>
                </Alert>
            )}
            {props.guests.length !== 0 && (
                <>
                    <div className="pb-2 text-right">
                        <Form.Check
                            type="switch"
                            id="area-view-switch"
                            label="by area"
                            checked={props.areaToggle}
                            onChange={props.onAreaToggle}
                        />
                    </div>
                    <RoundedPanel>
                        {props.areaToggle && <GuestListArea guests={props.guests} />}
                        {!props.areaToggle && <GuestListTable guests={props.guests} />}
                    </RoundedPanel>
                </>
            )}
        </>
    );
};

export default GuestList;
