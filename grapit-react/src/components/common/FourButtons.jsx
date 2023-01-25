import './FourButtons.css';
import { Button } from 'react-bootstrap';

export default function FourButtons({ onArrowUp, onArrowDown }) {
  return (
    <div className="arrow-wrapper">
      <Button className="arrow-up" onClick={onArrowUp}></Button>
      <Button className="arrow-right"></Button>
      <Button className="arrow-down" onClick={onArrowDown}></Button>
      <Button className="arrow-left"></Button>
    </div>
  );
}
