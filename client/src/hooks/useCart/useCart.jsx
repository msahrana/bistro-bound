import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";
import useAuth from "../useAuth/useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const {data: cart = [], refetch} = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/carts?email=${user.email}`);
      return data;
    },
  });
  return [cart, refetch];
};

export default useCart;
