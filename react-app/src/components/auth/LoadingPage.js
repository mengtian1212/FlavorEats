import "./auth.css";
import { TailSpin } from "react-loader-spinner";

function LoadingPage() {
  return (
    <div className="spinner">
      {/* <img src={`../../images/spin.gif`} alt="Loading in progress"></img> */}
      <TailSpin
        height="50"
        width="50"
        color="#d5d5d5"
        ariaLabel="tail-spin-loading"
        radius="8"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default LoadingPage;
