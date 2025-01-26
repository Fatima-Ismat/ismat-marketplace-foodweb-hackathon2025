import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[url('/footerbg.png')] bg-no-repeat bg-right z-10">
      <div className={`bg-[#0D0D0DF2] text-[#FFF] font-inter`}>
        <div className="max-w-[1320px] px-[20px] sm:px-[60px] mx-auto">
          <div className="max-w-[1170px] mx-auto flex flex-col gap-[30px] lg:gap-0 lg:flex-row justify-between items-center py-[50px] border-b-[1px] border-b-[#FF9F0D]">
            <div className="flex flex-col">
              <h3 className="font-helvetica text-[32px] font-bold">
                <span className="text-[#FF9F0D]">St</span>ill You Need Our
                Support ?
              </h3>
              <p className="m-0 font-inter text-[16px] font-normal">
                Do not wait make a smart & logical quote here. It's pretty easy.
              </p>
            </div>
            <form action="" className="font-normal flex flex-col lg:flex-row">
              <input
                className="p-3 rounded-tl-[4px] rounded-bl-[4px] bg-[#FF9F0D] font-inter text-white placeholder-[#FFF] placeholder-opacity-60"
                type="text"
                placeholder="Enter Your Email"
              />
              <button
                type="submit"
                className="bg-white p-3 rounded-[4px] text-[#FF9F0D]"
              >
                Subscribe Now
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center items-center">
            <div className="flex flex-col gap-[20px] text-white p-4 rounded">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="font-bold text-[24px]"
              >
                About Us.
              </h3>
              <p className="m-0 font-inter font-normal text-[16px]">
                Corporate clients and leisure travelers have been relying on
                Groundlink for dependable, safe, and professional chauffeured
                car service in major cities across the world.
              </p>
              <div className="flex items-center gap-[10px]">
                <div className="bg-[#FF9F0D] px-4 py-3 rounded-[4px]">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div className="flex flex-col font-inter font-normal">
                  <h4 className="text-[18px]">Opening Hours</h4>
                  <p className="m-0 text-[14px]">Mon - Sat (8.00 - 6.00)</p>
                  <p className="m-0 text-[14px]">Sunday - Closed</p>
                </div>
              </div>
            </div>
            <div className="w-[100%] flex flex-col gap-[20px] text-white p-4 rounded">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="font-bold text-[24px]"
              >
                Useful Links
              </h3>
              <ul className="flex flex-col gap-[20px] font-inter text-[20px] font-normal">
                <li>
                  <Link href="">About</Link>
                </li>
                <li>
                  <Link href="">News</Link>
                </li>
                <li>
                  <Link href="">Partners</Link>
                </li>
                <li>
                  <Link href="">Team</Link>
                </li>
                <li>
                  <Link href="">Menu</Link>
                </li>
                <li>
                  <Link href="">Contacts</Link>
                </li>
              </ul>
            </div>
            <div className="w-[100%] flex flex-col gap-[20px] text-white p-4 rounded">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="font-bold text-[24px]"
              >
                Help ?
              </h3>
              <ul className="flex flex-col gap-[20px] font-inter text-[20px] font-normal">
                <li>
                  <Link href="">FAQ</Link>
                </li>
                <li>
                  <Link href="">Term & Conditions</Link>
                </li>
                <li>
                  <Link href="">Reporting</Link>
                </li>
                <li>
                  <Link href="">Documentation</Link>
                </li>
                <li>
                  <Link href="">Support Policy</Link>
                </li>
                <li>
                  <Link href="">Privacy</Link>
                </li>
              </ul>
            </div>
            <div className="w-[100%] col-span-full lg:col-span-1 flex flex-col gap-[20px] text-white p-4 rounded">
              <h3
                style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                className="font-bold text-[24px]"
              >
                Recent Post
              </h3>

              <div className="flex flex-col gap-[20px]">
                <Link href="" className="flex gap-[20px]">
                  <div className="w-[55px] h-[55px]">
                    <Image
                      src="/footerimg.png"
                      className="w-[100%] h-[100%]"
                      alt="Post Thumbnail"
                      width={55}
                      height={55}
                    />
                  </div>
                  <div className="font-inter font-normal">
                    <p className="m-0 text-[16px]">20 Feb 2022</p>
                    <p className="text-[18px]">Keep Your Business</p>
                  </div>
                </Link>
                <Link href="" className="flex gap-[20px]">
                  <div className="w-[55px] h-[55px]">
                    <Image
                      src="/footerimg.png"
                      className="w-[100%] h-[100%]"
                      alt="Post Thumbnail"
                      width={55}
                      height={55}
                    />
                  </div>
                  <div className="font-inter font-normal">
                    <p className="m-0 text-[16px]">20 Dec 2024</p>
                    <p className="text-[18px]">Keep Your Business</p>
                  </div>
                </Link>
                <Link href="" className="flex gap-[20px]">
                  <div className="w-[55px] h-[55px]">
                    <Image
                      src="/footerimg.png"
                      className="w-[100%] h-[100%]"
                      alt="Post Thumbnail"
                      width={55}
                      height={55}
                    />
                  </div>
                  <div className="font-inter font-normal">
                    <p className="m-0 text-[16px]">20 Dec 2024</p>
                    <p className="text-[18px]">Keep Your Business</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-[#4F4F4F] text-white font-inter`}>
        <div className="max-w-[1320px] px-[20px] sm:px-[60px] py-[20px] lg:h-[100px] mx-auto flex-col lg:flex-row flex justify-between items-center">
          <p className="m-0 font-normal text-[16px] text-center">
            Copyright © 2024 by Ismat Fatima. All Rights Reserved.
          </p>
          <div className="flex gap-[20px]">
            <Link href="">
              <i className="bi bi-facebook"></i>
            </Link>
            <Link href="">
              <i className="bi bi-twitter"></i>
            </Link>
            <Link href="">
              <i className="bi bi-instagram"></i>
            </Link>
            <Link href="">
              <i className="bi bi-youtube"></i>
            </Link>
            <Link href="">
              <i className="bi bi-pinterest"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
