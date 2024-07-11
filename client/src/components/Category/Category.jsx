import slider1 from "/assets/home/slide1.jpg";
import slider2 from "/assets/home/slide2.jpg";
import slider3 from "/assets/home/slide3.jpg";
import slider4 from "/assets/home/slide4.jpg";
import slider5 from "/assets/home/slide5.jpg";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section className="my-8">
      <SectionTitle
        subHeading={"From 11:00am to 10:00pm"}
        heading={"Order Online"}
      ></SectionTitle>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slider1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slider5} alt="" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Category;
