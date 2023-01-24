export function PointLights() {
  return (
    <>
      <pointLight position={[10, 30, 10]} intensity={0.4} />
      <pointLight position={[-10, 30, -10]} intensity={0.4} />
      <pointLight position={[-10, 30, 10]} intensity={0.4} />
      <pointLight position={[10, 30, -10]} intensity={0.4} />
    </>
  );
}
