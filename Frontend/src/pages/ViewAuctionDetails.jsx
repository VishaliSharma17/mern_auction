import Spinner from "../custom-components/Spinner";
import { getAuctionDetail } from "../store/slice/auctionsSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(auctionDetail.startTime) - now;
    const endDifference = new Date(auctionDetail.endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
      <div className="text-[16px] flex flex-wrap gap-2 items-center mb-4">
        <Link
          to="/"
          className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
        >
          Home
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <Link
          to={"/view-my-auctions"}
          className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
        >
          My Auctions
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <p className="text-stone-600">{auctionDetail.title}</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-4 flex-col lg:flex-row bg-white p-4 rounded shadow">
              <div className="w-full lg:w-3/3 flex justify-center items-center">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="max-w-full h-auto rounded"
                />
              </div>
              <div className="flex flex-col justify-between w-full lg:w-2/3">
                <h3 className="text-[#111] text-2xl font-semibold mb-2">
                  {auctionDetail.title}
                </h3>
                <p className="text-lg font-medium">
                  Condition:{" "}
                  <span className="text-[#D6482B]">
                    {auctionDetail.condition}
                  </span>
                </p>
                <p className="text-lg font-medium">
                  Minimum Bid:{" "}
                  <span className="text-[#D6482B]">
                    Rs.{auctionDetail.startingBid}
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-xl font-bold mb-2">
                Auction Item Description
              </h4>
              <hr className="my-2 border-t-[1px] border-t-stone-700" />
              <ul className="list-disc list-inside space-y-2">
                {auctionDetail.description &&
                  auctionDetail.description
                    .split(". ")
                    .map((element, index) => {
                      return (
                        <li key={index} className="text-[18px] text-justify">
                          {element}
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded shadow">
              <header className="bg-stone-200 py-4 text-[24px] font-semibold px-4 rounded-t">
                BIDS
              </header>
              <div className="px-4 py-2 min-h-fit lg:min-h-[650px]">
                {auctionBidders &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                  auctionBidders.length > 0 ? (
                    auctionBidders.map((element, index) => {
                      const rankColors = [
                        "text-green-600",
                        "text-blue-600",
                        "text-yellow-600",
                      ];
                      const rankLabels = ["1st", "2nd", "3rd"];
                      return (
                        <div
                          key={index}
                          className="py-2 flex items-center justify-between border-b"
                        >
                          <div className="flex flex-1 items-center gap-4">
                            <img
                              src={element.profileImage}
                              alt={element.userName}
                              className="w-12 h-12 rounded-full my-2 hidden md:block"
                            />
                            <p className="text-[18px] font-semibold">
                              {element.userName}
                            </p>
                          </div>
                          <p className="flex-1 text-center">{element.amount}</p>
                          <p
                            className={`text-[20px] flex-1  text-end font-semibold ${
                              rankColors[index] || "text-gray-600"
                            }`}
                          >
                            {rankLabels[index] || `${index + 1}th`}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500 py-4">
                      No bids for this auction
                    </p>
                  )
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <img
                    src="/notStarted.png"
                    alt="not-started"
                    className="w-full max-h-[650px]"
                  />
                ) : (
                  <img
                    src="/auctionEnded.png"
                    alt="ended"
                    className="w-full max-h-[650px]"
                  />
                )}
              </div>
            </div>

            <div className="bg-[#D6482B] py-4 text-[16px] md:text-[24px] font-semibold px-4 flex items-center justify-between rounded shadow">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex gap-3 flex-col sm:flex-row sm:items-center">
                    <label className="text-white">Auction is going on!</label>
                    <p className="text-black font-semibold text-[19px]">
                      {timeLeft.type}
                      <span className="text-[#f9f9f9] font-bold ml-2">
                        {formatTimeLeft(timeLeft)}
                      </span>
                    </p>
                  </div>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <div className="flex flex-col gap-4">
                  <span className="text-white font-semibold text-xl">
                    Auction has not started yet!
                  </span>
                  <p className="text-black font-semibold text-[19px]">
                    {timeLeft.type}
                    <span className="text-[#f9f9f9] font-bold ml-2">
                      {formatTimeLeft(timeLeft)}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-white font-semibold text-xl">
                    Auction has ended!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetails;
