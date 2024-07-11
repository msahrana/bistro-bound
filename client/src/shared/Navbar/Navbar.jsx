import {Link, NavLink} from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";
import {FaShoppingCart} from "react-icons/fa";
import useCart from "../../hooks/useCart/useCart";
import useAdmin from "../../hooks/useAdmin/useAdmin";

const Navbar = () => {
  const {user, logOut} = useAuth();
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut().then(toast.success("User Logout Successfully!")).catch();
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
          to="/contactUs"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
          to="/ourMenu"
        >
          Our Menu
        </NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink
            className={({isActive}) =>
              isActive ? "text-[#EEFF25]" : "text-white"
            }
            to="/dashboard/adminHome"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink
            className={({isActive}) =>
              isActive ? "text-[#EEFF25]" : "text-white"
            }
            to="/dashboard/userHome"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
          to="/ourShop/salad"
        >
          Our Shop
        </NavLink>
      </li>
      <li>
        <Link to="/dashboard/cart">
          <button className="flex">
            <FaShoppingCart />
            <div className="badge badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-10 bg-opacity-40 bg-black text-white uppercase">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Bistro-Bound</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="hidden md:flex lg:flex">
            <div title={user?.displayName} className="w-10">
              <img className="size-10 rounded-full mr-2" src={user?.photoURL} />
            </div>
            <button
              onClick={handleLogOut}
              className="bg-[#D1A054] px-2 py-1 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-[#D1A054] px-2 py-1 rounded-lg">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
