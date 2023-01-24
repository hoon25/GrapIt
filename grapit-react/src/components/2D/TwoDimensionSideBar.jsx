import { Row } from 'react-bootstrap';
import TwoDGraphInput from './TwoDGraphInput';
import { EquationHandBoard } from '../../routes/equationBoard/EquationHandBoard';
import TwoCardBox from './TwoCardBox';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function TwoDimensionSideBar({ sendObjectInfo }) {
  const inputColor = useSelector(state => state.TwoDInput.color);
  const [seeInput, setSeeInput] = useState(false);

  const isTouchDevice =
    navigator.maxTouchPoints || 'ontouchstart' in document.documentElement;
  // const is
  return (
    <Row style={{ flexDirection: 'column', margin: '0px' }}>
      <Row
        style={{
          height: '35vh',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0px',
          alignItems: 'center',
        }}
      >
        {isTouchDevice && !seeInput ? (
          <>
            <EquationHandBoard
              graphColor={inputColor}
              sendObjectInfo={sendObjectInfo}
            />
            <div className="pt-3 flex justify-content-center">
              <mark
                onClick={() => {
                  setSeeInput(true);
                }}
              >
                👉입력이 잘 안되시나요?👈
              </mark>
            </div>
          </>
        ) : (
          <TwoDGraphInput sendObjectInfo={sendObjectInfo} />
        )}
      </Row>
      <Row
        style={{
          height: '50vh',
          backgroundColor: '#eeeeee',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0px',
        }}
      >
        <TwoCardBox sendObjectInfo={sendObjectInfo} />
      </Row>
    </Row>
  );
}
