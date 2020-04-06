import FieldContainer from 'components/@ui/FieldContainer';
import RoundedPanel from 'components/@ui/RoundedPanel';
import React, { useState } from 'react';
import { Button, Form, FormControlProps, InputGroup } from 'react-bootstrap';

type Props = {
    onSearch?: (searchCriteria?: string) => void;
};

const DashboardReportGuestDetail = (props: Props) => {
    const [criteria, setCriteria] = useState<string | undefined>('');
    const handleOnChange = (e: React.FormEvent<FormControlProps>) => {
        setCriteria(e.currentTarget.value);
    };
    const handleOnClick = () => {
        props.onSearch && props.onSearch(criteria);
    };
    return (
        <RoundedPanel>
            <div className="p-2">
                <h5 className="p-0 m-0">add guest detail</h5>
                <FieldContainer>
                    <InputGroup>
                        <Form.Control
                            name="dashboardSearch"
                            size="lg"
                            placeholder="search"
                            value={criteria}
                            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.keyCode === 13) {
                                    handleOnClick();
                                }
                            }}
                            onChange={handleOnChange}
                        />
                        <InputGroup.Append>
                            <Button
                                onClick={handleOnClick}
                                variant="dark"
                                type="button"
                                size="lg">
                                search
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </FieldContainer>
            </div>
        </RoundedPanel>
    );
};

export default DashboardReportGuestDetail;
