import logo from '@assets/img/wc-logo-transparent.png';
import routes from '@utils/routes';
import React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavCurrentProfile from './NavCurrentProfile';

const Navigation: React.FC = () => {
    return (
        <Container>
            <Navbar expand="lg" variant="dark" className="p-0">
                <Navbar.Brand href="#home">
                    <Image src={logo} height="80px" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to={routes.DASHBOARD} exact>
                            dashboard
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.GUESTS} exact>
                            guests
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={routes.GUEST_INFO_SLIP} exact>
                            guest info slip
                        </Nav.Link>
                    </Nav>
                    <NavCurrentProfile />
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Navigation;
