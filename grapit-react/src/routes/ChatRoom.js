import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChat } from '../store/chatSlice';
import { CreateRoom } from './CreateRoom';

function ChatRoomList() {
  const [chatList, setChatList] = useState([]);
  let navigate = useNavigate();

  const [createRoomShow, setCreateRoomShow] = useState(false);
  const handleClose = () => setCreateRoomShow(false);
  const handleShow = () => setCreateRoomShow(true);

  useEffect(() => getAllChatRoom(), []);

  function getAllChatRoom() {
    axios.get('/api/room').then(res => {
      setChatList(res.data);
      console.log(res.data);
    });
  }

  return (
    <>
      <Button variant="danger" style={{ float: 'right' }} onClick={handleShow}>
        수업방 생성하기
      </Button>
      <CreateRoom
        modalShow={createRoomShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>NO</th>
            <th>수업방 이름</th>
            <th>선생님 닉네임</th>
            <th>입장하기</th>
          </tr>
        </thead>
        <tbody>
          {chatList.map((chat, i) => (
            <ChatRoom chat={chat} i={i} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

function ChatRoom({ chat, i }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  return (
    <>
      <tr>
        <td></td>
        <td>{i}</td>
        <td>{chat.roomName}</td>
        <td>{chat.roomCreatorNickName}</td>
        <td>
          <Button
            variant="primary"
            onClick={function () {
              dispatch(setChat(chat));
              navigate(`/room/${chat.roomId}`);
            }}
          >
            입장하기
          </Button>
        </td>
      </tr>
    </>
  );
}
export default ChatRoomList;
