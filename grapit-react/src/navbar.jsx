import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";


function NavScroll() {
    let user = useSelector(state => state.user);
    let navigate = useNavigate();
    return (
        // <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">PytaGrapIt</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll>
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <Nav.Link href="#action2">Graph</Nav.Link>
                        <Nav.Link onClick={() => navigate("/chat")}>Chatting</Nav.Link>
                        <Nav.Link href="#action4">영상</Nav.Link>
                        <Nav.Link onClick={() => navigate("/canvas")}>Canvas</Nav.Link>
                        <NavDropdown title="3D" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action5">2D</NavDropdown.Item>
                            <NavDropdown.Item href="#action6">
                                3D with Graph
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action7">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>


                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    <Nav>
                        {
                            user.nickName == null
                                ? <Nav.Link onClick={() => navigate("/login")}>로그인</Nav.Link>
                                : <Nav.Link onClick={() => navigate("/logout")}>{user.nickName} 로그아웃</Nav.Link>
                        }
                        {/*<Nav.Link href="/login">로그인</Nav.Link>*/}
                        {/*<Nav.Link href="/logout">로그아웃</Nav.Link>*/}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScroll;