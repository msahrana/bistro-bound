import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import loginImg from "../../../public/assets/others/authentication2.png";
import useAuth from "../../hooks/useAuth/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Login.css";
import toast from "react-hot-toast";
import {useState} from "react";

const Login = () => {
  const {signIn} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    const {email, password} = data || {};
    setError("");
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("User logged in successfully!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        console.log(err);
        setError("email and password does not matched!");
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200 bg-login">
      <div className="hero-content flex-col lg:flex-row w-full">
        <div className="w-1/2">
          <img src={loginImg} alt="" />
        </div>
        <div className="card shrink-0 w-1/2">
          <h1 className="text-4xl font-bold text-center">Please Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
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
                <span className="label-text font-bold">Password</span>
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
                Login
              </button>
            </div>
          </form>
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
            <p className="px-3 text-xl text-[#D1A054] font-bold">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16"></div>
          </div>
          <SocialLogin></SocialLogin>
          <p className="text-xl text-center sm:px-6 text-[#D1A054] font-bold">
            Don`t have an account?
            <Link to="/register" className="ml-2 text-red-500 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
