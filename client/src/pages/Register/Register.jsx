import toast from "react-hot-toast";
import regImg from "../../../public/assets/others/authentication2.png";
import useAuth from "../../hooks/useAuth/useAuth";
import "./Register.css";
import SocialLogin from "../SocialLogin/SocialLogin";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

const Register = () => {
  const {createUser, updateUser, user, setUser} = useAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    const {name, photoURL, email, password} = data || {};
    setError("");
    createUser(email, password)
      .then((result) => {
        toast.success("User Create Successfully!");
        updateUser(name, photoURL).then(() => {
          console.log(result.user);
          setUser({...user, displayName: name, photoURL: photoURL});
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 bg-register">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="w-1/2">
          <img src={regImg} alt="" />
        </div>
        <div className="card shrink-0 w-1/2">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered"
                required
                {...register("name", {required: true})}
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="PhotoURL"
                className="input input-bordered"
                required
                {...register("photoURL", {required: true})}
              />
              {errors.photoURL && (
                <span className="text-red-500">PhotoURL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
                {...register("email", {required: true})}
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
                {...register("password", {required: true})}
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="bg-[#D1A054] py-2 text-xl font-bold rounded">
                Register
              </button>
            </div>
          </form>
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            <p className="px-3 text-xl text-[#D1A054] font-bold">
              Register with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16"></div>
          </div>
          <SocialLogin></SocialLogin>
          <p className="text-xl text-center sm:px-6 text-[#D1A054] font-bold">
            Already have an account?
            <Link to="/login" className="ml-2 text-red-500 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
