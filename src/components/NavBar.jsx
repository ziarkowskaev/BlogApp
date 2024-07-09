import ReactDOM from 'react-dom/client';
import { useState } from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from 'react-router-dom';

import { AppBar, Toolbar, Button } from '@mui/material';
const NavBar = () => {
    const padding = {
        padding: 5,
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/">
                    blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    users
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
