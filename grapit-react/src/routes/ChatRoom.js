import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChat } from '../store/chatSlice';
import { CreateRoom } from './CreateRoom';
import './vidu/CreateRoom.css';
import './ChatRoom.css';

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
    });
  }

  return (
    <>
      <button
        className="custom-btn btn-9 "
        style={{ width: '20rem', height: '3rem' }}
        onClick={handleShow}
      >
        방 생성하기
      </button>
      <CreateRoom
        modalShow={createRoomShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <div className="article1">
        {chatList.map((chat, index) => (
          <div key={index}>
            <ChatRoom chat={chat} />
          </div>
        ))}
      </div>
    </>
  );
}

function ChatRoom({ chat, index }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  return (
    <>
      <div className="article">
        <div className="card98" style={{ width: '18rem' }} data-aos="fade-up">
          <div className="card__container">
            <span style={{ fontWeight: 'bold' }}> {chat.roomName} </span>

            <span>선생님 : {chat.roomCreatorNickName}</span>
            <div>
              <Button
                variant="primary"
                onClick={function () {
                  dispatch(setChat(chat));
                  navigate(`/room/${chat.roomId}`);
                }}
              >
                입장하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatRoomList;
