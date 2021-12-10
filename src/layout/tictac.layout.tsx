import Line from "../components/layout";
import "./tictac.layout.css";

type Props = {
  children: JSX.Element;
};

const TictacLayout = ({ children }: Props) => (
  <div className="layoutContainer">
    {children}
    <div className="background">
      <div className="horizontalLines">
        <Line />
        <Line />
      </div>
      <div className="verticalLines">
        <Line vertical />
        <Line vertical />
      </div>
    </div>
  </div>
);

export default TictacLayout;
