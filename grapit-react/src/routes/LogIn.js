import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

export function LogIn() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let dispatch = useDispatch();
  let navigate = useNavigate();

  function login(event) {
    // form으로 submit할 경우 redirect 방지
    event.preventDefault();
    axios
      .post('/api/login', {
        email: email,
        passwd: password,
      })
      .then(res => {
        console.log(res.data);
        dispatch(setUser(res.data));
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        navigate('/login');
      });
  }

  return (
    // <<<<<<< HEAD
    //         <>
    //         <Form onSubmit={login}>
    //             <Form.Group className="mb-3" controlId="formBasicEmail">
    //                 <Form.Label>Email address</Form.Label>
    //                 <Form.Control onChange={event => setEmail(event.target.value)} type="email" placeholder="Enter email"/>
    //                 <Form.Text className="text-muted">
    //                     We'll never share your email with anyone else.
    //                 </Form.Text>
    //             </Form.Group>
    //
    //             <Form.Group className="mb-3" controlId="formBasicPassword">
    //                 <Form.Label>Password</Form.Label>
    //                 <Form.Control onChange={event => setPassword(event.target.value)} type="password" placeholder="Password"/>
    //             </Form.Group>
    //             <Form.Group className="mb-3" controlId="formBasicCheckbox">
    //                 <Form.Check type="checkbox" label="Check me out"/>
    //             </Form.Group>
    //             <Button variant="primary" type="submit">
    //                 Submit
    //             </Button>
    //         </Form>
    //         <footer>
    //                 <p>First time? <Link to="/register">Create an account</Link>.</p>
    //                 <p><Link to="/">Back to Homepage</Link>.</p>
    //             </footer>
    //         </>
    // =======

    <div className="Auth-form-container">
      <Form className="Auth-form" onSubmit={login}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">로그인</h3>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            <div className="text-start">
              <Form.Label>아이디</Form.Label>
            </div>
            <Form.Control
              onChange={event => setEmail(event.target.value)}
              type="email"
              className="mt-1"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mt-4" controlId="formBasicPassword">
            <div className="text-start">
              <Form.Label>비밀번호</Form.Label>
            </div>
            <Form.Control
              onChange={event => setPassword(event.target.value)}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </Form.Group>
          <div className="d-grid gap-2 mt-4">
            <Button type="submit" className="btn btn-primary">
              로그인
            </Button>
          </div>
          <p className="forgot-password text-right mt-2">
            <a href="#">비밀번호</a>를 잊어버리셨나요?
          </p>
        </div>
      </Form>
    </div>

    // <Container style={{height : '100vh',marginTop:'20vh'}}>
    //     <Row className="justify-content-md-center mx-auto">
    //         <Col xs="4">
    //             <Form onSubmit={login}>
    //                 <Form.Group className="mb-3" controlId="formBasicEmail">
    //                     <Form.Label>Email address</Form.Label>
    //                     <Form.Control onChange={event => setEmail(event.target.value)} type="email" placeholder="아이디를 입력해주세요"/>
    //                 </Form.Group>
    //                 <Form.Group className="mb-3" controlId="formBasicPassword">
    //                     <Form.Label>Password</Form.Label>
    //                     <Form.Control onChange={event => setPassword(event.target.value)} type="password" placeholder="비밀번호를 입력해주세요"/>
    //                 </Form.Group>
    //                 {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
    //                 {/*    <Form.Check type="checkbox" label="Check me out"/>*/}
    //                 {/*</Form.Group>*/}
    //                 <Row>
    //                     <Col>
    //                         <Button variant="primary" size="lg" type="submit">
    //                             로그인
    //                         </Button>
    //                     </Col>
    //                 </Row>
    //             </Form>
    //         </Col>
    //     </Row>
    // </Container>
  );
}

export function LogOut() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  axios
    .get('/api/logout')
    .then(res => {
      console.log(res.data);
      dispatch(setUser({ email: null, nickName: null }));
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      navigate('/');
    });

  return <div>로그아웃중</div>;
}
