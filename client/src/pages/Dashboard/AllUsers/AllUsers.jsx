import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {FaTrashAlt, FaUsers} from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {data: users = [], refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/users`);
      return data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/user/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.name} is an admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (user) => {
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
        axiosSecure.delete(`/user/${user._id}`).then((res) => {
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
    <div>
      <SectionTitle
        subHeading={"How many?"}
        heading={"MANAGE ALL USERS"}
      ></SectionTitle>
      <h1 className="text-3xl font-semibold ml-20 my-10">
        All Users: {users.length}
      </h1>
      {/* table */}
      <div className="overflow-x-auto lg:m-20 rounded-t-md">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className="uppercase bg-[#D1A054]">
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost btn-xm bg-[#D1A054]"
                    >
                      <FaUsers className="text-white" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost btn-xm bg-red-500"
                  >
                    <FaTrashAlt className="text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
