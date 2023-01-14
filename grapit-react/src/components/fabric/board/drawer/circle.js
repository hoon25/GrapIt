import { fabric } from 'fabric';
import uuid from 'node-uuid';
export default function (from, to, color, width) {
  var left = from.x;
  var top = from.y;
  var id = uuid.v4();
  var radius =
    Math.sqrt((to.x - left) * (to.x - left) + (to.y - top) * (to.y - top)) / 2;
  return new fabric.Circle({
    left: left,
    top: top,
    stroke: color,
    fill: 'rgba(255, 255, 255, 0)',
    radius: radius,
    strokeWidth: width,
    id: id,
  });
}
