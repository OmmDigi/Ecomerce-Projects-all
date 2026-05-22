"use client";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-[#d7d9db] overflow-hidden">
      {/* Background Image */}
      <img
        src="/herosection/heroimage.webp"
        alt="Lion illustration"
        className="absolute inset-0 px-3 md:px-10 w-full h-full object-cover lg:object-[center_-300px] md:object-[center_-100px] z-0"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col justify-around h-130  relative">
          {/* Main Content */}
          <div className="absolute top-8 md:top-10 text-start z-10 animate-fadeIn">
            <h6 className="text-sm md:text-base tracking-widest text-gray-600 mb-4 animate-fadeInDown">
              SPRING / 2022
            </h6>

            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#0A1E33] mb-8 leading-tight">
              New limited
              <br />
              edition collection
              <br />
              is here
            </h1>

            <Link
              href="/product"
              className="inline-flex items-center gap-2 bg-[#e3694b] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105 animate-bounceIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs md:text-base font-medium">Shop now</span>
            </Link>
          </div>

          {/* Decorative Elements */}

          {/* Top Right Scribble Path */}
          <div className="absolute top-8 md:top-10 right-8 md:right-20 lg:right-32 w-36 md:w-48 opacity-80 animate-fadeIn hidden sm:block scale-animation z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 187 164"
              className="w-full h-auto"
            >
              <g fill="#0A1E33" fillRule="nonzero">
                <path d="M183.308507,27 C183.16967,27 183.030833,27 182.845716,26.952511 C182.753158,26.952511 175.441065,24.9104838 170.581762,24.5305718 C169.609902,24.4355938 168.915715,23.5807917 169.008274,22.6310117 C169.100832,21.6812316 169.887576,20.8739185 170.859436,21.0163855 C175.996414,21.4437866 183.447344,23.4858137 183.725019,23.5807917 C184.6506,23.8182368 185.205949,24.8155058 184.928275,25.7652859 C184.743158,26.477621 184.048972,27 183.308507,27 Z" />
                <path d="M168.308507,6 C168.16967,6 168.030833,6 167.845716,5.95251755 C167.753158,5.95251755 160.441065,3.9107721 155.581762,3.53091249 C154.609902,3.43594758 153.915715,2.58126344 154.008274,1.6316144 C154.100832,0.634482902 154.887576,-0.125236334 155.859436,0.0172110229 C160.996414,0.444553093 168.447344,2.48629854 168.725019,2.58126344 C169.6506,2.8186757 170.205949,3.8158072 169.928275,4.76545624 C169.743158,5.47769303 169.048972,6 168.308507,6 Z" />
                <path d="M136.736216,20 C135.998092,20 135.3061,19.5289768 135.075436,18.7753396 C134.798639,17.8332931 135.3061,16.8441443 136.228755,16.5615304 C141.164963,15.0071537 148.73074,14.0651072 149.053669,14.0180049 C149.976325,13.8766979 150.852848,14.5832328 150.991246,15.5723816 C151.083512,16.5615304 150.437653,17.4093722 149.468864,17.5506792 C149.376599,17.5506792 141.856955,18.4927256 137.243677,19.9528977 C137.105278,19.9528977 136.920747,20 136.736216,20 Z" />
                <path d="M113.713453,12 C112.930424,12 112.239517,11.5305932 112.055275,10.8051462 C111.824972,9.95167923 112.331638,9.0555389 113.252848,8.84217215 C118.227382,7.60464503 125.827365,7.04989148 126.149789,7.00721814 C127.117059,6.92187144 127.946148,7.60464503 127.992209,8.45811201 C128.08433,9.35425235 127.347362,10.1223726 126.426152,10.165046 C126.334031,10.165046 118.826169,10.7197995 114.174058,11.9146533 C113.989816,11.9573267 113.851634,12 113.713453,12 Z" />
                <path d="M76.7140546,6 C75.9307511,6 75.239601,5.53059316 75.0552943,4.80514622 C74.8249109,3.95167923 75.3317543,3.0555389 76.2532879,2.84217215 C81.2295689,1.60464503 88.8322206,1.04989148 89.1547574,1.00721814 C90.1223676,0.921871437 90.9517478,1.60464503 90.9978244,2.45811201 C91.0439011,3.311579 90.352751,4.12237263 89.4312174,4.16504598 C89.3390641,4.16504598 81.8285657,4.71979952 77.1748214,5.9146533 C77.0365914,6 76.8522847,6 76.7140546,6 Z" />
                <path d="M46.713453,13 C45.9304244,13 45.2395169,12.5301042 45.0552748,11.8039015 C44.8249723,10.9495454 45.3316379,10.0524715 46.2528479,9.83888253 C51.2273823,8.60006622 58.8273653,8.04473478 59.1497888,8.00201697 C60.0709989,7.95929917 60.9461484,8.60006622 60.9922089,9.4544223 C61.0843299,10.3514962 60.3473619,11.1204166 59.4261518,11.1631344 C59.3340308,11.1631344 51.8261688,11.7184659 47.174058,12.9145644 C47.0358765,13 46.8516345,13 46.713453,13 Z" />
              </g>
            </svg>
          </div>

          {/* Lion Illustration - Bottom Right */}
          <div className="absolute bottom-8 md:bottom-10 right-8 md:right-24 lg:right-0 w-32 md:w-40 opacity-90 animate-fadeIn hidden md:block translate-x-animation  z-0">
            <img
              src="https://debebe.vamtam.com/wp-content/uploads/2022/03/lion.svg"
              alt="Lion illustration"
              className="w-full h-auto"
            />
          </div>

          {/* <div
            className="absolute bottom-8 md:bottom-10 right-8 md:right-24 lg:right-0 
                w-32 md:w-40 opacity-90 hidden md:block z-0
               "
          >
            <img
              src="https://debebe.vamtam.com/wp-content/uploads/2022/03/lion.svg"
              alt="Lion"
              className="w-full h-auto"
            />
          </div> */}

          {/* Cloud Element - Top Left */}
          <div className="absolute top-8 md:top-10 left-2/3 md:left-2/5 lg:left-2/6 w-20 md:w-24 opacity-70 animate-fadeIn translate-x-left-slow z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 94 42"
              className="w-full h-auto"
            >
              <g fill="#0A1E33" fillRule="nonzero">
                <path d="M23.11112,42 C8.980247,42 1.789282,39.643859 0.480204,34.592435 C-0.577819,30.504887 0.121552,26.577986 2.488653,23.543561 C4.532967,20.919677 7.617371,19.277518 10.522449,19.277518 C11.347347,19.277518 12.118448,19.402465 12.835751,19.652359 C15.149054,15.422014 18.825233,10.674033 23.541502,10.674033 C24.061547,10.674033 24.581591,10.727582 25.101636,10.852529 C27.253546,4.087548 32.113275,1.963451 38.89179,4.980025 C41.240958,6.033149 43.285273,7.068423 44.970935,8.085848 C46.692463,4.051849 50.386574,0 55.927742,0 C57.452011,0 59.065943,0.303442 60.71574,0.910327 C64.732638,2.39184 67.709447,4.640884 69.395109,7.461113 C71.403558,7.407565 73.340277,8.40714 75.259063,10.40629 C79.024905,14.333192 81.91205,18.777731 83.292859,22.704632 C86.269667,21.348066 89.372004,21.937102 91.774969,24.40034 C94.339328,27.042074 94.231733,29.237569 93.675823,30.611985 C91.810834,35.288568 81.822387,38.447939 66.992144,39.090523 C62.508998,39.286868 56.967831,39.768806 51.12181,40.286443 C42.101722,41.089673 31.862219,42 23.11112,42 Z" />
              </g>
            </svg>
          </div>

          {/* Sun Element - Top Left Quarter */}
          <div className="absolute top-8 md:top-12 left-3/5 w-20 md:w-28 opacity-80 animate-fadeIn rotate-animation hidden lg:block z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 114 112"
              className="w-full h-auto"
            >
              <g fill="#EECE78" fillRule="nonzero">
                <circle cx="56" cy="57" r="36" />
                <path d="M72.8708967,19 C72.7330826,19 72.5952686,18.9776091 72.4574545,18.9104366 C72.0440124,18.6865279 71.8832293,18.193929 72.0899504,17.7685026 L79.3711261,4.44594005 C79.6008161,4.04290454 80.1061343,3.88616851 80.5425455,4.08768627 C80.9559876,4.31159488 81.1167707,4.80419383 80.9100496,5.2296202 L73.6288739,18.5521828 C73.4910599,18.843264 73.1924628,19 72.8708967,19 Z" />
                <path d="M65.6646091,16 C65.6122408,16 65.5598725,16 65.5075043,15.9781144 C65.1583824,15.8686862 64.9314533,15.4309735 65.0187337,14.9932609 L67.7069717,0.6362852 C67.7942521,0.198572527 68.1259178,-0.0859407099 68.4924957,0.0234874582 C68.8416176,0.132915626 69.0685467,0.570628299 68.9812663,1.00834097 L66.2930283,15.3653166 C66.223204,15.7373724 65.9613626,16 65.6646091,16 Z" />
              </g>
            </svg>
          </div>

          {/* Cloud Element - Bottom Left */}
          <div className="absolute bottom-32 md:bottom-40 left-2/4 md:left-2/4 lg:left-2/6 w-16 md:w-20 opacity-60 animate-fadeIn hidden md:block z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 94 42"
              className="w-full h-auto"
            >
              <g fill="#0A1E33" fillRule="nonzero">
                <path d="M23.11112,42 C8.980247,42 1.789282,39.643859 0.480204,34.592435 C-0.577819,30.504887 0.121552,26.577986 2.488653,23.543561 C4.532967,20.919677 7.617371,19.277518 10.522449,19.277518 C11.347347,19.277518 12.118448,19.402465 12.835751,19.652359 C15.149054,15.422014 18.825233,10.674033 23.541502,10.674033 C24.061547,10.674033 24.581591,10.727582 25.101636,10.852529 C27.253546,4.087548 32.113275,1.963451 38.89179,4.980025 C41.240958,6.033149 43.285273,7.068423 44.970935,8.085848 C46.692463,4.051849 50.386574,0 55.927742,0 C57.452011,0 59.065943,0.303442 60.71574,0.910327 C64.732638,2.39184 67.709447,4.640884 69.395109,7.461113 C71.403558,7.407565 73.340277,8.40714 75.259063,10.40629 C79.024905,14.333192 81.91205,18.777731 83.292859,22.704632 C86.269667,21.348066 89.372004,21.937102 91.774969,24.40034 C94.339328,27.042074 94.231733,29.237569 93.675823,30.611985 C91.810834,35.288568 81.822387,38.447939 66.992144,39.090523 C62.508998,39.286868 56.967831,39.768806 51.12181,40.286443 C42.101722,41.089673 31.862219,42 23.11112,42 Z" />
              </g>
            </svg>
          </div>

          {/* Product Tag - Bottom Right - Using original SVG as background */}
          <a
            href="/product/night-t-shirt-denim/"
            className="absolute top-24 md:top-32 right-8 md:right-20 lg:right-32 w-40 md:w-42 h-40 md:h-42 hover:scale-105 transition-all duration-300 hidden md:flex items-center justify-center group z-0"
            style={{
              backgroundImage:
                "url(https://debebe.vamtam.com/wp-content/uploads/2022/03/tag.svg)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center px-6 group-hover:scale-110 transition-transform duration-300">
              <h3 className="text-xs md:text-sm font-semibold text-[#ffffff] mb-1">
                T-shirt blue stripes
              </h3>
              <p className="text-base md:text-lg font-bold text-[#ffffff]">
                $32.00
              </p>
            </div>
          </a>
        </div>
      </div>
      <section className="w-full -mt-1 md:-mt-30 opacity-91 overflow-hidden">
        <div className="w-full h-[50px] md:h-[100px]">
          <img
            src="/herosection/Floor-white-1.svg"
            alt="Lion illustration"
            className=" w-full h-full object-cover object-top"
          />
        </div>
      </section>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out 0.1s both;
        }

        .animate-bounceIn {
          animation: bounceIn 1s ease-out 0.8s both;
        }

        .scale-animation {
          animation: scaleEffect 3s ease-in-out infinite;
        }

        @keyframes scaleEffect {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.96);
          }
        }

        .rotate-animation {
          animation: rotateEffect 20s linear infinite;
        }

        @keyframes rotateEffect {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .translate-x-animation {
          animation: translateX 3s ease-in-out infinite;
        }

        @keyframes translateX {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(12px);
          }
        }

        .translate-x-left-slow {
          animation: translateXLeftSlow 3s ease-in-out infinite;
        }

        @keyframes translateXLeftSlow {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-8px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
