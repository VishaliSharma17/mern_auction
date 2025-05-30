import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We value transparency and honesty to ensure a fair auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We push boundaries by constantly improving with cutting-edge tech.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We’ve built a thriving network of buyers and sellers who support one another.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "Our platform is centered around our users — your satisfaction drives us.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-stone-800 font-sans pt-20 pl-10 pr-4 md:pl-[300px] overflow-x-hidden ">
      {/* Hero Section */}
      <div className="bg-[#fff0eb] px-6 py-12 text-center shadow-md">
        <h1 className="text-4xl md:text-6xl font-bold text-[#d6482b]">About PrimeBid</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-stone-700">
          PrimeBid is your gateway to thrilling online auctions. Founded in 2025, we connect buyers and sellers through a secure, exciting, and innovative platform.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white px-6 py-12 shadow-inner">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#111] mb-4">Our Mission</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            To revolutionize how people buy and sell online through trust, technology, and transparency. We empower users to discover, bid, and win with confidence.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-[#fefefe] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#111] mb-10 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.id} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-[#d6482b] mb-2">{value.title}</h3>
                <p className="text-stone-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-[#fff0eb] px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#111] mb-4">Our Story</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            PrimeBid was founded by Vishali Sharma, who had a dream to make auctioning simple, exciting, and accessible for everyone. With a team of auction veterans and tech enthusiasts, PrimeBid has grown into a trusted marketplace where every bid counts.
          </p>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[#111] mb-4">Join Our Community</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto mb-6">
            Whether you're a seller with rare items or a buyer seeking deals, PrimeBid is the place to be. Experience the thrill of auctions in a way you’ve never seen before.
          </p>
          <button className="bg-[#d6482b] hover:bg-[#b83a23] text-white px-6 py-3 rounded-md text-lg transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Footer Thank You */}
      <div className="bg-[#d6482b] px-6 py-8 text-white text-center">
        <p className="text-xl font-semibold">Thank you for choosing PrimeBid — let the bidding begin!</p>
      </div>
    </div>
  );
};

export default About;
