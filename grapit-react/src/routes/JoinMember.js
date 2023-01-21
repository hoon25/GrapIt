import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinMember() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickname: '',
  });
  let navigate = useNavigate();

  const joinMember = e => {
    e.preventDefault();
    axios
      .post('/api/join', {
        email: form.email,
        password: form.password,
        name: form.name,
        nickName: form.nickname,
      })
      .then(res => {
        alert('회원가입이 완료되었습니다.');
        navigate('/');
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control
          type="password"
          onChange={e => setForm({ ...form, passwordConfirm: e.target.value })}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>닉네임</Form.Label>
        <Form.Control
          type="text"
          onChange={e => setForm({ ...form, nickname: e.target.value })}
          placeholder="NickName"
        />
      </Form.Group>
      <Button variant="primary" onClick={joinMember} type="submit">
        회원가입
      </Button>
    </Form>
  );
}

export default JoinMember;
