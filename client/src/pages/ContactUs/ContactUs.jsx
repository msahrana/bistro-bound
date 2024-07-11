import {Helmet} from "react-helmet-async";
import Cover from "../../shared/Cover/Cover";
import banner from "/assets/contact/banner.jpg";

const ContactUs = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Bound | Contact</title>
      </Helmet>
      {/* main cover */}
      <Cover
        img={banner}
        title={"Contact Us"}
        description={"Would you like to try a dish?"}
      ></Cover>
    </div>
  );
};

export default ContactUs;
