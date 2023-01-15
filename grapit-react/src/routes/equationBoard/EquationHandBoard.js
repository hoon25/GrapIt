import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setGraph } from '../../store/graphSlice';

const defaultStyle = {
  border: '1px solid gray',
  display: 'inline-block',
  margin: '1rem',
};

export function EquationHandBoard({
  formulaFirst,
  setFormulaFirst,
  formulaSecond,
  setFormulaSecond,
  formulaThird,
  setFormulaThird,
  graphColor,
  setGraphColor,
  graphInfo,
  setGraphInfo,
  graphType,
  setGraphType,
  graphList,
  setGraphList,
  viewPointX,
  setViewPointX,
  viewPointY,
  setViewPointY,
  sendGraphInfo,
}) {
  const [ctx, setCtx] = useState();
  const [write, setWrite] = useState(false);
  const [latexResult, setLatexResult] = useState(null);

  const canvasRef = useRef(null);
  const drawing_array = [];
  const drawing_x = [];
  const drawing_y = [];

  const [mathpixSenderList_x, setMathpixSenderList_x] = useState([]);
  const [mathpixSenderList_y, setMathpixSenderList_y] = useState([]);

  const dispatch = useDispatch();

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

  // Canvas 기반 Latex 추출
  const getLatexFromMathPixAPI = async (x_arr, y_arr) => {
    await axios
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
        // let latex = res.data.latex_styledstring.replace(/\s+/g, "");;
        setLatexResult(res.data.latex_styled.replace(/\s+/g, ''));
        getGraphArgFromLatex(res.data.latex_styled.replace(/\s+/g, ''));
      });
  };

  const getGraphArgFromLatex = latex => {
    // let latex = 'y=-2x';
    // let latex = 'y=9x^{2}-2x+4';
    // let latex = "(x-2)^{2}+(y-4)^{2}=20";
    setLatexResult(latex);
    let result = latex.match(/\^\{2\}+/g);

    let equation_type;
    if (result)
      if (result.length == 1) {
        equation_type = '2st_order_equation';
        second_order_equation_parsing(latex);
      } else if (result.length == 2) {
        equation_type = 'circle_equation';
        circle_equation_parsing(latex);
      } else;
    else {
      console.log('else');
      equation_type = '1st_order_equation';
      first_order_equation_parsing(latex);
    }
  };

  const first_order_equation_parsing = latex => {
    let result = latex.match(/y=([+-]?\d+)?(\d+)?(x)?([+-]?\d+)?/);
    let tmp_a1 = result[1] ? result[1] : 1;
    let tmp_a2 = result[2] ? result[2] : 1;
    let a = tmp_a1 ? tmp_a1 : tmp_a2;
    let b = result[4] ? result[4] : 0;
    dispatch(
      setGraph.addGraph({
        graphColor,
        graphType: 'Line',
        a,
        b,
        formulaThird,
      }),
    );

    const copyGraphInfo = [graphColor, 'Line', a, b, formulaThird];
    setGraphInfo(copyGraphInfo);
    const copyGraphList = [...graphList, copyGraphInfo];
    setGraphList(copyGraphList);

    const copyViewPointX = [Number(a) - 3, Number(a) + 3];
    const copyViewPointY = [Number(b) - 3, Number(b) + 3];
    setViewPointX(copyViewPointX);
    setViewPointY(copyViewPointY);
    sendGraphInfo('GRAPH', copyGraphList);

    return result;
  };

  const second_order_equation_parsing = latex => {
    // let latex = 'y=9x^{2}+12';
    // y = ax^{2} + bx + c
    console.log('y = ax^{2} + bx + c');
    let result = latex.match(
      /y=([+-]?\d+)?(\d+)?(x)?\^\{2\}([+-]?\d+)?(\d+)?(x)?([+-]?\d+)?/,
    );
    console.log(result);
    // ['y=9x^{2}+2x+12', '9', undefined, 'x', '+2', undefined, 'x', '+12', index: 0, input: 'y=9x^{2}+2x+12', groups: undefined
    let tmp_a1 = result[1] ? result[1] : 1;
    let tmp_a2 = result[2] ? result[2] : 1;
    let a = tmp_a1 ? tmp_a1 : tmp_a2;
    let tmp_b1 = result[4] ? result[4] : 1;
    let tmp_b2 = result[5] ? result[5] : 1;
    let b = result[6] ? (tmp_b1 ? tmp_b1 : tmp_b2) : 0;
    let c = result[7] ? result[7] : !result[6] ? result[4] : 0;
    console.log(a, b, c);
    // !!TODO GraphType어떻게
    // setGraphType("TwoD")
    dispatch(
      setGraph.addGraph({
        graphColor,
        graphType: 'TwoD',
        a,
        b,
        c,
      }),
    );

    const copyGraphInfo = [graphColor, 'TwoD', a, b, c];
    setGraphInfo(copyGraphInfo);
    const copyGraphList = [...graphList, copyGraphInfo];
    setGraphList(copyGraphList);

    const copyViewPointX = [Number(a) - 3, Number(a) + 3];
    const copyViewPointY = [Number(b) - 3, Number(b) + 3];
    setViewPointX(copyViewPointX);
    setViewPointY(copyViewPointY);
    sendGraphInfo('GRAPH', copyGraphList);

    return result;
  };

  const circle_equation_parsing = latex => {
    console.log('second_order_equation_parsing');
    let num_list = latex.match(
      /\((x-([0-9]+))\^{2}\+(y-([0-9]+))\^{2}\)=([0-9]+)/g,
    );

    let result = [];
    for (let i = num_list.length; i <= 3; i++) {
      result.push('1');
    }
    result = [...result, ...num_list];
    console.log(result);
    return result;
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
    // getGraphArgFromLatex();
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
