import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    console.log('비디오 화면 리 랜더링');
    console.log(this.props.streamManager);
    return (
      <>
        <div>
          <p>{this.getNicknameTag()}</p>
        </div>
        <div>
          {this.props.streamManager !== undefined ? (
            <div className="streamcomponent">
              <OpenViduVideoComponent
                streamManager={this.props.streamManager}
              />
              {/*<div><p>{this.getNicknameTag()}</p></div>*/}
            </div>
          ) : null}
        </div>
      </>
    );
  }
}
