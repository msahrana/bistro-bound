import {Helmet} from "react-helmet-async";
import Cover from "../../shared/Cover/Cover";
import banner from "/assets/shop/banner2.jpg";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {useState} from "react";
import useMenu from "../../hooks/useMenu/useMenu";
import OurShopTab from "../OurShopTab/OurShopTab";
import {useParams} from "react-router-dom";

const OurShop = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const {category} = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  const drinks = menu.filter((items) => items.category === "drinks");
  const dessert = menu.filter((items) => items.category === "dessert");
  const pizza = menu.filter((items) => items.category === "pizza");
  const salad = menu.filter((items) => items.category === "salad");
  const soup = menu.filter((items) => items.category === "soup");

  return (
    <div>
      <Helmet>
        <title>Bistro Bound | Our Shop</title>
      </Helmet>
      {/* main cover */}
      <Cover
        img={banner}
        title={"Our Shop"}
        description={"Would you like to try a dish?"}
      ></Cover>
      {/* tab section */}
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soups</Tab>
          <Tab>Desserts</Tab>
          <Tab>drinks</Tab>
        </TabList>
        <TabPanel>
          <OurShopTab items={salad}></OurShopTab>
        </TabPanel>
        <TabPanel>
          <OurShopTab items={pizza}></OurShopTab>
        </TabPanel>
        <TabPanel>
          <OurShopTab items={soup}></OurShopTab>
        </TabPanel>
        <TabPanel>
          <OurShopTab items={dessert}></OurShopTab>
        </TabPanel>
        <TabPanel>
          <OurShopTab items={drinks}></OurShopTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OurShop;
