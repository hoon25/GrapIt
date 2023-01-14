import { fabric } from 'fabric';
import uuid from 'node-uuid';

export default function (points, color, width) {
  return new fabric.Polygon(points, {
    stroke: color,
    strokeWidth: width,
    fill: 'rgba(255, 255, 255, 0)',
    opacity: 1,
    hasBorders: true,
    hasControls: false,
    id: uuid.v4(),
  });
}
