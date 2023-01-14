import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const defaultStyle = {
  border: '1px solid gray',
  display: 'inline-block',
  margin: '1rem',
};

export function EquationHandBoard() {
  const [ctx, setCtx] = useState();
  const [write, setWrite] = useState(false);
  const [latexResult, setLatexResult] = useState(null);

  const canvasRef = useRef(null);
  const drawing_array = [];
  const drawing_x = [];
  const drawing_y = [];

  const [mathpixSenderList_x, setMathpixSenderList_x] = useState([]);
  const [mathpixSenderList_y, setMathpixSenderList_y] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineJoin = 'round';
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    setCtx(context);
  }, []);

  // Mathpix SenderList 추출 [x : [], y: []]
  const putMathPixSenderList = (x_arr, y_arr) => {
    setMathpixSenderList_x([...mathpixSenderList_x, x_arr]);
    setMathpixSenderList_y([...mathpixSenderList_y, y_arr]);
  };

  const getLatexFromMathPixAPI = (x_arr, y_arr) => {
    const response = axios
      .post(
        'https://api.mathpix.com/v3/strokes',
        { strokes: { strokes: { x: x_arr, y: y_arr } } },
        {
          headers: {
            'Content-Type': 'application/json',
            app_id: 'cchoon95_naver_com_ef8999_d40d8f',
            app_key:
              '3b77c43b90ffe0e5269bf4f0393c4e666d80fed954acfde3f382a4a9145afb76',
          },
        },
      )
      .then(res => {
        console.log(res);
        console.log(res.data.latex_styled);
        // return res.data.latex_styled;
        setLatexResult(res.data.latex_styled);
      });
  };

  const canvasEventListener = (event, type) => {
    let x = event.clientX - event.target.offsetLeft; //x축
    let y = event.clientY - event.target.offsetTop; //y축

    if (type === 'down') {
      setWrite(true);
    } else if (type === 'up') {
      setWrite(false);
      putMathPixSenderList(drawing_x, drawing_y);
    }
    if (type === 'move' && write) {
      if (drawing_array.length === 0) {
        drawing_array.push({ x, y });
        drawing_x.push(x);
        drawing_y.push(y);
      } else {
        ctx.save(); //다른 스타일 또는 속성을 줄 수 있으므로 항상 save
        ctx.beginPath();
        ctx.moveTo(
          drawing_array[drawing_array.length - 1].x,
          drawing_array[drawing_array.length - 1].y,
        );
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore(); // 작업이 끝나면 원래 상태로 돌려놓는다.
        drawing_array.push({ x, y });
        drawing_x.push(x);
        drawing_y.push(y);
      }
    }
  };

  const clearCanvas = () => {
    ctx.save();
    ctx.clearRect(0, 0, 2580, 2580);
    ctx.restore();
    setMathpixSenderList_x([]);
    setMathpixSenderList_y([]);
  };

  const submitCanvas = () => {
    console.log(mathpixSenderList_x, mathpixSenderList_y);
    getLatexFromMathPixAPI(mathpixSenderList_x, mathpixSenderList_y);
  };

  return (
    <>
      <div className="container">
        <canvas
          ref={canvasRef}
          style={defaultStyle}
          onMouseDown={event => {
            canvasEventListener(event, 'down');
          }}
          onMouseMove={event => {
            canvasEventListener(event, 'move');
          }}
          onMouseLeave={event => {
            canvasEventListener(event, 'leave');
          }}
          onMouseUp={event => {
            canvasEventListener(event, 'up');
          }}
        ></canvas>
      </div>
      <button onClick={clearCanvas}>삭제</button>
      <button onClick={submitCanvas}>제출</button>
      {latexResult && <div>{latexResult}</div>}
    </>
  );
}
