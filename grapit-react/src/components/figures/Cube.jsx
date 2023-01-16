import Box from './Box';

export default function Cube(props) {
  const l = props.length;
  return <Box {...props} size={[l, l, l]} />;
}
