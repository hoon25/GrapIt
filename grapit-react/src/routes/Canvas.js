import React, { Component } from 'react';
import WhiteBoard, {
  addWhiteBoardObject,
  clearWhiteBoardSelection,
  createWhiteBoardSelection,
  modifyWhiteBoardObjects,
  removeWhiteBoardObjects,
  updateWhiteBoardSelection,
} from 'fabric-whiteboard';

let tempRoom;
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      mode: 'select',
      width: '1620px',
      height: props.height,
      brushColor: '#f44336',
      brushThickness: 2,
    };

    this.refLeft = undefined;
    this.refRight = undefined;

    this.calcBoundsSize = this.calcBoundsSize.bind(this);
    this.handleBoundsSizeChange = this.handleBoundsSizeChange.bind(this);

    this.handleOnModeClick = this.handleOnModeClick.bind(this);
    this.handleOnBrushColorChange = this.handleOnBrushColorChange.bind(this);
    this.handleOnBrushThicknessChange =
      this.handleOnBrushThicknessChange.bind(this);
    this.handleOnObjectAdded = this.handleOnObjectAdded.bind(this);
    this.handleOnObjectsModified = this.handleOnObjectsModified.bind(this);
    this.handleOnObjectsRemoved = this.handleOnObjectsRemoved.bind(this);
    this.handleOnSelectionCreated = this.handleOnSelectionCreated.bind(this);
    this.handleOnSelectionUpdated = this.handleOnSelectionUpdated.bind(this);
    this.handleOnSelectionCleared = this.handleOnSelectionCleared.bind(this);
  }

  componentDidMount() {
    this.calcBoundsSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleBoundsSizeChange);
  }

  render() {
    const { mode, width, height, brushColor, brushThickness } = this.state;
    return (
      <div className="questioncontent">
        <div className="whiteboard" id="whiteboard">
          <WhiteBoard
            ref={this.canvasRef}
            width={width}
            height={height}
            showToolbar={true}
            enableToolbar={true}
            showBoard={true}
            mode={mode}
            onModeClick={this.handleOnModeClick}
            brushColor={brushColor}
            brushColors={[
              '#f44336',
              '#e91e63',
              '#9c27b0',
              '#673ab7',
              '#3f51b5',
              '#2196f3',
              '#000000',
            ]}
            brushThickness={brushThickness}
            onBrushColorChange={this.handleOnBrushColorChange}
            onBrushThicknessChange={this.handleOnBrushThicknessChange}
            onObjectAdded={this.handleOnObjectAdded}
            onObjectsModified={this.handleOnObjectsModified}
            onObjectsRemoved={this.handleOnObjectsRemoved}
            onSelectionCreated={this.handleOnSelectionCreated}
            onSelectionUpdated={this.handleOnSelectionUpdated}
            onSelectionCleared={this.handleOnSelectionCleared}
          />
        </div>
      </div>
    );
  }

  calcBoundsSize() {
    return;
    const domApp = document.getElementById('Canvas');
    const domToolbar = document.getElementById('toolbar');
    const canvas = document.getElementById('questioncontent');

    const domAppStyle = window.getComputedStyle(domApp);
    const domToolbarStyle = window.getComputedStyle(domToolbar);

    this.setState({
      width: domAppStyle.width,
      height: canvas.height,
      // width: domAppStyle.width,
      // height: `${
      //     parseInt(domAppStyle.height, 10) -
      //     parseInt(domToolbarStyle.height, 10) -
      //     20
      // }px`,
    });
  }

  handleBoundsSizeChange() {
    this.calcBoundsSize();
  }

  handleOnModeClick(mode) {
    this.setState({
      mode: mode,
    });
    console.log('모드 선택');
    console.log(mode);
    console.log(tempRoom);
  }

  handleOnBrushColorChange(color) {
    this.setState({
      brushColor: color.hex,
    });
    console.log('색 변경');
    console.log(color);
    console.log(color.hex);
  }

  handleOnBrushThicknessChange(thickness) {
    this.setState({
      brushThickness: thickness,
    });
    console.log('선 굵기');
    console.log(thickness);
  }

  handleOnObjectAdded(object) {
    addWhiteBoardObject(this.refRight, object);
    console.log('오브젝트 추가');
  }

  handleOnObjectsModified(object) {
    modifyWhiteBoardObjects(this.refRight, object);
    console.log('핸들오브젝트 모디파이드');
    console.log(object);
  }

  handleOnObjectsRemoved(objects) {
    removeWhiteBoardObjects(this.refRight, objects);
    console.log('removed');
    console.log(objects);
  }

  handleOnSelectionCreated(selection) {
    createWhiteBoardSelection(this.refRight, selection);
    console.log('만들어진거 선택');
    console.log(selection);
    let temp = JSON.parse(selection);
    console.log(temp.target);
  }

  handleOnSelectionUpdated(selection) {
    updateWhiteBoardSelection(this.refRight, selection);
    console.log('updated');
    console.log(selection);
  }

  handleOnSelectionCleared(selection) {
    clearWhiteBoardSelection(this.refRight, selection);
    console.log('clear');
    console.log(selection);
  }
}
