"use client";

export default function FeatureCards() {
  const features = [
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M16 4C12 4 8 6 8 10C8 14 12 18 16 22C20 18 24 14 24 10C24 6 20 4 16 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 14C12 14 13 16 16 16C19 16 20 14 20 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Natural Formula",
      description: "Crafted with pure, skin-loving ingredients for ultimate care.",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path
            d="M10 12C10 10.5 11 9 12.5 9C14 9 15 10.5 15 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 12C17 10.5 18 9 19.5 9C21 9 22 10.5 22 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 20C8 24 10 26 14 26C18 26 20 24 20 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 8C16 8 18 10 20 12C22 14 24 18 24 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 8C16 8 14 10 12 12C10 14 8 18 8 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Cruelty-Free",
      description: "Our products are never tested on animals, guaranteed ethical.",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16L15 19L20 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Expert Approved",
      description: "Carefully tested to ensure safety and visible results.",
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <rect
            x="4"
            y="12"
            width="20"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12V8C8 6.5 9 5 10.5 5H13.5C15 5 16 6.5 16 8V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="10"
            cy="22"
            r="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="18"
            cy="22"
            r="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 18L28 22L24 26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Free Shipping",
      description: "Delivered to your doorstep with no extra costs worldwide.",
    },
  ];

  return (
    <section className="w-full bg-[#F2F2EF] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-8xl mx-48">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center"
            >
              <div className="text-black mb-4">{feature.icon}</div>
              <h3
                className="text-xl md:text-2xl text-black mb-3"
                style={{ fontFamily: "var(--font-sentient)", fontWeight: 400 }}
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-600 text-sm md:text-base leading-relaxed"
                style={{ fontFamily: "var(--font-figtree)", fontWeight: 400 }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

