import {
  FaAd,
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaPaypal,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import {NavLink, Outlet} from "react-router-dom";
import useCart from "../../hooks/useCart/useCart";
import useAdmin from "../../hooks/useAdmin/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();

  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-60 min-h-screen bg-[#D1A054] uppercase">
        <div className="ml-6 mt-5">
          <h1 className="text-2xl font-bold">Bistro Bound</h1>
          <p className="font-semibold">Restaurant</p>
        </div>
        <div className="divider"></div>
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                {" "}
                <NavLink to="/dashboard/adminHome">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/addItems">
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/manageItems">
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/bookings">
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/allUsers">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                {" "}
                <NavLink to="/dashboard/userHome">
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/reservation">
                  <FaCalendar />
                  Reservation
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/payment">
                  <FaPaypal />
                  Payment History
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart />
                  My Cart ({cart.length})
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/review">
                  <FaAd />
                  Add Review
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/dashboard/payment-history">
                  <FaList />
                  Payment-History
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            {" "}
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/ourMenu">
              <FaSearch />
              Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
