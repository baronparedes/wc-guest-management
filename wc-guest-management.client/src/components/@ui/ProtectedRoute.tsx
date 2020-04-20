import routes from '@utils/routes';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useRootState } from 'store';

type Props = {
    exact?: boolean;
    path?: string;
    component: React.ComponentType<RouteProps>;
};

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
    const profile = useRootState((state) => state.profile);
    return (
        <Route
            {...rest}
            render={(props) => (
                <>
                    {profile.token ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={routes.LOGIN} />
                    )}
                </>
            )}
        />
    );
};

export default ProtectedRoute;
