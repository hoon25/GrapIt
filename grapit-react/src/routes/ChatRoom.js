import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setChat } from '../store/chatSlice';
import { CreateRoom } from './CreateRoom';
import './vidu/CreateRoom.css';
import './ChatRoom.css';

function ChatRoomList() {
  const user = useSelector(state => state.user);
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

  function isUserLoggedIn() {
    return user.nickName !== null;
  }

  return (
    <>
      <button
        className="custom-btn btn-9 "
        style={{ width: '20rem', height: '3rem' }}
        onClick={() => {
          if (isUserLoggedIn()) {
            handleShow();
          } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
          }
        }}
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
  const user = useSelector(state => state.user);

  function isUserLoggedIn() {
    return user.nickName !== null;
  }

  return (
    <>
      <div className="article">
        <div className="card98" style={{ width: '18rem' }} data-aos="fade-up">
          <div className="card__container">
            <span style={{ fontWeight: 'bold' }}> {chat.roomName} </span>

              <span>선생님 닉네임: {chat.roomCreatorNickName}</span>
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (isUserLoggedIn()) {
                      dispatch(setChat(chat));
                      navigate(`/room/${chat.roomId}`);
                    } else {
                      alert('로그인이 필요합니다.');
                      navigate('/login');
                    }
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
