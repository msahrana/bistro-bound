import SectionTitle from "../SectionTitle/SectionTitle";
import FeaturedImg from "/assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <section className="featured-Img text-white pt-6 bg-fixed my-10">
      <SectionTitle
        subHeading={"Check it out"}
        heading={"Featured Item"}
      ></SectionTitle>
      <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center md:pb-20 pt-8 md:px-36 bg-slate-500 bg-opacity-30">
        <div>
          <img src={FeaturedImg} alt="" />
        </div>
        <div className="ml-2 md:ml-4 lg:ml-6 space-y-2">
          <p>May 20, 2024</p>
          <h2 className="font-medium">WHERE CAN I GET SOME?</h2>
          <p className="text-justify pr-2">
            Our Grilled Salmon with Mango Salsa is a delectable dish that
            combines the richness of perfectly grilled salmon with the vibrant
            flavors of fresh mango salsa. Served alongside your choice of sides,
            this dish is a perfect balance of savory and sweet, making it a
            delightful choice for seafood lovers and those craving a taste of
            the tropics.
          </p>
          <button className="btn btn-outline border-0 border-b-4 text-white uppercase">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
