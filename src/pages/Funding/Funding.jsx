import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import PaymentForm from "./PaymentForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const FundingPage = () => {
  const { user } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [itemCount, setItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  const { data: funds = [], refetch } = useQuery({
    queryKey: ['funds', currentPage, itemPerPage],
    queryFn: async () => {
      const { data: totalItemCount } = await axiosPublic('/founds-counts');
      setItemCount(totalItemCount?.count);

      const { data } = await axiosSecure('/funds', {
        params: {
          skip: (currentPage - 1) * itemPerPage,
          limit: itemPerPage,
        }
      });
      return data;
    },
    onError: (error) => {
      console.error('Error fetching funds:', error);
    },
  });

  const handleGiveFund = () => {
    setShowPaymentForm(true);
  };

  const numberOfPage = Math.ceil(itemCount / itemPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const handelItemParPage = e => {
    setItemPerPage(parseInt(e.target.value))
    setCurrentPage(1)
  }

  const handelPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handelNextPage = () => {
    if (currentPage < numberOfPage) setCurrentPage(currentPage + 1)
  }

  if (funds.length === 0) return <LoadingSpinner />

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
      <div className="text-center flex justify-center gap-2 pt-8">
        <button onClick={handelPrevPage} className="btn btn-sm bg-white text-blood ring ring-blood px-6">Prev</button>
        {
          pages?.map(page =>
            <button onClick={() => setCurrentPage(page + 1)} className={`btn btn-sm ${currentPage === page + 1 ? 'bg-blood text-white hover:bg-blood hover:text-white' : ''}`} key={page}>
              {page + 1}
            </button>)
        }
        <button onClick={handelNextPage} className="btn btn-sm bg-white text-blood ring ring-blood px-6">Next</button>
        <select value={itemPerPage} onChange={handelItemParPage} className="btn btn-sm bg-white text-blood ring ring-blood focus:outline-none">
          <option value="3">3</option>
          <option value="6">6</option>
          <option value="9">9</option>
        </select>
      </div>
    </div>
  );
};

export default FundingPage;
