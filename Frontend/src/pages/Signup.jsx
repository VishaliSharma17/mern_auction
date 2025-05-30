import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../store/slice/userSlice";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [googlepayNumber, setGooglepayNumber] = useState("");
  const [phonepayId, setPhonepayId] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    role == "Auctioneer" &&
      (formData.append("bankAccountNumber", bankAccountNumber),
      formData.append("bankAccountName", bankAccountName),
      formData.append("bankName", bankName),
      formData.append("googlepayNumber", googlepayNumber),
      formData.append("phonepayId", phonepayId));
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="w-full ml-0 m-0  px-10 pt-20 lg:pl-[370px] flex flex-col min-h-screen py-4 justify-center bg-gradient-to-br from-rose-500  to-blue-500">
        <div className="mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-lg border border-gray-300 bg-white/50 backdrop-blur-lg shadow-lg">
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Register
          </h1>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleRegister}
          >
            <p className="font-semibold text-xl md:text-2xl text-gray-700 ">
              Personal Details
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                  style={{ color: "black" }}
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                  style={{ color: "black" }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                  style={{ color: "black" }}
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                  style={{ color: "black" }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                  style={{ color: "black" }}
                >
                  <option value="">Select Role</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b]"
                  style={{ color: "black" }}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-1 gap-2">
              <label className="text-[16px] text-stone-600">
                Profile Image
              </label>
              <div className="flex items-center gap-3 text-[16px] py-2 bg-transparent ">
                <img
                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : "/imageHolder.jpg"
                  }
                  alt="profileImagePreview"
                  className="w-14 h-14 rounded-full"
                />
                <label className="bg-[#d6482b] text-white px-7 py-2 rounded cursor-pointer text-sm w-45 text-[16px]">
                  Choose Image
                  <input
                    type="file"
                    onChange={imageHandler}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className=" pt-5 font-semibold text-xl md:2xl flex flex-col text-gray-700">
                Payment Method Details{" "}
                <span className="text-[12px] text-stone-500">
                  Fill Payment Details Only If you are registering as an
                  Auctioneer
                </span>
              </label>
              <div className="flex flex-col gap-1">
                <label className="text-[16px] text-stone-600 font-semibold">
                  Bank Details
                </label>
                <div className="pt-3 flex flex-col gap-4 sm:flex-row sm:gap-4 text-stone-300">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b] sm:flex-1"
                    disabled={role === "Bidder" || role === ""}
                    style={{ color: "black" }}
                  >
                    <option value="">Select Your Bank</option>
                    <option value="State Bank of India">
                      State Bank of India
                    </option>
                    <option value="Central Bank of India">
                      Central Bank of India
                    </option>
                    <option value="Punjab National Bank">
                      Punjab National Bank
                    </option>
                    <option value="Bank of India">Bank of India</option>
                    <option value="UCO Bank">UCO Bank</option>
                    <option value="ICIC Bank Ltd.">ICIC Bank Ltd.</option>
                    <option value="HDFC Bank Ltd.">HDFC Bank Ltd.</option>
                  </select>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    placeholder="IFSC"
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b] sm:flex-1"
                    disabled={role === "Bidder" || role === ""}
                    style={{ color: "black" }}
                  />
                  <input
                    type="text"
                    value={bankAccountName}
                    placeholder="Bank Account UserName"
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b] sm:flex-1"
                    disabled={role === "Bidder" || role === ""}
                    style={{ color: "black" }}
                  />
                </div>
              </div>
              <div>
                <label className="text-[16px] text-stone-600 font-semibold">
                  GooglePay And PhonePay Details
                </label>
                <div className=" pt-3 flex flex-col gap-4 sm:flex-row sm:gap-4">
                  <input
                    type="number"
                    value={googlepayNumber}
                    placeholder="GooglePay Number"
                    onChange={(e) => setGooglepayNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b] sm:flex-1"
                    disabled={role === "Bidder" || role === ""}
                    style={{ color: "black" }}
                  />
                  <input
                    type="text"
                    value={phonepayId}
                    placeholder="PhonePay Id"
                    onChange={(e) => setPhonepayId(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500  focus:outline-none  px-4 rounded border border-gray-400 text-black placeholder-gray-500  focus:ring-2 focus:ring-[#d6482b]/70 focus:border-[#d6482b] sm:flex-1"
                    disabled={role === "Bidder" || role === ""}
                    style={{ color: "black" }}
                  />
                </div>
              </div>
            </div>

            <button
              className="bg-[#d6482b] w-[420px] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto lg:w-[640px] my-4"
              type="submit"
              disabled={loading}
            >
              {loading && "Registering..."}
              {!loading && "Register"}
            </button>
            <p className="mt-3 text-sm text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#d6482b] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
