import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BrowserRouter as Router, Link } from 'react-router-dom';
const Users = ({ users }) => {
    function createData(name, id, blogsCount) {
        return { name, id, blogsCount };
    }
    const rows = users.map((user) =>
        createData(user.name, user.id, user.blogs.length),
    );

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Users</TableCell>
                        <TableCell align="right">Blogs created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`/users/${row.id}`}>{row.name}</Link>
                            </TableCell>
                            <TableCell align="right">
                                {row.blogsCount}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Users;
