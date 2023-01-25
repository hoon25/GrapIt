import './FourButtons.css';
import { Button } from 'react-bootstrap';

export default function FourButtons({
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
}) {
  return (
    <div className="arrow-wrapper">
      <Button className="arrow-up" onClick={onArrowUp}></Button>
      <Button className="arrow-right" onClick={onArrowRight}></Button>
      <Button className="arrow-down" onClick={onArrowDown}></Button>
      <Button className="arrow-left" onClick={onArrowLeft}></Button>
    </div>
  );
}
