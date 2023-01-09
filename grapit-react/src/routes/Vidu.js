import {useEffect, useState} from "react";
import '../css/vidu.css';

import OpenViduSession from 'openvidu-react';
import axios from 'axios';

function Vidu({user, chat}) {

    // let [mySessionId, setMySessionId] = useState(undefined);
    let [token, setToken] = useState(undefined);

    function handlerJoinSessionEvent() {
        console.log('Join session');
    }

    function handlerLeaveSessionEvent() {
        console.log('Leave session');
        // setMySessionId(undefined);
    }

    function handlerErrorEvent() {
        console.log('Leave session');
    }

    // handleChangeSessionId(e) {
    //     this.setState({
    //         mySessionId: e.target.value,
    //     });
    // }
    //
    // handleChangeUserName(e) {
    //     this.setState({
    //         myUserName: e.target.value,
    //     });
    // }

    function joinSession() {
        console.log("joinSession");
        // console.log(roomId)
        // console.log(user.nickName)
        if (chat.roomId && user) {
            const token = getToken(chat.roomId);
            setToken(token);
            // this.setState({
            //     token: token,
            //     session: true,
            // });
        }
    }

    // function getToken(roomId) {
    //     const sessionId = createSession(roomId);
    //     return createToken(roomId);
    // }
    function getToken(roomId) {

        axios.post('/api/sessions', {customSessionId: roomId}, {
            headers: {'Content-Type': 'application/json',},
        }).then((response) => {
            const sessionId = response.data;
            console.log(sessionId);

            axios.post('/api/sessions/' + roomId + '/connections', {}, {
                headers: {'Content-Type': 'application/json',},
            }).then((response) => {setToken(response.data);});

            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }


    function createSession(sessionId) {
        console.log("post" + '/api/sessions')
        const response = axios.post('/api/sessions', {customSessionId: sessionId}, {
            headers: {'Content-Type': 'application/json',},
        });
        console.log(response);
        return response.data; // The sessionId
    }

    function createToken(sessionId) {
        console.log("post" + '/api/sessions/' + sessionId + '/connections')
        // const response = await axios.post(this.APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
        const response = axios.post('/api/sessions/' + sessionId + '/connections', {}, {
            headers: {'Content-Type': 'application/json',},
        });
        let stream = null;
        stream = navigator.mediaDevices.getUserMedia({audio: true, video: true});
        console.log(response);
        return response.data; // The token
    }

    useEffect(() => {
        // 최초 미디어 권한 요청 //VIDU를 위해
        let stream = null;
        stream = navigator.mediaDevices.getUserMedia({audio: true, video: true});
        joinSession();
    }, []);

    return (
        <div>
            {token === undefined ? (
                <>
                    채팅에 접속중입니다.
                </>
            ) : (
                <div id="session">
                    <OpenViduSession
                        id="opv-session"
                        sessionName={chat.roomName}
                        user={user.nickName}
                        token={token}
                        joinSession={handlerJoinSessionEvent}
                        leaveSession={handlerLeaveSessionEvent}
                        error={handlerErrorEvent}
                    />
                </div>
            )}
        </div>
    );
}


// class Vidu extends Component {
//     constructor(props) {
//         super(props);
//         // this.APPLICATION_SERVER_URL = "https://localhost:8443/";
//         this.state = {
//             // mySessionId: 'SessionA',
//             // myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
//             mySessionId: undefined,
//             myUserName: undefined,
//             token: undefined,
//         };
//
//         // Join Session
//         this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
//         // Leave Session
//         this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
//         // Error Session
//         this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
//
//
//         this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
//         this.handleChangeUserName = this.handleChangeUserName.bind(this);
//         this.joinSession = this.joinSession.bind(this);
//     }
//
//     handlerJoinSessionEvent() {
//         console.log('Join session');
//     }
//
//     handlerLeaveSessionEvent() {
//         console.log('Leave session');
//         this.setState({
//             session: undefined,
//         });
//     }
//
//     handlerErrorEvent() {
//         console.log('Leave session');
//     }
//
//     handleChangeSessionId(e) {
//         this.setState({
//             mySessionId: e.target.value,
//         });
//     }
//
//     handleChangeUserName(e) {
//         this.setState({
//             myUserName: e.target.value,
//         });
//     }
//
//     async joinSession(event) {
//         event.preventDefault();
//         if (this.state.mySessionId && this.state.myUserName) {
//             const token = await this.getToken();
//             this.setState({
//                 token: token,
//                 session: true,
//             });
//         }
//     }
//
//     render() {
//         const mySessionId = this.state.mySessionId;
//         const myUserName = this.state.myUserName;
//         const token = this.state.token;
//         this.joinSession();
//         return (
//             <div>
//                 {this.state.session === undefined ? (
//                     <>
//                     채팅에 접속중입니다.
//                     </>
//                 ): (
//                     <div id="session">
//                         <OpenViduSession
//                             id="opv-session"
//                             sessionName={mySessionId}
//                             user={myUserName}
//                             token={token}
//                             joinSession={this.handlerJoinSessionEvent}
//                             leaveSession={this.handlerLeaveSessionEvent}
//                             error={this.handlerErrorEvent}
//                         />
//                     </div>
//                 )}
//             </div>
//         );
//     }
//
//
//     /**
//      * --------------------------------------------
//      * GETTING A TOKEN FROM YOUR APPLICATION SERVER
//      * --------------------------------------------
//      * The methods below request the creation of a Session and a Token to
//      * your application server. This keeps your OpenVidu deployment secure.
//      *
//      * In this sample code, there is no user control at all. Anybody could
//      * access your application server endpoints! In a real production
//      * environment, your application server must identify the user to allow
//      * access to the endpoints.
//      *
//      * Visit https://docs.openvidu.io/en/stable/application-server to learn
//      * more about the integration of OpenVidu in your application server.
//      */
//     async getToken() {
//         const sessionId = await this.createSession(this.state.mySessionId);
//         return await this.createToken(sessionId);
//     }
//
//     async createSession(sessionId) {
//         const response = await axios.post('/api/sessions', { customSessionId: sessionId }, {
//             headers: { 'Content-Type': 'application/json', },
//         });
//         return response.data; // The sessionId
//     }
//
//     async createToken(sessionId) {
//         // const response = await axios.post(this.APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
//         const response = await axios.post('/api/sessions/' + sessionId + '/connections', {}, {
//             headers: { 'Content-Type': 'application/json', },
//         });
//         let stream =null;
//         stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true});        return response.data; // The token
//     }
// }

export default Vidu;
