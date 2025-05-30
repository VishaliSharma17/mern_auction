import { useDispatch, useSelector } from "react-redux";
import { postCommissionProof } from "../store/slice/commissionSlice";
import React, { useState } from "react";


const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.commission);
  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-15 pt-20 lg:pl-[370px] flex flex-col min-h-screen py-4 justify-start">
        <div className=" mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-lg border border-gray-300 bg-white/50 backdrop-blur-lg shadow-lg">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handlePaymentProof}
          >
            <h3 className={`text-[#D6482B] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl`}>Upload Payment Proof</h3>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                style={{color:'black'}}
                // className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
            </div>
          
            <div className="flex flex-col gap-2">
              <label className="text-[16px]  text-stone-500">
                Payment Proof (ScreenShot)
              </label>
              <label className="bg-[#d6482b] text-[16px]  text-white px-4 py-2 rounded cursor-pointer text-sm w-60 hover:bg-[#b8381e] ">
              <input
                type="file"
                onChange={proofHandler}
                className="text-[16px] py-2 bg-transparent  focus:outline-none"
                accept="image/*"
              />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={7}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                style={{color:'black'}}
                // className="text-[16px] py-2 bg-transparent border-[1px] rounded-md px-1 border-stone-500 focus:outline-none"
              />
            </div>
              <button
                className="bg-[#d6482b] mx-auto font-semibold hover:bg-[#b8381e] text-xl transition-all duration-300 py-2 px-4 rounded-md text-white my-4"
                type="submit"
              >
                {loading ? "Uploading..." : "Upload Payment Proof"}
              </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SubmitCommission;