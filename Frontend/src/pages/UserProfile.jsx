import Spinner from "../custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="min-h-screen pt-20 px-18 pb-10 bg-gradient-to-br from-rose-500  to-blue-500 lg:pl-[340px]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-md w-full max-w-5xl mx-auto rounded-xl p-6">
          {/* Profile Image with Background */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-rose-500 p-2 rounded-full shadow-lg">
              <img
                src={user.profileImage?.url}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white"
              />
            </div>
            <h2 className="text-2xl font-bold text-black">Welcome, {user.userName}!</h2>
          </div>

          {/* Personal Details */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-black">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Username", value: user.userName },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Address", value: user.address },
                { label: "Role", value: user.role },
                { label: "Joined On", value: user.createdAt?.substring(0, 10) },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-black mb-1">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    className="w-full p-2 rounded-md border border-gray-300 text-black bg-gray-100"
                    disabled
                  style={{color:'red'}}/>
                </div>
              ))}
            </div>
          </div>

          {/* Auctioneer Payment Details */}
          {user.role === "Auctioneer" && (
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-black">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Bank Name",
                    value: user.paymentMethods?.bankTransfer?.bankName,
                  },
                  {
                    label: "Bank Account (IFSC)",
                    value: user.paymentMethods?.bankTransfer?.bankAccountNumber,
                  },
                  {
                    label: "User Name On Bank Account",
                    value: user.paymentMethods?.bankTransfer?.bankAccountName,
                  },
                  {
                    label: "Google Pay Number",
                    value: user.paymentMethods?.googlepay?.googlepayNumber,
                  },
                  {
                    label: "Phone Pay Id",
                    value: user.paymentMethods?.phonepay?.phonepayId,
                  },
                ].map((item, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-black mb-1">
                      {item.label}
                    </label>
                    <input
                      type="text"
                      value={item.value}
                      className="w-full p-2 rounded-md border border-gray-300 text-black bg-gray-100"
                      disabled
                      style={{color:'blue'}} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black">Other User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.role === "Auctioneer" && (
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Unpaid Commissions
                  </label>
                  <input
                    type="text"
                    value={user.unpaidCommission}
                    className="w-full p-2 rounded-md border border-gray-300 text-black bg-gray-100"
                    disabled  style={{color:'purple'}}
                  />
                </div>
              )}
              {user.role === "Bidder" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Auctions Won
                    </label>
                    <input
                      type="text"
                      value={user.auctionsWon}
                      className="w-full p-2 rounded-md border border-gray-300 text-black bg-gray-100"
                      disabled style={{color:'red'}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Money Spent
                    </label>
                    <input
                      type="text"
                      value={user.moneySpent}
                      className="w-full p-2 rounded-md border border-gray-300 text-black bg-gray-100"
                      disabled style={{color:'green'}}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
