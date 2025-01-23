import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const PaymentForm = ({ user, setShowPaymentForm }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            // const { data: clientSecret } = await axiosPublic.post("/create-payment-intent", { amount });

            // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            //     payment_method: {
            //         card: elements.getElement(CardElement),
            //         billing_details: {
            //             name: user?.name,
            //             email: user?.email,
            //         },
            //     },
            // });

            // if (error) {
            //     console.error("Payment failed:", error);
            //     setLoading(false);
            //     return;
            // }

            await axiosPublic.post("/funds", {
                sponsorName: user?.displayName,
                sponsorEmail: user?.email,
                fundAmount: amount,
                fundDate: new Date(),
            });

            toast.success("Payment successful! Thank you for your support.");
            setShowPaymentForm(false);
        } catch (error) {
            console.error("Error processing payment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {console.log(user)}
            <div>
                <label className="block text-sm font-medium">Amount</label>
                <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Card Details</label>
                <CardElement className="p-2 border rounded" />
            </div>

            <button
                type="submit"
                className={`btn bg-blood text-white w-full ${loading && "loading"}`}
                disabled={!stripe || loading}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

PaymentForm.propTypes = {
    user: PropTypes.object.isRequired,
    setShowPaymentForm: PropTypes.func.isRequired,
};

export default PaymentForm;
