import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

const Root = () => {
  const location = useLocation();

  const noFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {noFooter || <Footer></Footer>}
    </div>
  );
};

export default Root;
