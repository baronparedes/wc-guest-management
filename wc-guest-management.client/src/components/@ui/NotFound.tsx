import routes from '@utils/routes';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="text-center">
            <h2 style={{ marginTop: '2em' }}>Page Not Found - 404</h2>
            <Link to={routes.ROOT}>
                <Button>Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
