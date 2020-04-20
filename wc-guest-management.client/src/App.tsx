import React from 'react';
import { RestfulProvider } from 'restful-react';
import { useRootState } from 'store';

const App: React.FC = (props) => {
    const profile = useRootState((state) => state.profile);
    const requestOptions: RequestInit = {
        headers: {
            authorization: profile && profile.token ? profile.token : '',
        },
    };
    return (
        <RestfulProvider
            base={process.env.REACT_APP_API_URI}
            requestOptions={requestOptions}>
            <div id="content">
                {props.children}
                <span className="p-3" />
            </div>
        </RestfulProvider>
    );
};

export default App;
