import React from 'react';
import Navbar from "./navbar";
import {Avatar, Container, Grid, Paper} from "@mui/material";
import GroupIcon from '@material-ui/icons/Group';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Link} from "@mui/material";

const paperStyle={padding:20,height:140,width:280,margin:"auto,auto"}
const textStyle = {margin: "10px"}
const Index = () => {
    return (
        <div>
            <Navbar/>
            <Container maxWidth="sx">
                <Grid  container
                       direction="row"
                       justifyContent="space-evenly"
                       alignItems="baseline">
                   <Link href='../admin/teacher' underline="none">
                        <Grid item xs>
                            <Paper style={paperStyle}>
                                <Grid align='center'>
                                    <Avatar><AccountBoxIcon/></Avatar>
                                    <h4 style={textStyle}>Teachers</h4>
                                </Grid>
                            </Paper>
                        </Grid>
                   </Link>
                    <Link href='../admin/lessons' underline="none">
                        <Grid item xs>
                            <Paper style={paperStyle}>
                                <Grid align='center'>
                                    <Avatar><MenuBookIcon/></Avatar>
                                    <h4 style={textStyle}>Lessons</h4>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Link>
                    <Link href='../admin/schedules' underline="none">
                        <Grid item xs>
                            <Paper style={paperStyle}>
                                <Grid align='center'>
                                    <Avatar><LibraryBooksIcon/></Avatar>
                                    <h4 style={textStyle}>Schedules</h4>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Link>
                    <Link href='../admin/groups' underline="none">
                        <Grid item xs>
                            <Paper style={paperStyle}>
                                <Grid align='center'>
                                    <Avatar><GroupIcon/></Avatar>
                                    <h4 style={textStyle}>Groups</h4>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Link>
                    <Link href='../admin/student' underline="none">
                        <Grid item xs>
                            <Paper style={paperStyle}>
                                <Grid align='center'>
                                    <Avatar><AccountBoxIcon/></Avatar>
                                    <h4 style={textStyle}>Students</h4>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Link>
                </Grid>
            </Container>
        </div>
    );
};

export default Index;