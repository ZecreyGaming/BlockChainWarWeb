import Brand from "./Brand";
import Check from "./Check";
import Circle from "./Circle";
import { Wrap } from "./styles";
import Warn from "./Warn";

const AnimationSpinner = (props: {
  size: string;
  success: boolean;
  failed: boolean;
}) => {
  return (
    <Wrap size={props.size}>
      <Circle success={props.success} failed={props.failed} dark={true} />
      <Brand go={props.success || props.failed} dark={true} />
      <Check go={props.success} dark={true} />
      <Warn go={props.failed} />
    </Wrap>
  );
};

export default AnimationSpinner;
