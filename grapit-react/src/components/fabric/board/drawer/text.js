import { fabric } from 'fabric';
import uuid from 'node-uuid';
export default function (from, fontSize, color) {
  return new fabric.Textbox('', {
    left: from.x - 10,
    top: from.y,
    width: 150,
    fontSize: fontSize,
    borderColor: '#000000',
    fill: color,
    hasControls: true,
    editingBorderColor: '#000000',
    id: uuid.v4(),
  });
}
