import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import ArrowForward from '@mui/icons-material/ArrowForward';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
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
export default function User({ user }) {
    const navigate = useNavigate();

    if (!user) {
        navigate('/');
        return null;
    }

    return (
        <List sx={{ width: 'full', bgcolor: 'background.paper' }}>
            {user.blogs.map((blog) => (
                <ListItem key={blog.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <ArrowForward />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={blog.title}
                        secondary={blog.author}
                    />
                </ListItem>
            ))}
        </List>
    );
}
