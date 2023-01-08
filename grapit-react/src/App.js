import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {LogIn, LogOut} from './routes/LogIn';
import ChatRoom from "./routes/ChatRoom";
import Chat from "./routes/Chat";
import RTC from "./routes/RTC";
import NavScroll from './navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage'
import TestRoom from "./routes/testRoom";
import Canvas from "./routes/Canvas";
import {CollaborationPage} from "./routes/CollaborationPage";


function App() {
    let user = useSelector(state => state.user);
    let chat = useSelector(state => state.chat);

    return (
        <div className="App">
            <NavScroll/>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="/chat" element={<ChatRoom/>}/>
                <Route path="/chat/room/msg/:roomId" element={<Chat chat={chat}/>}/>
                <Route path="/chat/room/rtc/:roomId" element={<RTC chat={chat}/>}/>
                <Route path="/chat/room/both/:roomId" element={<CollaborationPage chat={chat}/>}/>
                <Route path="/chat/room/:roomId" element={<Chat chat={chat}/>}/>
                <Route path="/chat/room/testRoom" element={<CollaborationPage/>}/>
                <Route path="/canvas" element={<Canvas/>}/>
            </Routes>
        </div>
    );
}

export default App;
