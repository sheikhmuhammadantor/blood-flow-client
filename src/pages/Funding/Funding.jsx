import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe("your-publishable-key-here");

const FundingPage = () => {
  const { user } = useAuth();
  const [funds, setFunds] = useState([1,2]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { data } = await axios.get("/funds");
        setFunds(data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };

    fetchFunds();
  }, []);

  const handleGiveFund = () => {
    setShowPaymentForm(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Funding Page</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={handleGiveFund}
      >
        Give Fund
      </button>

      {showPaymentForm && (
        <Elements stripe={stripePromise}>
          <PaymentForm user={user} setShowPaymentForm={setShowPaymentForm} />
        </Elements>
      )}

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Fund Amount</th>
              <th>Funding Date</th>
            </tr>
          </thead>
          <tbody>
            {/* {funds?.map((fund, index) => ( */}
            {[1,2]?.map((fund, index) => (
              <tr key={fund?._id}>
                <td>{index + 1}</td>
                <td>{fund.userName}</td>
                <td>${fund.amount}</td>
                {/* <td>{format(new Date(fund?.date), "PPP")}</td> */}
                {/* <td>{format(new Date(fund?.date), "PPP")}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundingPage;
