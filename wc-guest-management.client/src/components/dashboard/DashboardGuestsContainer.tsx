import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { Models } from '../../@types/models';
import { RootState } from '../../store/reducers';
import { dashboardActions } from '../../store/reducers/dashboard.reducer';
import Loading from '../@ui/Loading';
import RoundedPanel from '../@ui/RoundedPanel';
import DashboardGuestCount from './DashboardGuestCount';
import DashboardGuestTable from './DashboardGuestTable';

const mapState = (state: RootState) => ({
    ...state.dashboard
});

type Props = ReturnType<typeof mapState>;

const DashboardGuestsContainer = (props: Props) => {
    const dispatch = useDispatch();
    const handleOnPrint = (info: Models.GuestInfo) => {
        dispatch(dashboardActions.print(info));
    };
    return (
        <>
            <h4 className="text-muted">{new Date().toDateString()}</h4>
            {props.loading && <Loading />}
            {!props.loading && (
                <>
                    <Row>
                        <Col>
                            <DashboardGuestCount
                                count={props.guests.length}
                            />
                        </Col>
                        <Col className="text-right">
                            <Button
                                onClick={() => {
                                    dispatch(dashboardActions.get());
                                }}>
                                refresh
                            </Button>
                        </Col>
                    </Row>
                    <RoundedPanel>
                        <DashboardGuestTable
                            guests={props.guests}
                            onPrint={handleOnPrint}
                        />
                    </RoundedPanel>
                </>
            )}
        </>
    );
};

export default connect(mapState)(DashboardGuestsContainer);
