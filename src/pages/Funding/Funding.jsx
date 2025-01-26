import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import PaymentForm from "./PaymentForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const FundingPage = () => {
  const { user } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const axiosSecure = useAxiosSecure();


  const { data: funds = [], refetch } = useQuery({
    queryKey: ['funds',],
    queryFn: async () => {
      const { data } = await axiosSecure('/funds');
      return data;
    },
    onError: (error) => {
      console.error('Error fetching funds:', error);
    },
  });

  const handleGiveFund = () => {
    setShowPaymentForm(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Funding Page</h1>
      <button
        className="btn bg-blood text-white mb-4"
        onClick={handleGiveFund}
      >
        Give Fund
      </button>

      {showPaymentForm && (
        <Elements stripe={stripePromise}>
          <PaymentForm user={user} setShowPaymentForm={setShowPaymentForm} refetch={refetch} />
        </Elements>
      )}

      <div className="divider before:bg-blood after:bg-blood text-xl font-bold my-12">All Funds</div>

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
            {funds?.map((fund, index) => (
              <tr key={fund?._id}>
                <td>{index + 1}</td>
                <td>{fund.sponsorName}</td>
                <td>${fund.fundAmount}</td>
                <td>{format(new Date(fund?.fundDate), "PPP")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundingPage;
