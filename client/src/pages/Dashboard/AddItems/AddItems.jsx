import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {useForm} from "react-hook-form";
import {FaUtensils} from "react-icons/fa";
import {imageUpload} from "../../../api/utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";

const AddItems = () => {
  const axiosSecure = useAxiosSecure();
  const {register, handleSubmit} = useForm();

  const onSubmit = async (data) => {
    const image_url = await imageUpload(data?.image[0]);
    const menuItem = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      recipe: data.recipe,
      image: image_url,
    };
    // console.log(menuItem);
    await axiosSecure.post("/menu", menuItem);
    toast.success(`${data.name} is added successfully!`);
  };

  return (
    <div className="min-h-[calc(100vh-32px)]">
      <Helmet>
        <title>Bistro Bound | Dashboard | Add Item</title>
      </Helmet>
      <SectionTitle
        subHeading={"What's new?"}
        heading={"ADD AN ITEM"}
      ></SectionTitle>
      <div className="bg-[#f3f3f3] lg:mx-40 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">Recipe Name*</span>
            </div>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", {required: true})}
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex flex-col md:flex-col lg:flex-row gap-6">
            {/* category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Category*</span>
              </div>
              <select
                defaultValue={"default"}
                {...register("category", {required: true})}
                className="select select-bordered w-full"
              >
                <option disabled value={"default"}>
                  Select a Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>
            {/* price */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Price*</span>
              </div>
              <input
                type="number"
                placeholder="Price"
                {...register("price", {required: true})}
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-bold">Recipe Details*</span>
            </div>
            <textarea
              {...register("recipe", {required: true})}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </label>

          <div className="my-5">
            <input
              {...register("image", {required: true})}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-gradient-to-r from-[#835d23] to-[#b58130] text-white">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
