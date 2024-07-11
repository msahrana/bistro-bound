import SectionTitle from "../SectionTitle/SectionTitle";
import MenuItem from "../../shared/MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((items) => items.category === "popular");

  return (
    <section className="my-12">
      <SectionTitle
        subHeading={"Popular Items"}
        heading={"FROM OUR MENU"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 container mx-auto">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
