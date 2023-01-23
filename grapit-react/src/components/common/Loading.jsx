import { Button, Modal, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Loading({ isConnected }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isConnected) {
      setShow(true);
    }
  }, [isConnected]);

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -15%)',
      }}
    >
      {/*<Modal.Header>*/}
      {/*  <Modal.Title>연결 중입니다...</Modal.Title>*/}
      {/*</Modal.Header>*/}
      <Modal.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: 0,
            margin: 0,
          }}
        >
          <h2>
            연결중...
            <Spinner animation="border" variant="primary" />
          </h2>
        </div>
      </Modal.Body>
      <Button>혼자 그리러 가기</Button>
    </Modal>
  );
}
