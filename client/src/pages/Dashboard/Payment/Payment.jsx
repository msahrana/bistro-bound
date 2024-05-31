import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div>
      <SectionTitle
        subHeading={"Be Careful"}
        heading={"Please Pay First"}
      ></SectionTitle>
      <div className="md:mx-20 md:mt-20">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
