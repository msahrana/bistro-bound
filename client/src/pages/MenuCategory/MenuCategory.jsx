import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";
import {Link} from "react-router-dom";

const MenuCategory = ({items, title, img, description}) => {
  return (
    <div className="my-10">
      {title && (
        <Cover img={img} title={title} description={description}></Cover>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 container mx-auto mt-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to={`/ourShop/${title}`}>
          <button className="btn btn-outline bg-gray-50 border-0 border-b-2 text-[#BB8506] uppercase">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
