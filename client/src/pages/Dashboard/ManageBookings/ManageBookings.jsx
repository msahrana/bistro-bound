import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {FiCheck} from "react-icons/fi";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {data: carts = [], refetch} = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/cart`);
      return data;
    },
  });

  const handleUpdate = (id) => {
    axiosSecure.patch(`/cart/${id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Now, Item is updated!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        subHeading={"At a Glance!"}
        heading={"MANAGE ALL BOOKINGS"}
      ></SectionTitle>
      <h1 className="text-3xl font-semibold ml-20 my-5">
        Total Items: {carts.length}
      </h1>
      <div className="overflow-x-auto lg:m-10 rounded-t-md">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#D1A054]">
              <th>Items</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((item) => (
              <tr key={item._id}>
                <th>{item?.name}</th>
                <td>{user?.displayName}</td>
                <td>{item?.email}</td>
                <td className="text-[#AE7B2B] font-bold">
                  {item.status === "Done" ? (
                    <span className="text-green-500">Done</span>
                  ) : (
                    "Pending"
                  )}
                </td>
                <td>
                  {item.status === "Done" ? (
                    <button
                      disabled
                      onClick={() => handleUpdate(item._id)}
                      className="btn btn-ghost btn-xm disabled:bg-[#287855] rounded-full font-bold"
                    >
                      <FiCheck className="text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="btn btn-ghost btn-xm bg-[#80E2B7] rounded-full font-bold"
                    >
                      <FiCheck className="text-white" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
