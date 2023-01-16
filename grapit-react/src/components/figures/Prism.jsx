import Frustum from './Frustum';

export default function Prism(props) {
  return <Frustum {...props} length1={props.length} length2={props.length} />;
}
