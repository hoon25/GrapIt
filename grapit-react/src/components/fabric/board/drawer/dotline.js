import { fabric } from 'fabric';
import uuid from 'node-uuid';
export default function (from, to, color, width) {
  return new fabric.Line([from.x, from.y, to.x, to.y], {
    strokeDashArray: [3, 2],
    stroke: color,
    strokeWidth: width,
    id: uuid.v4(),
  });
}
