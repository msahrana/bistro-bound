import errorImg from "/assets/404.gif";
import homeImg from "/home.png";
import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center">
      <img className="mx-auto" src={errorImg} alt="" />
      <Link to="/">
        <button className="bg-gradient-to-r from-[#835D23] to-[#B58130] text-white font-semibold px-4 py-2 flex mx-auto">
          Back to Home
          <img className="ml-4" src={homeImg} alt="" />
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
