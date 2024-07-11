import {Helmet} from "react-helmet-async";
import Cover from "../../shared/Cover/Cover";
import banner from "/assets/menu/banner3.jpg";
import dessertImg from "/assets/menu/dessert-bg.jpeg";
import pizzaImg from "/assets/menu/pizza-bg.jpg";
import saladImg from "/assets/menu/salad-bg.jpg";
import soupImg from "/assets/menu/soup-bg.jpg";
import useMenu from "../../hooks/useMenu/useMenu";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const OurMenu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((items) => items.category === "offered");
  const dessert = menu.filter((items) => items.category === "dessert");
  const pizza = menu.filter((items) => items.category === "pizza");
  const salad = menu.filter((items) => items.category === "salad");
  const soup = menu.filter((items) => items.category === "soup");

  return (
    <div>
      <Helmet>
        <title>Bistro Bound | Our Menu</title>
      </Helmet>
      {/* main cover */}
      <Cover
        img={banner}
        title={"Our Menu"}
        description={"Would you like to try a dish?"}
      ></Cover>
      <SectionTitle
        subHeading={"Don't miss"}
        heading={"TODAY'S OFFER"}
      ></SectionTitle>
      {/* offered menu */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu */}
      <MenuCategory
        img={dessertImg}
        items={dessert}
        title={"dessert"}
        description={
          "A rich, decadent chocolate cake with a gooey molten center, served with a scoop of vanilla ice cream..."
        }
      ></MenuCategory>
      {/* pizza menu */}
      <MenuCategory
        img={pizzaImg}
        items={pizza}
        title={"pizza"}
        description={
          "A traditional favorite with fresh mozzarella, ripe tomatoes, and aromatic basil on a crisp, wood-fired crust..."
        }
      ></MenuCategory>
      {/* salad menu */}
      <MenuCategory
        img={saladImg}
        items={salad}
        title={"salad"}
        description={
          "risp romaine lettuce, Parmesan cheese, and garlic croutons, tossed in a creamy Caesar dressing, with optional grilled chicken..."
        }
      ></MenuCategory>
      {/* soup menu */}
      <MenuCategory
        img={soupImg}
        items={soup}
        title={"soup"}
        description={
          "A creamy and flavorful tomato soup, accented with fresh basil and a hint of garlic, served with a slice of warm, crusty bread..."
        }
      ></MenuCategory>
    </div>
  );
};

export default OurMenu;
