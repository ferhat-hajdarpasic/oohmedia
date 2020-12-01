import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const roles = [
    {
        "Id": 1,
        "Name": "System Administrator",
        "Parent": 0
    },
    {
        "Id": 2,
        "Name": "Location Manager",
        "Parent": 1,
    },
    {
        "Id": 3,
        "Name": "Supervisor",
        "Parent": 2,
    },
    {
        "Id": 4,
        "Name": "Employee",
        "Parent": 3,
    },
    {
        "Id": 5,
        "Name": "Trainer",
        "Parent": 3,
    }
];

const users = [
    {
        "Id": 1,
        "Name": "Adam Admin",
        "Role": 1
    },
    {
        "Id": 2,
        "Name": "Emily Employee",
        "Role": 4
    },
    {
        "Id": 3,
        "Name": "Sam Supervisor",
        "Role": 3
    },
    {
        "Id": 4,
        "Name": "Mary Manager",
        "Role": 2
    },
    {
        "Id": 5,
        "Name": "Trent Trainer",
        "Role": 5
    }
];

const extractHierarchy = (userId) => {
    const user = users.find(u => u.Id == userId);
    console.log(`User:${JSON.stringify(user)}`);
    if (user) {
        const userRole = roles.find(role => role.Id == user.Role);
        if(userRole) {
            const subRoles = subordinatedRoles(userRole);
            const roleIds = subRoles.map(role => role.Id);
            const result = users.filter(user => roleIds.includes(user.Role));
            return result;
        }
    } else {
        return [];
    }
};

const subordinatedRoles = (parentRole) => {
    // console.log(`parentRole:${JSON.stringify(parentRole)}`);
    const children = roles.filter(role => role.Parent === parentRole.Id);
    let grandChildren = [];
    children.forEach(role => {
        const temp = subordinatedRoles(role);
        if(temp.length > 0) {
            grandChildren = [grandChildren, ...temp];
        }
    });
    // console.log(`Subordinated roles:${JSON.stringify(children)}`);
    if(grandChildren.length > 0) {
        return [children, ...grandChildren];
    } else {
        return children;
    }
};

export default function App() {
    const classes = useStyles();
    const [hideData, setHideData] = React.useState(false);
    const [searchId, setSearchId] = React.useState("");
    const [hierarchy, setHierarchy] = React.useState([]);

    return (
        <Fragment>
            <Box display="flex" flexDirection="column" p={1} m={1} bgcolor="background.paper">
                <FormControl component="fieldset" className={classes.formControl}>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        <TextField id="outlined-basic" label="User Id" variant="outlined" onChange={e => setSearchId(e.target.value)} />
                        <Button disabled={!searchId} variant="contained" color="primary" style={{ marginLeft: "20px" }} onClick={e => setHierarchy(extractHierarchy(searchId))}>
                            Show Hierarchy
                    </Button>
                    </Box>
                </FormControl>

                <TableContainer component={Paper} style={{ marginLeft: "20px", marginBottom: "20px", width: "40%" }}>
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Hierarchy
                </Typography>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hierarchy.map((user) => (
                                <TableRow key={user.Id}>
                                    <TableCell component="th" scope="row">
                                        {user.Id}
                                    </TableCell>
                                    <TableCell>{user.Name}</TableCell>
                                    <TableCell>{user.Role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <FormControl component="fieldset" className={classes.formControl}>
                    <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
                        <TextField id="outlined-basic" label="User Name" variant="outlined" />
                        <TextField id="outlined-basic" label="Role Id" variant="outlined" style={{ marginLeft: "20px" }} />
                        <Button variant="contained" color="primary" style={{ marginLeft: "20px" }}>
                            Add User
                    </Button>
                    </Box>
                </FormControl>

                <Button variant="contained" style={{ marginLeft: "20px", width: "10%" }} onClick={() => setHideData(!hideData)}>
                    {hideData ? "Show Data" : "Hide Data"}
                </Button>

                <TableContainer hidden={hideData} component={Paper} style={{ marginLeft: "20px", marginBottom: "20px", width: "40%" }}>
                    <Typography hidden={hideData} className={classes.title} variant="h6" id="tableTitle" component="div">
                        Users
                </Typography>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.Id}>
                                    <TableCell component="th" scope="row">
                                        {user.Id}
                                    </TableCell>
                                    <TableCell>{user.Name}</TableCell>
                                    <TableCell>{user.Role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer hidden={hideData} component={Paper} style={{ marginLeft: "20px", marginBottom: "20px", width: "40%" }}>
                    <Typography hidden={hideData} className={classes.title} variant="h6" id="tableTitle" component="div">
                        Roles
                </Typography>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Parent</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.Id}>
                                    <TableCell component="th" scope="row">
                                        {role.Id}
                                    </TableCell>
                                    <TableCell>{role.Name}</TableCell>
                                    <TableCell>{role.Parent}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Fragment>
    );
}