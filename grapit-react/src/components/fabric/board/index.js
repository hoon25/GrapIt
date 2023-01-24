import React, { Component, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import * as drawer from './drawer';
import uuid from 'node-uuid';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setLoad } from '../../../store/loadSlice';

function Board(props) {
  const dispatch = useDispatch();
  const [canvasId, setCanvasId] = useState(
    `fabric-whiteboard-canvas-${uuid.v4()}`,
  );

  const [nowProps, setNowProps] = useState(props);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mouseUp, setMouseUp] = useState(false);
  const [moveCount, setMoveCount] = useState(1);
  const [preDrawerObj, setPreDrawerObj] = useState(undefined);
  const [sendObj, setSendObj] = useState(undefined);
  const [selectedCount, setSelectedCount] = useState(0);
  const [preTextObj, setPreTextObj] = useState(undefined);
  const [posFrom, setPosFrom] = useState({ x: 0, y: 0 });
  const [posTo, setPosTo] = useState({ x: 0, y: 0 });
  const [polygon, setPolygon] = useState({
    circles: [],
    lines: [],
    line: undefined,
    shape: undefined,
  });

  const fabricCanvas = useRef(null);
  const user = useSelector(state => state.user);
  const load = useSelector(state => state.Load);
  useEffect(() => {
    if (load.first) {
      fabric.Image.fromURL('/images/problem/problem1.png', function (img) {
        const oImg = img
          .set({
            left: 0,
            top: 650,
            angle: 0,
          })
          .scale(1);
        fabricCanvas.current.add(oImg).renderAll();
      });

      dispatch(setLoad.setFirst());
    } else if (load.second) {
      fabric.Image.fromURL('/images/problem/problem2.png', function (img) {
        const oImg = img
          .set({
            left: 0,
            top: 630,
            angle: 0,
          })
          .scale(0.6);
        fabricCanvas.current.add(oImg).renderAll();
      });
      dispatch(setLoad.setSecond());
    } else if (load.third) {
      fabric.Image.fromURL('/images/problem/problem3.png', function (img) {
        const oImg = img
          .set({
            left: 0,
            top: 630,
            angle: 0,
          })
          .scale(0.6);
        fabricCanvas.current.add(oImg).renderAll();
      });
      dispatch(setLoad.setThird());
    }
  }, [load]);

  useEffect(() => {
    if (props.clear) {
      resetCanvas();
      props.setClear(false);
    }
  }, [props.clear]);

  useEffect(() => {
    if (sendObj !== undefined && mouseUp === true) {
      let action = undefined;
      if (props.mode !== 'eraser' && props.mode !== 'select') {
        console.log('sendObj', sendObj);
        if (sendObj.id !== undefined && sendObj.id !== null) {
          // sendObj.set('width', (sendObj.width / props.width) * 1490);
          // sendObj.set('height', (sendObj.height / props.height) * 1000);
          // sendObj.set('left', (sendObj.left / props.width) * 1490);
          // sendObj.set('top', (sendObj.top / props.height) * 1000);
          props.sendPaintInfo(
            'PAINT',
            '',
            JSON.stringify({
              count: selectedCount,
              action: 'add',
              target: sendObj.toJSON(['id']),
            }),
          );
        }
      }
    }
  }, [sendObj, mouseUp, selectedCount]);

  function handleCanvasObjectsAdded(options) {
    console.log('draw 시점');
    console.log('options', options);
    console.log(props.width);
    console.log(props.height);
    if (
      props.mode === 'pen' &&
      (options.target.drawer === null || options.target.drawer === undefined)
    ) {
      options.target.id = uuid.v4();
      let copyObj = fabric.util.object.clone(options.target);
      copyObj.set('scaleX', (copyObj.scaleX / props.width) * 1490);
      copyObj.set('scaleY', (copyObj.scaleY / props.height) * 1000);
      copyObj.set('strokeWidth', (copyObj.strokeWidth / props.width) * 1490);
      // copyObj.set('height', (copyObj.height / props.height) * 1000);
      copyObj.set('left', (copyObj.left / props.width) * 1490);
      copyObj.set('top', (copyObj.top / props.height) * 1000);
      copyObj.set('drawer', user.nickName);
      props.sendPaintInfo(
        'PAINT',
        '',
        JSON.stringify({
          action: 'pen',
          drawer: user.nickName,
          target: copyObj.toJSON(['id', 'drawer']),
        }),
      );
    }

    setSendObj(undefined);
  }

  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvasId, {
      isDrawingMode: false,
      skipTargetFind: false,
      selectable: false,
      selection: false,
    });

    fabricCanvas.current.freeDrawingBrush.color = props.brushColor;
    fabricCanvas.current.freeDrawingBrush.width = props.brushThickness;
    fabricCanvas.current.hoverCursor = 'pointer';
    fabricCanvas.current.on('mouse:down', handleCanvasMouseDown);
    fabricCanvas.current.on('mouse:up', handleCanvasMouseUp);
    fabricCanvas.current.on('mouse:move', handleCanvasMouseMove);
    fabricCanvas.current.on('path:created', handleCanvasPathCreated);
    fabricCanvas.current.on('selection:created', handleCanvasSelectionCreated);
    fabricCanvas.current.on('selection:updated', handleCanvasSelectionUpdated);
    fabricCanvas.current.on('selection:cleared', handleCanvasSelectionCleared);
    fabricCanvas.current.on('object:modified', handleCanvasObjectsModified);

    fabricCanvas.current.on('object:moving', handleCanvasObjectsMoving);
    fabricCanvas.current.on('object:added', handleCanvasObjectsAdded);
    // fabricCanvas.current.on('object:removed', handleCanvasObjectsRemoved);

    fabricCanvas.current.zoom = window.zoom ? window.zoom : 1;

    // fabricCanvas.current.setDimensions(
    //   {
    //     width: 1920,
    //     height: 1080,
    //   },
    //   { backstoreOnly: true },
    // );

    props.setBoard(fabricCanvas.current);
  }, []);

  useEffect(() => {
    const { mode, enabled } = props;
    const { beforeMode, beforeEnabled } = nowProps;

    if (mode !== beforeMode || enabled !== beforeEnabled) {
      if (preTextObj !== undefined) {
        preTextObj.exitEditing();
        setPreTextObj(undefined);
      }
      if (enabled === false) {
        fabricCanvas.current.isDrawingMode = false;
        fabricCanvas.current.skipTargetFind = true;
        fabricCanvas.current.selectable = false;
        fabricCanvas.current.selection = false;
      } else {
        switch (mode) {
          case 'select':
            fabricCanvas.current.isDrawingMode = false;
            fabricCanvas.current.skipTargetFind = false;
            fabricCanvas.current.selectable = true;
            fabricCanvas.current.selection = true;
            break;
          case 'pen':
            fabricCanvas.current.isDrawingMode = true;
            fabricCanvas.current.skipTargetFind = true;
            fabricCanvas.current.selectable = false;
            fabricCanvas.current.selection = false;
            break;
          case 'eraser':
            fabricCanvas.current.isDrawingMode = false;
            fabricCanvas.current.skipTargetFind = false;
            fabricCanvas.current.selectable = true;
            fabricCanvas.current.selection = true;
            break;
          case 'polygon':
            fabricCanvas.current.isDrawingMode = false;
            fabricCanvas.current.skipTargetFind = false;
            fabricCanvas.current.selectable = false;
            fabricCanvas.current.selection = false;
            break;
          default:
            fabricCanvas.current.isDrawingMode = false;
            fabricCanvas.current.skipTargetFind = true;
            fabricCanvas.current.selectable = false;
            fabricCanvas.current.selection = false;
            break;
        }
      }
    }

    if (props.brushColor !== nowProps.brushColor) {
      if (fabricCanvas.current) {
        fabricCanvas.current.freeDrawingBrush.color = props.brushColor;
      }
    }

    if (props.brushThickness !== nowProps.brushThickness) {
      if (fabricCanvas.current) {
        fabricCanvas.current.freeDrawingBrush.width = props.brushThickness;
      }
    }
    fabricCanvas.current.off('mouse:down');
    fabricCanvas.current.off('mouse:up');
    fabricCanvas.current.off('mouse:move');
    fabricCanvas.current.off('mouse:created');
    fabricCanvas.current.off('selection:created');
    fabricCanvas.current.off('selection:updated');
    fabricCanvas.current.off('selection:cleared');
    fabricCanvas.current.off('object:modified');
    fabricCanvas.current.off('object:moving');
    fabricCanvas.current.off('object:added');

    fabricCanvas.current.on('mouse:down', handleCanvasMouseDown);
    fabricCanvas.current.on('mouse:up', handleCanvasMouseUp);
    fabricCanvas.current.on('mouse:move', handleCanvasMouseMove);
    fabricCanvas.current.on('path:created', handleCanvasPathCreated);
    fabricCanvas.current.on('selection:created', handleCanvasSelectionCreated);
    fabricCanvas.current.on('selection:updated', handleCanvasSelectionUpdated);
    fabricCanvas.current.on('selection:cleared', handleCanvasSelectionCleared);
    fabricCanvas.current.on('object:modified', handleCanvasObjectsModified);
    fabricCanvas.current.on('object:moving', handleCanvasObjectsMoving);
    fabricCanvas.current.on('object:added', handleCanvasObjectsAdded);
    setNowProps(props);
  }, [props]);

  useEffect(
    options => {
      handleCanvasDrawing(options);
    },
    [moveCount, posTo],
  );

  const getWhiteBoardObjectById = (canvas, id) => {
    const objs = canvas.getObjects();
    for (let i = 0, len = objs.length; i < len; i++) {
      if (objs[i].id === id) {
        return objs[i];
      }
    }
    return null;
  };

  function jsonToObject() {
    fabric.util.enlivenObjects(
      [props.drawInfo.target],
      function (enlivenedObjects) {
        enlivenedObjects.forEach(function (enlivenedObject) {
          console.log('add 시전');
          console.log(props.width);
          console.log(props.height);
          console.log(enlivenedObject);
          enlivenedObject.set('id', props.drawInfo.target.id);
          enlivenedObject.set(
            'top',
            (enlivenedObject.top / 1000) * props.height,
          );
          enlivenedObject.set(
            'left',
            (enlivenedObject.left / 1490) * props.width,
          );
          enlivenedObject.set(
            'scaleX',
            (enlivenedObject.scaleX / 1490) * props.width,
          );
          enlivenedObject.set(
            'scaleY',
            (enlivenedObject.scaleY / 1000) * props.height,
          );

          if ((enlivenedObject.strokeWidth / 1490) * props.width > 10) {
            enlivenedObject.set('strokeWidth', 10);
          } else if ((enlivenedObject.strokeWidth / 1490) * props.width < 3) {
            enlivenedObject.set('strokeWidth', 3);
          } else {
            enlivenedObject.set(
              'strokeWidth',
              (enlivenedObject.strokeWidth / 1490) * props.width,
            );
          }

          // enlivenedObject.set(
          //   'width',
          //   (enlivenedObject.width / 1490) * props.width,
          // );
          // enlivenedObject.set(
          //   'height',
          //   (enlivenedObject.height / 1000) * props.height,
          // );

          enlivenedObject.set('drawer', props.drawInfo.drawer);
          // enlivenedObject.setCoords();
          fabricCanvas.current.add(enlivenedObject);
        });
      },
    );
  }

  useEffect(() => {
    // const object = JSON.parse(props.drawInfo.target);
    if (props.drawInfo === undefined) return;
    let objectById;
    if (props.drawInfo.target !== undefined) {
      objectById = getWhiteBoardObjectById(
        fabricCanvas.current,
        props.drawInfo.target.id,
      );
    }
    if (props.drawInfo.action === 'add') {
      if (objectById === null) {
        jsonToObject();
      }
    } else if (props.drawInfo.action === 'modify') {
      if (objectById !== null) {
        fabricCanvas.current.remove(objectById);
        jsonToObject();
      }
    } else if (props.drawInfo.action === 'move') {
      if (objectById !== null) {
        objectById.set({
          left: props.drawInfo.target.left,
          top: props.drawInfo.target.top,
        });
        fabricCanvas.current.renderAll();
      }
    } else if (props.drawInfo.action === 'remove') {
      props.drawInfo.target.forEach(drawInfo => {
        const objectById = getWhiteBoardObjectById(
          fabricCanvas.current,
          drawInfo.id,
        );
        if (objectById !== null) {
          fabricCanvas.current.remove(objectById);
        }
      });
    } else if (props.drawInfo.action === 'remove-all') {
      resetCanvas();
    } else if (props.drawInfo.action === 'pen') {
      if (props.drawInfo.drawer !== user.nickName) {
        if (objectById === null) {
          jsonToObject();
        }
      }
    }

    // if (props.drawInfo !== undefined && props.drawInfo.count < 2) {
    //   console.log(props.drawInfo);
    //   console.log(props.drawInfo.target.id);
    //   const objectById = getWhiteBoardObjectById(
    //     fabricCanvas.current,
    //     props.drawInfo.target.id,
    //   );
    //
    //   console.log(objectById);
    //
    //   if (props.drawInfo.action === 'add') {
    //     if (objectById === null) {
    //       fabric.util.enlivenObjects(
    //         [props.drawInfo.target],
    //         function (enlivenedObjects) {
    //           enlivenedObjects.forEach(function (enlivenedObject) {
    //             // enlivenedObject.id = props.drawInfo.target.id;
    //             enlivenedObject.set('id', props.drawInfo.target.id);
    //             console.log('아이디 체크');
    //             console.log(enlivenedObject.id);
    //             fabricCanvas.current.add(enlivenedObject);
    //           });
    //         },
    //       );
    //     }
    //   } else if (props.drawInfo.action === 'remove') {
    //     if (objectById !== null) {
    //       fabricCanvas.current.remove(objectById);
    //     }
    //   } else if (props.drawInfo.action === 'move') {
    //     if (objectById !== null) {
    //       objectById.set({
    //         left: props.drawInfo.target.left,
    //         top: props.drawInfo.target.top,
    //       });
    //       fabricCanvas.current.renderAll();
    //     }
    //   }
    // } else if (props.drawInfo !== undefined && props.drawInfo.count >= 2) {
    //   props.drawInfo.target.forEach(drawInfo => {
    //     const objectById = getWhiteBoardObjectById(
    //       fabricCanvas.current,
    //       drawInfo.id,
    //     );
    //
    //     if (props.drawInfo.action === 'move') {
    //       if (objectById !== null) {
    //         objectById.set({
    //           left: drawInfo.left,
    //           top: drawInfo.top,
    //         });
    //         fabricCanvas.current.renderAll();
    //       }
    //     } else if (props.drawInfo.action === 'remove') {
    //       if (objectById !== null) {
    //         fabricCanvas.current.remove(objectById);
    //       }
    //     }
    //   });
    // }
  }, [props.drawInfo]);

  // if (props.drawInfo.type === 'add') {
  // } else if (props.drawInfo.type === 'remove') {
  // } else if (props.drawInfo.type === 'move') {
  // }
  // const xPosition = (1980 - props.width) / 2;
  // const yPosition = (1080 - props.height) / 2;
  // const canvasStyle = {
  //   position: 'absolute',
  //   left: -xPosition,
  //   top: -yPosition,
  //   overflow: 'hidden',
  // };
  if (props.visible === false) return <div></div>;
  return (
    <div className="fabric-whiteboard-board">
      <canvas
        id={canvasId}
        className="fabric-whiteboard-canvas"
        width={props.width}
        height={props.height}
      />

      {props.enabled === false ? (
        <div
          className="fabric-whiteboard-mask"
          style={{
            width: props.width,
            height: props.height,
          }}
        />
      ) : (
        <div />
      )}
    </div>
  );

  function transpos(pos) {
    return { x: pos.x / window.zoom, y: pos.y / window.zoom };
  }

  function handleCanvasMouseDown(options) {
    const { enabled } = props;
    if (enabled === false) return;
    setIsDrawing(true);
    setMouseUp(false);
    setPosFrom({ x: options.e.clientX, y: options.e.clientY });
    setPosTo({ x: options.e.clientX, y: options.e.clientY });

    if (props.mode === 'text' || props.mode === 'polygon') {
      handleCanvasDrawing(options);
    }
  }

  function handleCanvasMouseUp(options) {
    const { mode } = props;
    if (mode !== 'text' && preDrawerObj !== undefined) {
      // preDrawerObj.set('id', uuid.v4());
    }

    if (mode !== 'polygon') {
      setIsDrawing(false);
      setMouseUp(true);
      setMoveCount(1);
      setPreDrawerObj(undefined);
      setPosTo({ x: options.e.offsetX, y: options.e.offsetY });
    }
  }

  function handleCanvasMouseMove(options) {
    setMoveCount(moveCount + 1);
    setPosTo({ x: options.e.offsetX, y: options.e.offsetY });
  }

  function handleCanvasPathCreated(e) {
    const { enabled } = props;
    if (enabled === false || e.path === undefined) return;
  }

  function handleCanvasSelectionCreated(e) {
    const { mode, enabled } = props;
    if (enabled === false || e.e === undefined) return;
    const selected = [];
    let temp = [];
    e.selected.forEach(obj => {
      selected.push({
        id: obj.id,
        left: obj.left,
        top: obj.top,
      });
      temp.push(obj);
      if (mode === 'eraser') {
        fabricCanvas.current.remove(obj);
      }
    });
    setSendObj(undefined);
    if (mode === 'eraser') {
      props.sendPaintInfo(
        'PAINT',
        '',
        JSON.stringify({
          action: 'remove',
          target: selected,
        }),
      );

      fabricCanvas.current.discardActiveObject();
    }

    // let newGroup = new fabric.Group(temp, {
    //   id: uuid.v4(),
    // });

    // console.log(newGroup);
  }
  function handleCanvasSelectionUpdated(e) {
    const { mode, enabled, onSelectionUpdated } = props;
    if (enabled === false || e.e === undefined) return;

    const deselectedIds = [];
    const selectedIds = [];
    if (e.deselected) {
      e.deselected.forEach(obj => {
        deselectedIds.push(obj.id);
      });
    }

    if (e.selected) {
      e.selected.forEach(obj => {
        selectedIds.push(obj.id);
      });
    }
  }

  function handleCanvasSelectionCleared(e) {
    const { enabled, onSelectionCleared } = props;
    if (enabled === false || e.e === undefined) return;
    setSelectedCount(0);
    const deselectedIds = [];

    if (e.deselected) {
      e.deselected.forEach(obj => {
        deselectedIds.push(obj.id);
      });
    }

    fabricCanvas.current.discardActiveObject();
  }

  function handleCanvasObjectsModified(e) {
    console.log('handleCanvasObjectsModified');
    const { enabled } = props;
    if (enabled === false || e.e === undefined) return;
    if (!e.target) return;

    const objects = fabricCanvas.current.getActiveObjects();
    const selected = [];
    if (objects) {
      objects.forEach(obj => {
        if (obj.id !== undefined && obj.id !== null) {
          props.sendPaintInfo(
            'PAINT',
            '',
            JSON.stringify({
              action: 'modify',
              target: obj.toJSON(['id']),
            }),
          );
        }

        selected.push({
          id: obj.id,
          matrix: obj.calcTransformMatrix(),
          point: obj.getPointByOrigin('left', 'top'),
        });
        console.log(obj.calcTransformMatrix());
        console.log(obj.getPointByOrigin('left', 'top'));
      });
    }
  }

  function handleCanvasDrawing(options) {
    const { mode, fontSize, brushColor, brushThickness } = props;

    if (isDrawing === false || !moveCount % 2) return;
    let drawerObj = undefined;
    let textObj = undefined;

    if (preDrawerObj !== undefined) fabricCanvas.current.remove(preDrawerObj);
    if (preTextObj !== undefined) preTextObj.exitEditing();

    setPreDrawerObj(undefined);
    setPreTextObj(undefined);

    switch (mode) {
      case 'line':
        drawerObj = drawer.drawLine(posFrom, posTo, brushColor, brushThickness);
        break;
      case 'dotline':
        drawerObj = drawer.drawDotLine(
          posFrom,
          posTo,
          brushColor,
          brushThickness,
        );
        break;
      case 'arrow':
        drawerObj = drawer.drawArrow(
          posFrom,
          posTo,
          brushColor,
          'rgba(255,255,255,0)',
          brushThickness,
        );
        break;
      case 'text':
        textObj = drawer.drawText(posFrom, fontSize, brushColor);
        textObj.set('id', uuid.v4());
        textObj.on('editing:exited', e => {
          if (textObj.text === '') {
            fabricCanvas.current.remove(textObj); //auto remove empty itext
          }
        });
        fabricCanvas.current.add(textObj);
        textObj.enterEditing();
        textObj.hiddenTextarea.focus();
        break;
      case 'rectangle':
        drawerObj = drawer.drawRectangle(
          posFrom,
          posTo,
          brushColor,
          brushThickness,
        );
        break;
      case 'polygon':
        handleCanvasDrawPolygon(options);
        break;
      case 'triangle':
        drawerObj = drawer.drawTriangle(
          posFrom,
          posTo,
          brushColor,
          brushThickness,
          true,
        );
        break;
      case 'circle':
        drawerObj = drawer.drawCircle(
          posFrom,
          posTo,
          brushColor,
          brushThickness,
        );
        break;
      case 'ellipse':
        drawerObj = drawer.drawEllipse(
          posFrom,
          posTo,
          brushColor,
          brushThickness,
        );
        break;
      default:
        break;
    }

    if (drawerObj !== undefined) {
      fabricCanvas.current.add(drawerObj);
      setSendObj(drawerObj);
    }
    setPreDrawerObj(drawerObj);
    setPreTextObj(textObj);
  }

  function handleCanvasDrawPolygon(options) {
    const { e, target } = options;
    const { type } = e;
    const { brushColor, brushThickness } = props;
    const { circles, lines, line, shape } = polygon;

    if (isDrawing === false || !moveCount % 2) return;

    if (type === 'mousedown') {
      // click first point, generate polygon
      if (target && circles.length && target.id === circles[0].id) {
        let tempPoints = [];
        circles.map((circle, index) => {
          tempPoints.push({ x: circle.left, y: circle.top });
          fabricCanvas.current.remove(circle);
        });

        lines.map((line, index) => {
          fabricCanvas.current.remove(line);
        });

        fabricCanvas.current.remove(line).remove(shape);

        let newPolygon = new fabric.Polygon(tempPoints, {
          stroke: brushColor,
          strokeWidth: brushThickness,
          fill: 'rgba(255, 255, 255, 0)',
          opacity: 1,
          hasBorders: true,
          hasControls: false,
          id: uuid.v4(),
        });

        fabricCanvas.current.add(newPolygon);

        // end drawing
        setIsDrawing(false);
        setPolygon({
          circles: [],
          lines: [],
          line: undefined,
          shape: undefined,
        });
      } else {
        // add circle
        let circle = new fabric.Circle({
          radius: 5,
          fill: '#ffffff',
          stroke: brushColor,
          strokeWidth: brushThickness,
          left:
            (options.pointer.x || e.layerX) / fabricCanvas.current.getZoom(),
          top: (options.pointer.y || e.layerY) / fabricCanvas.current.getZoom(),
          selectable: false,
          hasBorders: false,
          hasControls: false,
          originX: 'center',
          originY: 'center',
          id: uuid.v4(),
          objectCaching: false,
        });

        if (circles.length == 0) {
          circle.set({ fill: 'red' });
        }

        let tempPoints = [
          (options.pointer.x || e.layerX) / fabricCanvas.current.getZoom(),
          (options.pointer.y || e.layerY) / fabricCanvas.current.getZoom(),
          (options.pointer.x || e.layerX) / fabricCanvas.current.getZoom(),
          (options.pointer.y || e.layerY) / fabricCanvas.current.getZoom(),
        ];

        let tempLine = new fabric.Line(tempPoints, {
          strokeWidth: brushThickness,
          fill: '#999999',
          stroke: brushColor,
          class: 'line',
          originX: 'center',
          originY: 'center',
          selectable: false,
          hasBorders: false,
          hasControls: false,
          evented: false,

          objectCaching: false,
        });

        let tempPolygonState = polygon;
        if (shape) {
          let newPoint = fabricCanvas.current.getPointer(e);
          let shapePoints = shape.get('points');
          shapePoints.push({ x: newPoint.x, y: newPoint.y });

          let tempPolygon = new fabric.Polygon(shapePoints, {
            stroke: brushColor,
            strokeWidth: brushThickness,
            fill: '#cccccc',
            opacity: 0.3,

            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
          });

          fabricCanvas.current.remove(shape);
          fabricCanvas.current.add(tempPolygon);
          tempPolygonState.shape = tempPolygon;
        } else {
          let polyPoint = [
            {
              x:
                (options.pointer.x || e.layerX) /
                fabricCanvas.current.getZoom(),
              y:
                (options.pointer.y || e.layerY) /
                fabricCanvas.current.getZoom(),
            },
          ];

          let tempPolygon = new fabric.Polygon(polyPoint, {
            stroke: brushColor,
            strokeWidth: brushThickness,
            fill: '#cccccc',
            opacity: 0.3,

            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
          });

          fabricCanvas.current.add(tempPolygon);
          tempPolygonState.shape = tempPolygon;
        }

        fabricCanvas.current.add(tempLine);
        fabricCanvas.current.add(circle);

        lines.push(tempLine);
        circles.push(circle);

        setPolygon({
          ...tempPolygonState,
          circles: circles,
          lines: lines,
          line: tempLine,
        });
      }
    } else if (type === 'mousemove') {
      // only update target line and active shape
      if (line && line.class == 'line') {
        line.set({ x2: options.pointer.x, y2: options.pointer.y });

        let shapePoints = shape.get('points');
        shapePoints[circles.length] = {
          x: options.pointer.x,
          y: options.pointer.y,
          zIndex: 1,
        };

        shape.set({ points: shapePoints });
      }
      fabricCanvas.current.renderAll();
    }
  }

  function handleCanvasObjectsMoving(options) {
    // console.log('handleCanvasObjectsMoving');
    // console.log(options);
    // let target = undefined;
    //
    if (options.target)
      if (options.target.id !== undefined && options.target.id !== null) {
        props.sendPaintInfo(
          'PAINT',
          '',
          JSON.stringify({
            count: selectedCount,
            action: 'move',
            target: options.target.toJSON(['id']),
          }),
        );
      }
  }

  function resetCanvas() {
    const allObjects = fabricCanvas.current.getObjects();
    allObjects.forEach(object => {
      if (object.id !== undefined && object.id !== null) {
        fabricCanvas.current.remove(object);
      }
    });
  }
}

export default Board;
