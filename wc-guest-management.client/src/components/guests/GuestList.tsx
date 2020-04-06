import { Guest } from 'Api';
import RoundedPanel from 'components/@ui/RoundedPanel';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import GuestListArea from './GuestListArea';
import GuestListTable from './GuestListTable';

export type GuestListProps = {
    guests: Guest[];
};

const GuestList = (props: GuestListProps) => {
    const [areaToggle, setAreaToggle] = useState(true);
    const handleOnToggle = () => setAreaToggle(!areaToggle);
    return (
        <>
            <div className="pb-2 text-right">
                <Form.Check
                    type="switch"
                    id="area-view-switch"
                    label="by area"
                    checked={areaToggle}
                    onChange={handleOnToggle}
                />
            </div>
            <RoundedPanel>
                {areaToggle && <GuestListArea {...props} />}
                {!areaToggle && <GuestListTable {...props} />}
            </RoundedPanel>
        </>
    );
};

export default GuestList;
