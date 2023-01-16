import { useState } from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function CreateRoom({modalShow,handleClose, handleShow}) {

  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>수업방 생성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>수업방 이름</Form.Label>
              <Form.Control onChange={e => setRoomName(e.target.value)} as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={() => {
            console.log(roomName);
            axios.post('/api/room', {roomName: roomName})
                .then(navigate('/room'));
            handleClose();
          }}>
            생성하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
