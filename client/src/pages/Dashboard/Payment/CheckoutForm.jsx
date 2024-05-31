import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useCart from "../../../hooks/useCart/useCart";
import useAuth from "../../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const {user} = useAuth();
  const navigate = useNavigate();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", {price: totalPrice})
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment-error", error);
      setError(error.message);
    } else {
      console.log("payment-method", paymentMethod);
      setError("");
    }
    /* confirm payment */
    const {paymentIntent, error: confirmError} =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm-error");
    } else {
      console.log("payment-intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        /* save payment info */
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };
        const {data} = await axiosSecure.post("/payments", payment);
        console.log("payment-save", data);
        refetch();
        if (data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank yoy for payment!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/payment-history");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-[#D1A054] px-4 py-1 mt-2 ml-2 rounded font-semibold"
        type="submit"
        // disabled={!stripe || clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-500">Your Transaction Id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
