import React, { Component, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';

import * as drawer from './drawer';
import modes from '../utils/mode';
import uuid from 'node-uuid';

import './style.scss';

function Board(props) {
  const [canvasId, setCanvasId] = useState(
    `fabric-whiteboard-canvas-${uuid.v4()}`,
  );

  const [nowProps, setNowProps] = useState(props);
  const [isDrawing, setIsDrawing] = useState(false);
  const [moveCount, setMoveCount] = useState(1);
  const [preDrawerObj, setPreDrawerObj] = useState(undefined);
  const [preTextObj, setPreTextObj] = useState(undefined);
  const [posFrom, setPosFrom] = useState({ x: 0, y: 0 });
  const [posTo, setPosTo] = useState({ x: 0, y: 0 });
  const [polygon, setPolygon] = useState({
    circles: [],
    lines: [],
    line: undefined,
    shape: undefined,
  });
  const [currentGroupId, setCurrentGroupId] = useState('');
  const fabricCanvas = useRef(null);

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

    fabricCanvas.current.zoom = window.zoom ? window.zoom : 1;
  }, []);

  useEffect(() => {
    const { mode, enabled } = props;
    const { beforeMode, beforeEnabled } = nowProps;

    console.log(props);
    console.log(nowProps);

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
    fabricCanvas.current.on('mouse:down', handleCanvasMouseDown);
    fabricCanvas.current.on('mouse:up', handleCanvasMouseUp);
    fabricCanvas.current.on('mouse:move', handleCanvasMouseMove);
    fabricCanvas.current.on('path:created', handleCanvasPathCreated);
    fabricCanvas.current.on('selection:created', handleCanvasSelectionCreated);
    fabricCanvas.current.on('selection:updated', handleCanvasSelectionUpdated);
    fabricCanvas.current.on('selection:cleared', handleCanvasSelectionCleared);
    fabricCanvas.current.on('object:modified', handleCanvasObjectsModified);

    setNowProps(props);
  }, [props]);

  useEffect(
    options => {
      handleCanvasDrawing(options);
    },
    [moveCount, posTo],
  );

  if (props.visible === false) return <div></div>;
  return (
    <div className="fabric-whiteboard-board">
      <canvas
        id={canvasId}
        className="fabric-whiteboard-canvas"
        width={props.width}
        height={props.height}
        style={{ width: props.width, height: props.height }}
      />
      {props.enabled === false ? (
        <div
          className="fabric-whiteboard-mask"
          style={{ width: props.width, height: props.height }}
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
    console.log(props.mode);
    const { enabled } = props;
    if (enabled === false) return;
    setIsDrawing(true);
    setPosFrom({ x: options.e.offsetX, y: options.e.offsetY });
    setPosTo({ x: options.e.offsetX, y: options.e.offsetY });

    if (props.mode === 'text' || props.mode === 'polygon') {
      handleCanvasDrawing(options);
    }
  }

  function handleCanvasMouseUp(options) {
    const { mode } = props;
    if (mode !== 'text' && preDrawerObj !== undefined) {
      setPreTextObj(uuid.v4());
    }

    if (mode !== 'polygon') {
      setIsDrawing(false);
      setMoveCount(1);
      setPreDrawerObj(undefined);
      setPosTo({ x: options.e.offsetX, y: options.e.offsetY });
    }

    // this.props.sendPaintInfo(JSON.stringify(canvas._objects));
  }

  function handleCanvasMouseMove(options) {
    setMoveCount(moveCount + 1);
    setPosTo({ x: options.e.offsetX, y: options.e.offsetY });
  }

  function handleCanvasPathCreated(e) {
    const { enabled } = props;
    if (enabled === false || e.path === undefined) return;

    e.path.set('id', uuid.v4());
  }

  function handleCanvasSelectionCreated(e) {
    const { mode, enabled } = props;
    if (enabled === false || e.e === undefined) return;
    const selected = [];
    e.selected.forEach(obj => {
      selected.push({ id: obj.id });
      if (mode === 'eraser') fabricCanvas.current.remove(obj);
    });
    if (mode === 'eraser') {
      fabricCanvas.current.discardActiveObject();
      return;
    }
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

    const deselectedIds = [];

    if (e.deselected) {
      e.deselected.forEach(obj => {
        deselectedIds.push(obj.id);
      });
    }

    fabricCanvas.current.discardActiveObject();
  }

  function handleCanvasObjectsModified(e) {
    const { enabled } = props;
    if (enabled === false || e.e === undefined) return;
    if (!e.target) return;

    const objects = fabricCanvas.current.getActiveObjects();
    const selected = [];
    if (objects) {
      objects.forEach(obj => {
        selected.push({
          id: obj.id,
          matrix: obj.calcTransformMatrix(),
          point: obj.getPointByOrigin('left', 'top'),
        });
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
}

Board.propTypes = {
  visible: PropTypes.bool.isRequired,
  enabled: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(modes).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.number,
  brushColor: PropTypes.string.isRequired,
  brushThickness: PropTypes.number.isRequired,
  onObjectAdded: PropTypes.func,
  onObjectsModified: PropTypes.func,
  onObjectsRemoved: PropTypes.func,
  onSelectionCreated: PropTypes.func,
  onSelectionUpdated: PropTypes.func,
  onSelectionCleared: PropTypes.func,
};

export default Board;
