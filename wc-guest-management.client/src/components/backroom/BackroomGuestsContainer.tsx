import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/reducers';
import Loading from '../@ui/Loading';
import RoundedPanel from '../@ui/RoundedPanel';
import BackroomGuestTable from './BackroomGuestTable';

const mapState = (state: RootState) => ({
    ...state.backroom
});

type Props = ReturnType<typeof mapState>;

const BackroomGuestsContainer = (props: Props) => {
    return (
        <>
            {props.loading && <Loading />}
            {!props.loading && (
                <>
                    <RoundedPanel>
                        <BackroomGuestTable
                            guests={props.guestMetadata}
                        />
                    </RoundedPanel>
                    <span className="p-3" />
                </>
            )}
        </>
    );
};

export default connect(mapState)(BackroomGuestsContainer);
