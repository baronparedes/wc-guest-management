import logo from '@assets/img/wc-logo-transparent.png';
import { formatDate } from '@utils/dates';
import BoxStacked from 'components/@ui/BoxStacked';
import FieldChecklist from 'components/@ui/FieldChecklist';
import FieldContainer from 'components/@ui/FieldContainer';
import { DarkCol } from 'components/@ui/StyledCol';
import React from 'react';
import { Button, Col, ColProps, Form, Image } from 'react-bootstrap';

type FormRegister = {
    register: any;
};

export const GuestFormHeader = () => {
    return (
        <DarkCol className="text-right">
            <Image src={logo} height="80px" />
        </DarkCol>
    );
};

export const GuestFormTableNumber: React.FC<{ tableNumber: number }> = ({
    tableNumber,
}) => {
    return (
        <BoxStacked className="text-center rounded-md">
            <label className="m-auto display-2 text-bold">{tableNumber}</label>
        </BoxStacked>
    );
};

export const GuestFormVisitDate: React.FC<
    {
        series?: number | null;
        visitDate: string;
        as?: React.ElementType;
    } & ColProps
> = ({ as, series, visitDate, children, ...colProps }) => {
    return (
        <FieldContainer as={as} {...colProps} label="visit date" className="text-left m-0">
            <div>
                <h4 className="font-weight-bold float-left">
                    {formatDate(new Date(visitDate))}
                </h4>
                <span className="text-muted float-right">{series}</span>
            </div>
            {children}
        </FieldContainer>
    );
};

export const GuestFormWorshipTime: React.FC<FormRegister & ColProps> = ({
    register,
    ...colProps
}) => {
    return (
        <FieldContainer
            as={Col}
            {...colProps}
            label="time"
            className="m-0"
            controlId="worshipTime">
            <br />
            <FieldChecklist
                required
                checklist={['9 AM', '12 NN', '3 PM', '6 PM']}
                inline
                type="radio"
                name="worshipTime"
                register={register}
            />
        </FieldContainer>
    );
};

export const GuestFormWelcomeNotes: React.FC<FormRegister> = ({ register }) => {
    return (
        <FieldContainer as={Col} label="welcome notes..." controlId="action">
            <br />
            <FieldChecklist
                required
                checklist={['A', 'DNA', 'Prayed', 'Counseled']}
                inline
                type="radio"
                name="action"
                register={register}
            />
        </FieldContainer>
    );
};

export const GuestFormVolunteer: React.FC<FormRegister> = ({ register }) => {
    return (
        <FieldContainer as={Col} label="volunteer" controlId="volunteer">
            <Form.Control
                required
                ref={register}
                name="volunteer"
                placeholder="volunteer"
                size="lg"
            />
        </FieldContainer>
    );
};

export const GuestFormAge: React.FC<FormRegister & ColProps> = ({
    register,
    ...colProps
}) => {
    return (
        <FieldContainer as={Col} {...colProps} label="age" controlId="age">
            <Form.Control
                required
                ref={register}
                name="age"
                type="number"
                placeholder="age"
                size="lg"
            />
        </FieldContainer>
    );
};

export const GuestFormSaveButton: React.FC<{ loading?: boolean }> = ({ loading }) => {
    return (
        <FieldContainer as={Col} className="text-right">
            <Button variant="primary" type="submit" size="lg" disabled={loading}>
                Save
            </Button>
        </FieldContainer>
    );
};
