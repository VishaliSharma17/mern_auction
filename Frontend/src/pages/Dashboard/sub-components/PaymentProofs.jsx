import {
  clearAllSuperAdminSliceErrors,
    deletePaymentProof,
    getSinglePaymentProofDetail,
    updatePaymentProof,
  } from "../../../store/slice/superAdminSlice";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  
  const PaymentProofs = () => {
    const { paymentProofs, singlePaymentProof } = useSelector(
      (state) => state.superAdmin
    );
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
  
    const handlePaymentProofDelete = (id) => {
      dispatch(deletePaymentProof(id));
    };
  
    const handleFetchPaymentDetail = (id) => {
      dispatch(getSinglePaymentProofDetail(id));
    };
  
    useEffect(() => {
      if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
        setOpenDrawer(true);
      }
    }, [singlePaymentProof]);
  
  
    return (
      <>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white mt-5">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/3 py-2">User ID</th>
                <th className="w-1/3 py-2">Status</th>
                <th className="w-1/3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paymentProofs.length > 0 ? (
                paymentProofs.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 px-4 text-center">{element.userId}</td>
                      <td className="py-2 px-4 text-center">{element.status}</td>
                      <td className="flex items-center py-4 justify-center gap-3">
                        <button
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300"
                          onClick={() => handleFetchPaymentDetail(element._id)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition-all duration-300"
                          onClick={() => handlePaymentProofDelete(element._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center text-xl text-sky-600 py-3">
                  <td>No payment proofs are found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      </>
    );
  };
  
  export default PaymentProofs;
  
  export const Drawer = ({ setOpenDrawer, openDrawer }) => {
    const { singlePaymentProof, loading } = useSelector(
      (state) => state.superAdmin
    );
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      if (singlePaymentProof && singlePaymentProof._id) {
        setAmount(singlePaymentProof.amount || "");
        setStatus(singlePaymentProof.status || "");
      } else {
        setAmount("");
        setStatus("");
      }
    }, [singlePaymentProof]);
  
    const dispatch = useDispatch();
    const handlePaymentProofUpdate = () => {
      if (!singlePaymentProof || !singlePaymentProof._id) return;
      dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
    };
  
    // ✅ Early return to avoid rendering with null/invalid data
    if (!openDrawer || !singlePaymentProof || !singlePaymentProof._id) {
      return null;
    }
  return (
    <section
    className={`fixed inset-0 transition-all duration-300 bg-[#00000087] z-50 ${
      openDrawer && singlePaymentProof?.userId ? "visible opacity-100" : "invisible opacity-0"
    }`}
  >
    <div className="absolute bottom-0 left-0 right-0 w-full max-h-[90%] overflow-y-auto bg-rose-100 rounded-t-2xl shadow-lg transition-all duration-300 sm:max-w-[640px] sm:mx-auto px-5 py-8">
        <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
          <h3 className="text-[#D6482B]  text-3xl font-semibold text-center mb-1">
           Update Payment Proof
          </h3>
          <p className="text-stone-600 pt-7">
          You can update payment status and amount.
          </p>
          <form className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-stone-600 ">
               User Id
              </label>
              <input
                    type="text"
                    value={singlePaymentProof?.userId || ""}
                    disabled
                    onChange={(e) => e.target.value}
                className="text-[16px]   border-[1px]  border-gray-400 py-3 px-4 rounded  focus:outline-none focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]  w-full"
                style={{ color: "gray" }}  />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-[16px] text-stone-600">
               Amount
              </label>
              <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                className="text-[16px]   border-[1px]  border-gray-400 py-3 px-4 rounded  focus:outline-none focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]  w-full"
                style={{ color: "black" }}  />
            </div>
            <div className="flex flex-col gap-3">
                  <label className="text-[16px] text-stone-600">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="text-[16px]   border-[1px]  border-gray-400 py-3 px-4 rounded  focus:outline-none focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]  w-full"
                    style={{ color: "black" }} >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Settled">Settled</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[16px] text-stone-600">Comment</label>
                  <textarea
                    rows={5}
                    value={singlePaymentProof?.comment || ""}
                    onChange={(e) => e.target.value}
                    disabled
                    className="text-[16px]   border-[1px]  border-gray-400 py-3 px-4 rounded  focus:outline-none focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]  w-full"
                    style={{  color: "gray"}}
                  />
                </div>
                <div>
                  <Link
                    to={singlePaymentProof?.proof?.url || ""}
                    className="bg-[#D6482B] flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-[#b8381e]"
                    target="_blank"
                  >
                    Payment Proof (SS)
                  </Link>
                </div>
            <div>
              <button
                type="button"
                className="bg-rose-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-rose-700"
                onClick={handlePaymentProofUpdate}
              >
                {loading ? "Updating Payment Proof...." : "Update Payment Proof"} 
              </button>
            </div>
            <div>
              <button
                type="button"
                className="bg-sky-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-sky-700"
                onClick={() => setOpenDrawer(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};