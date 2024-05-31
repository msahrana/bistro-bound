import {Link} from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";

const Reservation = () => {
  const {user} = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const amount = parseInt(form.amount.value);
    console.log(name, email, amount);
    console.log(typeof amount);
    try {
      //   axiosSecure.post("/members");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold m-20 text-center">Membership:</h1>
      {/* card */}
      <div className="hero-content mx-auto">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl">
          <p className="text-center text-red-500 font-semibold">
            Please pay 500 taka for membership.
          </p>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name:</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Type Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email:</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type Email"
                className="input input-bordered"
                defaultValue={user?.email}
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Amount:</span>
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Nit Amount 500"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <Link to="/dashboard/payment" state={{amount: 500}}>
                <button className="btn bg-[#D1A054] font-bold text-xl">
                  Pay
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
