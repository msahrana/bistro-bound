import ReviewImg from "/assets/quote-left.png";
import SectionTitle from "../SectionTitle/SectionTitle";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {Rating} from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/navigation";
import {useEffect, useState} from "react";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://server-sigma-dusky.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section className="container mx-auto">
      <SectionTitle
        subHeading={"What Our Clients Say"}
        heading={"Testimonial"}
      ></SectionTitle>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="m-2 md:m-20 flex flex-col items-center space-y-4">
              <Rating
                className="mx-auto"
                style={{maxWidth: 180}}
                value={review.rating}
                readOnly
              />
              <img className="size-10" src={ReviewImg} alt="" />
              <p className="text-justify">{review.details}</p>
              <h2 className="text-orange-500 text-2xl">{review.name}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
