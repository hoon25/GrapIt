import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LineInputGroup from './inputs/LineInputGroup';
import PlatonicSolidInputGroup from './inputs/PlatonicSolidInputGroup';
import SphereInputGroup from './inputs/SphereInputGroup';

function FigureInput(props) {
  return (
    <Tabs
      defaultActiveKey="Line"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="Line" title="선">
        <h5>두점의 좌표를 입력해주세요</h5>
        <LineInputGroup />
      </Tab>
      <Tab eventKey="Sphere" title="구">
        <h5>구의 중심과 반지름을 입력해주세요</h5>
        <SphereInputGroup />
      </Tab>
      <Tab eventKey="PlatonicSolid" title="정다면체">
        <h5>구의 중심과 반지름을 입력해주세요</h5>
        <PlatonicSolidInputGroup />
      </Tab>
    </Tabs>
  );
}

export default FigureInput;
