import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {LogIn, LogOut} from './routes/LogIn';
import ChatRoom from "./routes/ChatRoom";
import Chat from "./routes/Chat";
import RTC from "./routes/RTC";
import NavScroll from './navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home';
import Canvas from "./routes/Canvas";
import RtcChat from "./routes/RtcChat";
import TestVidu from "./routes/vidu/TestVidu";
import home from './components/home/Home';
import Header from './components/common/header/Header';



function App() {
    let user = useSelector(state => state.user);
    let chat = useSelector(state => state.chat);
    let canvas = useSelector(state => state.canvas);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <div className="App">
            {/* <NavScroll/> */}
            <Header />
            <Routes>
            
                <Route exact path="/" element={<Home/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="/chat" element={<ChatRoom/>}/>
                <Route path="/chat/room/msg/:roomId" element={<Chat chat={chat}/>}/>
                <Route path="/chat/room/rtc/:roomId" element={<RTC chat={chat}/>}/>
                <Route path="/chat/room/both/:roomId" element={<RtcChat chat={chat}/>}/>
                <Route path="/chat/room/:roomId" element={<Chat chat={chat}/>}/>
                <Route path="/canvas" element={<Canvas/>}/>
                <Route path="/vidu" element={<TestVidu/>}/>
            
            </Routes>
            
        </div>
    );
}

export default App;
