import "./auth.css";
import { TailSpin, ColorRing } from "react-loader-spinner";

function LoadingPage() {
  return (
    <div className="spinner">
      {/* <img src={`../../images/spin.gif`} alt="Loading in progress"></img> */}
      <TailSpin
        height="100"
        width="100"
        color="#eeeeee"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        strokeWidth={3}
        speedMultiplier="13"
      />
      {/* <ColorRing
        visible={true}
        height="128"
        width="128"
        radius={1}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"]}
      /> */}
    </div>
  );
}

export default LoadingPage;
