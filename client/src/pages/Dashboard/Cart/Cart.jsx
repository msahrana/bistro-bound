import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useCart from "../../../hooks/useCart/useCart";
import CartRow from "./CartRow";
import {Link} from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          refetch();
          const data = res.data;
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-[#f6f5f5] min-h-screen pt-2">
      <SectionTitle
        subHeading={"My Cart"}
        heading={"Wanna Add More?"}
      ></SectionTitle>
      <div className="bg-white m-20 p-5 uppercase">
        <div className="flex justify-between items-center px-6">
          <h1 className="font-bold">Total Items: {cart.length}</h1>
          <h1 className="font-bold">Total Price: $ {totalPrice}</h1>
          <Link to="/dashboard/payment">
            <button
              disabled={!cart.length}
              className="bg-[#D1A054] px-3 py-1 rounded text-white"
            >
              PAY
            </button>
          </Link>
        </div>
        {/* table */}
        <div className="overflow-x-auto mt-5">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-[#D1A054] text-white">
              <tr>
                <th>Index</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <CartRow
                  key={index}
                  item={item}
                  index={index}
                  handleDelete={handleDelete}
                ></CartRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
