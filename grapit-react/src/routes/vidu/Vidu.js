import React, { useEffect, useState } from 'react';
import { OpenVidu } from 'openvidu-browser';
import './Vidu.css';
import UserVideoComponent from './UserVideoComponent';
import axios from 'axios';

function Vidu({ user, chat }) {
  let userNickName = user.nickName;
  let chatRoomId = chat.roomId;
  let chatRoomName = chat.roomName;
  let OV = undefined;
  var session = undefined;

  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);

  function handleMainVideoStream(stream) {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  async function joinSession() {
    console.log('joinSession');
    // --- 1) Get an OpenVidu object ---
    OV = new OpenVidu();

    // --- 2) Init a session ---
    var mySession = await OV.initSession();

    session = mySession;

    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    mySession.on('streamCreated', event => {
      let subscriber = mySession.subscribe(event.stream, undefined);

      setSubscribers(subscribers => [...subscribers, subscriber]);
    });

    // On every Stream destroyed...
    mySession.on('streamDestroyed', event => {
      setSubscribers(subscribers =>
        subscribers.filter(subscriber => subscriber.stream !== event.stream),
      );
    });

    // On every asynchronous exception...
    mySession.on('exception', exception => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // Get a token from the OpenVidu deployment
    await getToken(chatRoomId).then(async token => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: userNickName })
        .then(async () => {
          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '300x200', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);

          // Obtain the current video device in use
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            device => device.kind === 'videoinput',
          );
          var currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          // var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          // Set the main video in the page to display our webcam and store our Publisher
          setCurrentVideoDevice(
            videoDevices.find(
              device => device.deviceId === currentVideoDeviceId,
            ),
          );
          setMainStreamManager(publisher);
          setPublisher(publisher);
        })
        .catch(error => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        });
    });
  }

  function leaveSession() {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
    }

    OV = null;
    session = undefined;
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setSubscribers([]);
  }

  useEffect(() => {
    joinSession();
    return () => {
      leaveSession();
    };
  }, []);

  // createSession, CreateToken 합친 함수
  return (
    <div>
      {chatRoomId !== undefined ? (
        <div id="session">
          <div id="video-container" className="col-md-12">
            {/*{publisher !== undefined ? (*/}
            {/*  <div*/}
            {/*    className="stream-container col-md-12 col-xs-6"*/}
            {/*    // onClick={() => handleMainVideoStream(publisher)}*/}
            {/*  >*/}
            {/*    <UserVideoComponent streamManager={publisher} />*/}
            {/*  </div>*/}
            {/*) : null}*/}
            {subscribers.map((sub, i) => (
              <div
                key={i}
                className="stream-container col-md-12 col-xs-6"
                // onClick={() => handleMainVideoStream(sub)}
              >
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );

  async function getToken(chatRoomId) {
    const sessionId = await createSession(chatRoomId);
    return await createToken(sessionId);
  }

  async function createSession(sessionId) {
    const response = await axios.post(
      '/api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The sessionId
  }

  async function createToken(sessionId) {
    const response = await axios.post(
      '/api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The token
  }
}

export default Vidu;
