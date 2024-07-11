import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const {data: payments = []} = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });
  console.log(payments);

  return (
    <div className="md:mx-20">
      <SectionTitle
        subHeading={"At a Glance!"}
        heading={"PAYMENT HISTORY"}
      ></SectionTitle>
      <h1 className="text-3xl font-bold mb-5">
        Total Payments: {payments.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#D1A054] uppercase text-white">
              <th>Sl. No.</th>
              <th>Price</th>
              <th>TransactionId</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>$ {payment.price}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.email}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
