import routes from '@utils/routes';
import Header from 'components/@ui/Header';
import NotFound from 'components/@ui/NotFound';
import DashboardView from 'components/dashboard/DashboardView';
import GuestInfoSlipView from 'components/guest-info-slip/GuestInfoSlipView';
import GuestView from 'components/guests/GuestView';
import LoginView from 'components/profile/LoginView';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={routes.ROOT} exact component={GuestInfoSlipView} />
                <Route path={routes.LOGIN} exact component={LoginView} />
                <Route>
                    <Header />
                    <Switch>
                        <Route path={routes.DASHBOARD} exact component={DashboardView} />
                        <Route path={routes.GUESTS} exact component={GuestView} />
                        <Route component={NotFound} />
                    </Switch>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;
