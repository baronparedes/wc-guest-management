import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/reducers';
import Loading from '../@ui/Loading';
import RoundedPanel from '../@ui/RoundedPanel';
import BackroomFilter from './BackroomFilter';
import BackroomGuestTable from './BackroomGuestTable';

const mapState = (state: RootState) => ({
    ...state.backroom
});

type Props = ReturnType<typeof mapState>;

const BackroomGuestsContainer = (props: Props) => {
    if (props.loading) {
        return <Loading />;
    }
    return (
        <>
            <BackroomFilter />
            <RoundedPanel>
                <BackroomGuestTable guests={props.guestMetadata} />
            </RoundedPanel>
        </>
    );
};

export default connect(mapState)(BackroomGuestsContainer);
