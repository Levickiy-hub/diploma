import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import {useHttp} from "../../hooks/http.hook";

const Header = () => {
    const {request}=useHttp();
    const OnClickLogOut=async()=>{
        try{
            await request('/api/logout','GET');
        }
        catch (e){
            console.log(e.toString())
        };
    }
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="../admin/teacher"> Teachers</Nav.Link>
                        <Nav.Link href="../admin/lessons">Lessons</Nav.Link>
                        <Nav.Link href="../admin/schedules">Schedules</Nav.Link>
                        <Nav.Link href="../admin/groups">Groups</Nav.Link>
                        <Nav.Link href="../admin/student">Student</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        Signed in as:
                        <NavDropdown  title= {username} id="navbarScrollingDropdown" >
                            <NavDropdown.Item href="/updatepassword" style={{
                                color: 'black'
                            }}>update password</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/auth' onClick={OnClickLogOut} style={{
                                color: 'black'
                            }}>
                                out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;