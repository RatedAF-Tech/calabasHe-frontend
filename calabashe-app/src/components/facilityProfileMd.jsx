import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import StarRating from "./ratingStars";
import "../stylesheets/profile.css";
import formatDate from "../utils/dateConversion";
import Stars from "./Star";
import { FaPhoneAlt } from "react-icons/fa";
import { toast } from "sonner";
import HandleAdjective from "../utils/handleRatingAdjective";
import HospitalIcon from '../assets/icons/hospital-icon.svg'

// eslint-disable-next-line react/prop-types
const FacilityProfileMd = ({ facility = [] }) => {
  const [rating, setRating] = useState();
  const { isLoggedIn } = useAuth();


  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <>
      <main className="w-full hidden md:block py-12 2xl:border-x">
        <section className="px-16 lg:px-[100px] pt-12 pb-6 flex gap-6 lg:gap-8 items-center bg-white">
        <div className="relative size-36 lg:size-44 rounded-full mr-2 xl:mr-0 bg-gray-300/40 flex items-center justify-center">
          {
            facility.logo ?
            <img className='object-cover shadow-md w-full h-full rounded-[inherit]' src={facility.logo} alt={`image of ${facility.name}`}/>
            :
            <img className='size-16 lg:size-24' src={HospitalIcon} alt='default facility icon' />
          }
          </div>

          <div className="space-y-1">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold">{facility.name}</h2>
              <p className="font-light text-sm lg:text-base">{facility.type}</p>
            </div>
            <div className="flex font-semibold text-[#6A6A67] items-center gap-3 lg:gap-4">
              <p className="font-medium">
                {" "}
                {facility.totalReviews > 0 ? facility.totalReviews : 'No' } {facility.totalReviews > 1 ? 'reviews' : 'review'}
              </p>
              <div className="w-2 h-2 rounded-full bg-[#6A6A67]"></div>
              <p className="">{HandleAdjective(facility.rating)}</p>
            </div>
            <div className="flex items-center gap-3">
              <StarRating rating={facility.rating} />
              <p className="text-[#6A6A67]">{facility.rating.toFixed(1)}</p>
            </div>
          </div>
        </section>

        <section className="w-full  px-16 lg:px-[100px] pt-12 lg:pt-24 flex gap-2 lg:gap-4">
          <section className="flex max-w-[57%] flex-col gap-3 lg:gap-4 grow">
            <div className="bg-white border w-full p-2 lg:p-4 pl-4 flex items-center justify-between rounded-lg">
              <div className="flex items-center gap-2 lg:gap-4">
                <div className="w-8 lg:w-12 h-8 lg:h-12 bg-gray-300/40 rounded-full"></div>

                <Link
                  to={`/review/${facility.slug}`}
                  state={{
                    message: [facility.name, "facility", facility.id],
                    from: `/review/${facility.slug}`,
                  }}
                  className="text-xs lg:text-sm font-[600] text-[#205CD4]"
                >
                  Write a review
                </Link>
              </div>
              <Link
                to={`/review/${facility.slug}`}
                state={{
                  message: [facility.name, "facility", facility.id],
                  from: `/review/${facility.slug}`,
                }}
              >
                <Stars rating={rating} onRatingChange={handleRatingChange} />
              </Link>
            </div>

            <section className="w-full py-4 lg:py-6 pb-6 lg:pb-8 px-4 rounded-lg border bg-white space-y-4 lg:space-y-6">
              <h3 className="text-base lg:text-lg font-bold"> Ratings</h3>
              <div className="space-y-6">
                <p className="text-4xl md:text-5xl font-black">
                  {facility.rating.toFixed(1)}
                </p>
                <StarRating profile={true} rating={facility.rating} />
                <p className="text-lg md:font-medium text-black">
                  {facility.totalReviews}{" "}
                  {facility.totalReviews < 2 ? "review" : "reviews"}
                </p>
                <ul className="pr-6 space-y-3">
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <li
                      key={star}
                      className="text-base md:text-lg lg:text-xl font-light grid grid-cols-[2.5rem_1fr_3rem] items-center gap-4"
                    >
                      <label
                        htmlFor={`${star}star`}
                        className="whitespace-nowrap"
                      >
                        {star} star
                      </label>
                      <div className="w-full pl-1 flex items-center justify-center ">
                        <progress
                          id={`${star}star`}
                          value={facility.ratingPercentages[index].percentage}
                          max="100"
                          className=" max-w-[430px] ml-[5%] h-3 md:h-4"
                        ></progress>
                      </div>
                      <p className="text-[#A0AAB3] text-right font-normal">
                        {facility.ratingPercentages[index].percentage}%
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="w-full ">
              <div className="w-full flex flex-col gap-2 ">
                {facility.reviews.slice(0, 4).map((review) => (
                 
                  <div
                    key={review.id}
                    className="w-full bg-white border shadow-md px-4 py-6 flex flex-col gap-4 rounded-lg "
                  >
                    <div className="flex justify-between items-center ">
                      <StarRating rating={review.rating} />
                      <p className="text-xs text-[#333333] opacity-50">
                        {formatDate(review.created_at.split("T")[0])}
                      </p>
                    </div>

                    <p className="text-sm lg:text-base ">{review.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>

          {/* Right Side */}

          <section className="w-[46%] space-y-3 lg:space-y-4">
            <div className="space-y-3 bg-white border pt-8 lg:py-12 pb-4 px-4 lg:px-8 rounded-xl">
              <section className="pb-8 lg:pb-14  border-b-2 space-y-3 lg:space-y-5">
                <h3 className="text-lg lg:text-xl font-[800] ">
                  {facility.name}
                </h3>
                <p className="text-sm lg:text-base ">
                  {facility.description ? facility.description : 
                   <span>
                    {facility.name} is a {facility.type.toLowerCase()} located at {facility.location} in the {facility.region}.<br/><br/>
                    At {facility.name}, personalised care is provided, tailored to each patient&apos;s unique circumstances to ensure the highest quality of service and support.
                    {facility.name} offers welcoming and modern environment designed to make patients feel comfortable and relaxed. 
                    <br/><br/>                
                    The staff is dedicated to fostering a culture of kindness and openness, maintaining the highest standards of care through continual training and auditing.
                    {facility.name} looks forward to welcoming patients, where their health and happiness are the top priorities.
                    </span>
                   }
                </p>
              </section>

              <section className="w-full space-y-4 pt-8 lg:pt-12">
                <h3 className="text-xl lg:2xl font-bold">
                  Contact Details
                </h3>
                <div className="flex flex-col gap-4 text-[#205CD4]">
                  { facility.contact && 
                    <div className="flex gap-4 ">
                      <aside className="relative inline-block">
                        <FaPhoneAlt size={24} />
                        <span className="absolute text-[14px] -top-[5px] -right-[5px] font-bold">
                          +
                        </span>
                      </aside>
                      <a
                        href={`tel: ${facility.contact}`}
                        className="text-base text-black self-center font-medium"
                      >
                        {facility.contact}
                      </a>
                    </div>
                  }
                  <div className="flex gap-3">
                    <svg
                      width="21"
                      height="25"
                      viewBox="0 0 21 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.0482 3.63002C14.1432 -0.211228 7.81198 -0.211228 3.90698 3.63002C2.97984 4.53582 2.24312 5.61781 1.74013 6.81241C1.23714 8.00701 0.978027 9.2901 0.978027 10.5863C0.978027 11.8824 1.23714 13.1655 1.74013 14.3601C2.24312 15.5547 2.97984 16.6367 3.90698 17.5425L10.977 24.4988L18.0482 17.5425C18.9754 16.6367 19.7121 15.5547 20.2151 14.3601C20.7181 13.1655 20.9772 11.8824 20.9772 10.5863C20.9772 9.2901 20.7181 8.00701 20.2151 6.81241C19.7121 5.61781 18.9754 4.53582 18.0482 3.63002ZM10.977 13.8738C10.142 13.8738 9.35823 13.5488 8.76698 12.9588C8.18167 12.3722 7.85295 11.5774 7.85295 10.7488C7.85295 9.92013 8.18167 9.12533 8.76698 8.53877C9.35698 7.94877 10.142 7.62377 10.977 7.62377C11.812 7.62377 12.597 7.94877 13.187 8.53877C13.7723 9.12533 14.101 9.92013 14.101 10.7488C14.101 11.5774 13.7723 12.3722 13.187 12.9588C12.597 13.5488 11.812 13.8738 10.977 13.8738Z"
                        fill="#205CD4"
                      />
                    </svg>
                    <p className="text-sm text-black lg:text-base self-center font-normal">
                      {facility.location} - {facility.region}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="bg-white border flex flex-col gap-4 lg:gap-6 pt-8 lg:pt-12  pb-4 lg:pb-6 px-4 lg:px-8 rounded-xl">
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-xl lg:2xl font-bold">
                  Share your experience
                </h3>
                <p className="text-sm lg:text-base">
                  We value your feedback and look forward to hearing about your
                  experiences with our services. Your insights help us improve
                  and provide the best care possible.
                </p>
              </div>

              <Link
                to={`/review/${facility.slug}`}
                state={{
                  message: [facility.name, "facility", facility.id],
                  from: `/review/${facility.slug}`,
                }}
                className="w-full  hover:scale-[1.01] duration-100"
              >
                <button
                  className="w-full mt-4 flex items-center justify-center gap-2 text-lg font-bold bg-[#FEE330] px-2 py-3 rounded-md"
                  aria-label={`Leave a review for ${facility.slug}`}
                >
                  <p className="text-center text-lg lg:text-xl font-bold">
                    Leave a Review
                  </p>
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27 0.968994H3C1.35 0.968994 0 2.31899 0 3.96899V30.969L6 24.969H27C28.65 24.969 30 23.619 30 21.969V3.96899C30 2.31899 28.65 0.968994 27 0.968994ZM6 18.969V15.264L16.32 4.94399C16.62 4.64399 17.085 4.64399 17.385 4.94399L20.04 7.59899C20.34 7.89899 20.34 8.36399 20.04 8.66399L9.705 18.969H6ZM22.5 18.969H12.75L15.75 15.969H22.5C23.325 15.969 24 16.644 24 17.469C24 18.294 23.325 18.969 22.5 18.969Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default FacilityProfileMd;
