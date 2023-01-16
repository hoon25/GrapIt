import { useDispatch } from 'react-redux';
import { data } from './data';
import figure from './store/figureSlice';

export function DataPusher() {
  const dispatch = useDispatch();

  setTimeout(() => {
    for (const obj of data) {
      dispatch(figure.actions.addFigure(obj));
    }
  }, 1000);
  // return 'datapusher';
}
