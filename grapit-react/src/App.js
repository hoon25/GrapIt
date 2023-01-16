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
import OCR from './routes/ocr/OCR';
import JoinMember from './routes/JoinMember';
import SurveyComponent from './components/home/survey/survey';
import ThreeCanvas from './components/ThreeCanvas';
import BaseCanvas from './components/BaseCanvas';

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
        <Route path="/join" element={<JoinMember />} />
        <Route path="/room" element={<ChatRoom />} />
        <Route
          path="/room/:roomId"
          element={<CollaborationPage chat={chat} />}
        />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/ocr" element={<OCR />} />
        <Route path="/survey" element={<SurveyComponent />} />
        <Route path="/three" element={<ThreeCanvas />} />
        <Route path="/base" element={<BaseCanvas />} />
      </Routes>
    </div>
  );
}

export default App;
