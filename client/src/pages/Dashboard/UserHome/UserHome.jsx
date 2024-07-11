import useAuth from "../../../hooks/useAuth/useAuth";

const UserHome = () => {
  const {user} = useAuth();

  return (
    <div>
      <h1 className="text-3xl ml-5 mt-5">
        <span className="text-green-400">Hi, WelCome </span>
        {user?.displayName ? user.displayName : "Back!"}
      </h1>
    </div>
  );
};

export default UserHome;
