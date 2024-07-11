import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useCart from "../../hooks/useCart/useCart";

const FoodCard = ({item}) => {
  const {user} = useAuth();
  const [, refetch] = useCart();

  const axiosSecure = useAxiosSecure();
  const {name, image, recipe, price, _id} = item || {};

  const handleAddToCart = () => {
    const cartItem = {
      menuId: _id,
      email: user?.email,
      name,
      image,
      price,
    };
    axiosSecure.post("/carts", cartItem).then((res) => {
      const data = res.data;
      if (data.insertedId) {
        toast.success(`${name} is added to database!`);
        refetch();
      }
    });
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl w-full" />
      </figure>
      <p className="text-white rounded bg-gray-800 absolute right-0 mt-12 mr-12 px-2">
        <span className="font-bold">Price:</span> ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>

        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-gray-50 border-0 border-b-2 text-[#BB8506] uppercase"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
