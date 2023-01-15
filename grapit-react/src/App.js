import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { LogIn, LogOut } from './routes/LogIn';
import ChatRoom from './routes/ChatRoom';
import Chat from './routes/Chat';
import RTC from './routes/RTC';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CollaborationPage } from './routes/CollaborationPage';
import Home from './components/home/Home';
import Canvas from './components/Canvas';
import Header from './components/common/header/Header';
import Vidu from './routes/vidu/Vidu';
import SurveyComponent from './components/home/survey/survey';
import ThreeCanvas from './components/ThreeCanvas';

function App() {
  let chat = useSelector(state => state.chat);

  return (
    <div className="App">
      {/* <NavScroll/> */}
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/chat/room/msg/:roomId" element={<Chat chat={chat} />} />
        <Route path="/chat/room/rtc/:roomId" element={<RTC chat={chat} />} />
        <Route
          path="/chat/room/both/:roomId"
          element={<CollaborationPage chat={chat} />}
        />
        <Route path="/chat/room/:roomId" element={<Chat chat={chat} />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/vidu" element={<Vidu />} />
        <Route path="/survey" element={<SurveyComponent />} />
        <Route path="/three" element={<ThreeCanvas />} />
      </Routes>
    </div>
  );
}

export default App;
