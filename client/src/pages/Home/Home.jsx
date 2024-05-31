import Banner from "../../components/Banner/Banner";
import BistroBound from "../../components/BistroBound/BistroBound";
import CallUs from "../../components/CallUs/CallUs";
import Category from "../../components/Category/Category";
import Featured from "../../components/Featured/Featured";
import PopularMenu from "../../components/PopularMenu/PopularMenu";
import Testimonial from "../../components/Testimonial/Testimonial";
import {Helmet} from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Bound | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <BistroBound></BistroBound>
      <PopularMenu></PopularMenu>
      <CallUs></CallUs>
      <Featured></Featured>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
