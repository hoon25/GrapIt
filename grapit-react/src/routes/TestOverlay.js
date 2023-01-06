import React from 'react';
import {Button} from "react-bootstrap";

function TestOverlay() {
    const [playing, setPlaying] = React.useState(undefined);

    const videoRef = React.useRef(null);

    const getWebcam = (callback) => {
        try {
            const constraints = {
                'video': true,
                'audio': false
            }
            navigator.mediaDevices.getUserMedia(constraints)
                .then(callback);
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    const Styles = {
        Video: {width: "100%", height: "100%", background: 'rgba(245, 240, 215, 0.5)'},
        None: {display: 'none'},
    }

    React.useEffect(() => {
        getWebcam((stream => {
            setPlaying(true);
            videoRef.current.srcObject = stream;
        }));

        console.log("test-overlay")
    }, []);

    const startOrStop = () => {
        if (playing) {
            const s = videoRef.current.srcObject;
            s.getTracks().forEach((track) => {
                track.stop();
            });
        } else {
            getWebcam((stream => {
                setPlaying(true);
                videoRef.current.srcObject = stream;
            }));
        }
        setPlaying(!playing);
    }

    return (<>
        test-overlay
        <div style={{width: '100vw', height: '100vh', padding: '3em'}}>
            <video ref={videoRef} autoPlay style={Styles.Video}/>
            <Button color="warning" onClick={() => startOrStop()}>{playing ? 'Stop' : 'Start'} </Button>
        </div>
    </>);
}

export default TestOverlay;