import {useQuery} from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: menu = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const {data} = await axiosPublic.get("/menu");
      return data;
    },
  });

  return [menu, loading, refetch];
};

export default useMenu;
