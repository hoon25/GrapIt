import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavScroll() {
  let user = useSelector(state => state.user);
  let navigate = useNavigate();
  return (
    // <Navbar bg="dark" expand="lg" variant="dark">
    <Navbar style={{ width: '100%' }} bg="white" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">PytaGrapIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate('/chat')}>Chatting</Nav.Link>
            <Nav.Link onClick={() => navigate('/')}>Find teacher</Nav.Link>
            <NavDropdown title="3D" id="navbarScrollingDropdown">
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action7">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {user.nickName == null ? (
              <Nav.Link onClick={() => navigate('/login')}>로그인</Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate('/logout')}>
                {user.nickName} 로그아웃
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
