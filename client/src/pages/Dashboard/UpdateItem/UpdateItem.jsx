import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {useForm} from "react-hook-form";
import {FaUtensils} from "react-icons/fa";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import {imageUpload} from "../../../api/utils";
import toast from "react-hot-toast";

const UpdateItem = () => {
  const [token, setToken] = useState();
  const axiosSecure = useAxiosSecure();
  const {id} = useParams();
  const item = token;
  const {name, image, category, price, recipe} = item || {};
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
    await axiosSecure.patch(`/menu/${id}`, menuItem);

    toast.success(`${data.name} is updated successfully!`);
  };

  useEffect(() => {
    axiosSecure.get(`/menu/${id}`).then((data) => setToken(data.data));
  }, [axiosSecure, id]);

  return (
    <div className="min-h-[calc(100vh-32px)]">
      <Helmet>
        <title>Bistro Bound | Dashboard | Update</title>
      </Helmet>
      <SectionTitle
        subHeading={"What's new?"}
        heading={"UPDATE ITEM"}
      ></SectionTitle>
      <div className="bg-[#f3f3f3] lg:mx-40 lg:p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">Recipe Name*</span>
            </div>
            <input
              type="text"
              defaultValue={name}
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
                defaultValue={category}
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
                defaultValue={price}
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
              defaultValue={recipe}
              {...register("recipe", {required: true})}
              className="textarea textarea-bordered h-24"
              placeholder="Recipe Details"
            ></textarea>
          </label>

          <div className="my-5">
            <input
              defaultValue={image}
              {...register("image", {required: true})}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <div className="text-center">
            <button className="btn bg-gradient-to-r from-[#835d23] to-[#b58130] text-white px-10">
              Update Recipe Details <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
