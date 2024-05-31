import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../../error/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home";
import Root from "../../layout/Root/Root";
import OurShop from "../../pages/OurShop/OurShop";
import OurMenu from "../../pages/OurMenu/OurMenu";
import ContactUs from "../../pages/ContactUs/ContactUs";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Dashboard from "../../layout/Dashboard/Dashboard";
import Cart from "../../pages/Dashboard/Cart/Cart";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "../AdminRoute/AdminRoute";
import ManageItems from "../../pages/ManageItems/ManageItems";
import UpdateItem from "../../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../../pages/Dashboard/AdminHome/AdminHome";
import ManageBookings from "../../pages/Dashboard/ManageBookings/ManageBookings";
import Reservation from "../../pages/Dashboard/Reservation/Reservation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/ourShop/:category",
        element: <OurShop></OurShop>,
      },
      {
        path: "/ourMenu",
        element: <OurMenu></OurMenu>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      /* normal users routes */
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "reservation",
        element: <Reservation></Reservation>,
      },
      /* Admin routes */
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <AdminRoute>
            <ManageBookings></ManageBookings>
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({params}) =>
          fetch(`${import.meta.env.VITE_API_URL}/menu/${params.id}`),
      },
    ],
  },
]);
