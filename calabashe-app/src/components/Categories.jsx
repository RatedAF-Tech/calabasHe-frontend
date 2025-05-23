import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchDoctors,
  fetchFacilities,
  fetchServices,
  fetchReviewCount,
} from "../api/getCategoriesData";
import { getAvailableDoctors } from "../api/bookings";
import { FadeInRight } from "./ComponentAnimations";
import AnimateCount from "./AnimateCount";

const CategoryItem = ({ count, label, to, icon }) => (
  <Link
    to={to}
    className="w-full relative lg:hover:-translate-y-1 duration-150 lg:hover:shadow-xl ease-in-out flex items-center px-2 bg-white border border-gray-400 md:border-black rounded-md max-w-[191px] md:max-w-[250px] lg:max-w-[310px] h-[70px] md:h-[90px] lg:h-[110px]"
  >
    <div className="flex flex-col gap-[1px]">
      <p className="font-semibold text-sm md:text-base">
        <AnimateCount end={parseInt(count, 10)} />
      </p>
      <p className="font-medium text-xs md:text-sm">{label}</p>
    </div>
    {icon}
  </Link>
);

const ExploreCategories = () => {
  const [counts, setCounts] = useState({
    doctors: "0",
    reviews: "0",
    facilities: "0",
    services: "0",
    availableCount: "0"
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetches the cached data from localStorage
        const cachedCounts = localStorage.getItem("categoryCounts");
        if (cachedCounts) {
          setCounts(JSON.parse(cachedCounts));
        }

        // Fetch the new data from the api
        const [doctorsCount, facilitiesCount, servicesCount, reviewsCount, availableCount] =
          await Promise.all([
            fetchDoctors(),
            fetchFacilities(),
            fetchServices(),
            fetchReviewCount(),
            getAvailableDoctors()
          ]);

        const newCounts = {
          doctors: doctorsCount.total_doctors,
          facilities: facilitiesCount.total_count,
          services: servicesCount.count,
          reviews: reviewsCount,
          availableCount: availableCount.length
        };

        // console.log(newCounts)
        // Updates the localStorage periodically(every 20 seconds) with new data
        localStorage.setItem("categoryCounts", JSON.stringify(newCounts));
        setCounts(newCounts);
      } catch (error) {
        // throw error;
        // console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();

    const intervalId = setInterval(fetchCounts, 600000);

    return () => clearInterval(intervalId);
  }, []);

  const reviewIcon = (
    <svg
      className="absolute hidden lg:block bottom-0 right-0 fill-current text-gray-300"
      width="126"
      height="89"
      viewBox="0 0 126 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M34.5 67.7597C34.5 73.2825 38.9771 77.7597 44.5 77.7597H57.07C59.247 77.7597 61.3646 77.0492 63.1011 75.7362L102.925 45.6248C104.2 44.6607 105.158 43.5617 105.798 42.3278C106.438 41.0938 106.756 39.8898 106.75 38.7158C106.744 37.5418 106.39 36.3914 105.687 35.2645C104.985 34.1376 104.064 33.0922 102.925 32.1281L95.275 26.0225C94 25.0585 92.5833 24.3365 91.025 23.8566C89.4667 23.3767 87.8375 23.1346 86.1375 23.1304C84.5792 23.1304 82.9868 23.3724 81.3605 23.8566C79.7342 24.3408 78.2807 25.0627 77 26.0225L38.4688 55.1565C35.9691 57.0466 34.5 59.9992 34.5 63.133V67.7597ZM51.327 68.1192C49.0754 68.1192 47.25 66.2939 47.25 64.0422C47.25 62.7645 47.849 61.5607 48.8681 60.7901L68.7125 45.7855L72.9625 48.6776L76.7875 51.8911L56.9431 66.8958C55.8931 67.6897 54.6127 68.1192 53.2964 68.1192H51.327ZM72.9625 48.6776L76.7875 51.8911L68.7125 45.7855L72.9625 48.6776ZM93.7675 66.2062C88.851 69.9237 91.48 77.7597 97.6438 77.7597H130.073C133.623 77.7597 136.5 74.8822 136.5 71.3327C136.5 67.7832 133.623 64.9057 130.073 64.9057H97.6438C96.2446 64.9057 94.8836 65.3623 93.7675 66.2062ZM16.5312 117.054C9.9438 122.035 0.5 117.336 0.5 109.078V13.4899C0.5 9.95505 2.166 6.93008 5.498 4.41499C8.83 1.8999 12.8307 0.64021 17.5 0.635925H153.5C158.175 0.635925 162.178 1.89561 165.51 4.41499C168.842 6.93437 170.506 9.95933 170.5 13.4899V90.6137C170.5 94.1485 168.837 97.1756 165.51 99.695C162.184 102.214 158.181 103.472 153.5 103.468H37.855C35.678 103.468 33.5604 104.178 31.8239 105.491L16.5312 117.054ZM25.882 91.6441C26.7867 90.9748 27.8823 90.6137 29.0077 90.6137H143.5C149.023 90.6137 153.5 86.1365 153.5 80.6137V23.4899C153.5 17.967 149.023 13.4899 143.5 13.4899H17.5V87.4183C17.5 91.7336 22.4126 94.2103 25.882 91.6441Z"
        fill="#d1d5db"
      />
    </svg>
  );
  const facilitiesIcon = (
    <svg
      className="absolute hidden lg:block bottom-0 right-0 fill-current text-gray-300"
      width="125"
      height="99"
      viewBox="0 0 125 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M84.5441 2.05307C83.8158 1.54356 82.9507 1.13934 81.9984 0.86355C81.0462 0.587757 80.0253 0.445801 78.9944 0.445801C77.9635 0.445801 76.9427 0.587757 75.9904 0.86355C75.0382 1.13934 74.1731 1.54356 73.4448 2.05307L2.79826 51.3891C1.70081 52.1557 0.95348 53.1324 0.65074 54.1956C0.348 55.2588 0.503446 56.3608 1.09743 57.3623C1.69141 58.3639 2.69725 59.2199 3.9878 59.8223C5.27836 60.4246 6.79567 60.7463 8.34794 60.7465H16.1975V99.119C16.1975 105.165 23.2386 110.083 31.8968 110.083H126.092C134.75 110.083 141.791 105.165 141.791 99.119V60.7465H149.641C151.195 60.7489 152.715 60.4288 154.008 59.8269C155.301 59.225 156.309 58.3684 156.903 57.3657C157.498 56.3631 157.652 55.2598 157.348 54.1957C157.043 53.1316 156.292 52.1547 155.191 51.3891L84.5441 2.05307ZM126.1 99.119H31.8968V46.5706L78.9944 13.6799L126.092 46.5706V71.7101L126.1 99.119Z"
        fill="#d1d5db"
      />
      <path
        opacity="0.5"
        d="M91.75 45.1776H77.25V61.6231H55.5V72.5868H77.25V89.0323H91.75V72.5868H113.5V61.6231H91.75V45.1776Z"
        fill="#d1d5db"
      />
    </svg>
  );
  const doctorsIcon = (
    <svg
      className="absolute hidden lg:block bottom-0 right-0 fill-current text-gray-300"
      width="113"
      height="93"
      viewBox="0 0 113 93"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M140.761 99.0393C140.761 99.0393 150.136 99.0393 150.136 90.8165C150.136 82.5938 140.761 57.9255 103.261 57.9255C65.7612 57.9255 56.3862 82.5938 56.3862 90.8165C56.3862 99.0393 65.7612 99.0393 65.7612 99.0393H140.761ZM65.9675 90.8165L65.7612 90.7836C65.7706 88.6128 67.3269 82.3142 72.8862 76.6405C78.0612 71.3204 87.155 66.1482 103.261 66.1482C119.358 66.1482 128.452 71.3286 133.636 76.6405C139.196 82.3142 140.742 88.621 140.761 90.7836L140.686 90.8001L140.555 90.8165H65.9675ZM103.261 41.48C108.234 41.48 113.003 39.7473 116.519 36.6632C120.036 33.5791 122.011 29.3961 122.011 25.0345C122.011 20.6729 120.036 16.4899 116.519 13.4057C113.003 10.3216 108.234 8.58897 103.261 8.58897C98.2884 8.58897 93.5193 10.3216 90.003 13.4057C86.4867 16.4899 84.5112 20.6729 84.5112 25.0345C84.5112 29.3961 86.4867 33.5791 90.003 36.6632C93.5193 39.7473 98.2884 41.48 103.261 41.48ZM131.386 25.0345C131.386 28.274 130.659 31.4817 129.245 34.4746C127.832 37.4675 125.76 40.1869 123.149 42.4776C120.537 44.7682 117.436 46.5853 114.024 47.825C110.612 49.0647 106.955 49.7027 103.261 49.7027C99.5678 49.7027 95.9105 49.0647 92.4983 47.825C89.086 46.5853 85.9855 44.7682 83.3738 42.4776C80.7622 40.1869 78.6905 37.4675 77.2771 34.4746C75.8637 31.4817 75.1362 28.274 75.1362 25.0345C75.1362 18.492 78.0994 12.2176 83.3738 7.59138C88.6483 2.96518 95.802 0.366211 103.261 0.366211C110.72 0.366211 117.874 2.96518 123.149 7.59138C128.423 12.2176 131.386 18.492 131.386 25.0345ZM65.1612 60.2279C61.409 59.1993 57.5441 58.5186 53.63 58.1968C51.4303 58.0087 49.2213 57.9181 47.0112 57.9255C9.51123 57.9255 0.13623 82.5938 0.13623 90.8165C0.13623 96.2983 3.26123 99.0393 9.51123 99.0393H49.0362C47.6471 96.4721 46.954 93.6577 47.0112 90.8165C47.0112 82.5115 50.5456 74.0256 57.23 66.9376C59.5081 64.5201 62.1612 62.2589 65.1612 60.2279ZM46.2612 66.1482C40.7161 73.462 37.7192 82.0336 37.6362 90.8165H9.51123C9.51123 88.6786 11.0487 82.3471 16.6362 76.6405C21.7456 71.4108 30.6237 66.3127 46.2612 66.1565V66.1482ZM14.1987 29.1459C14.1987 22.6034 17.1619 16.329 22.4364 11.7028C27.7108 7.07656 34.8645 4.47759 42.3237 4.47759C49.7829 4.47759 56.9366 7.07656 62.2111 11.7028C67.4856 16.329 70.4487 22.6034 70.4487 29.1459C70.4487 35.6883 67.4856 41.9627 62.2111 46.5889C56.9366 51.2151 49.7829 53.8141 42.3237 53.8141C34.8645 53.8141 27.7108 51.2151 22.4364 46.5889C17.1619 41.9627 14.1987 35.6883 14.1987 29.1459ZM42.3237 12.7003C37.3509 12.7003 32.5818 14.433 29.0655 17.5171C25.5492 20.6013 23.5737 24.7842 23.5737 29.1459C23.5737 33.5075 25.5492 37.6905 29.0655 40.7746C32.5818 43.8587 37.3509 45.5914 42.3237 45.5914C47.2965 45.5914 52.0657 43.8587 55.582 40.7746C59.0983 37.6905 61.0737 33.5075 61.0737 29.1459C61.0737 24.7842 59.0983 20.6013 55.582 17.5171C52.0657 14.433 47.2965 12.7003 42.3237 12.7003Z"
        fill="#d1d5db"
      />
    </svg>
  );
  // const servicesIcon = (
  //   <svg
  //     className="absolute hidden lg:block bottom-0 right-0 fill-current text-gray-300"
  //     width="109"
  //     height="99"
  //     viewBox="0 0 109 99"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       opacity="0.4"
  //       d="M37.6362 140.233H112.636V123.787H37.6362V140.233ZM37.6362 115.564H112.636V99.1188H37.6362V115.564ZM75.1362 85.1402C85.4487 76.9174 94.2768 69.6211 101.621 63.2512C108.964 56.8813 112.636 50.1989 112.636 43.2041C112.636 38.2705 110.605 34.022 106.542 30.4589C102.48 26.8957 97.6362 25.1141 92.0112 25.1141C88.73 25.1141 85.5643 25.6979 82.5143 26.8655C79.4643 28.0331 77.005 29.6421 75.1362 31.6923C73.2612 29.6366 70.7987 28.0277 67.7487 26.8655C64.6987 25.7034 61.5362 25.1195 58.2612 25.1141C52.6362 25.1141 47.7925 26.8957 43.73 30.4589C39.6675 34.022 37.6362 38.2705 37.6362 43.2041C37.6362 50.1935 41.1925 56.7717 48.305 62.9387C55.4175 69.1058 64.3612 76.5063 75.1362 85.1402ZM131.386 164.901H18.8862C13.73 164.901 9.31748 163.292 5.64873 160.074C1.97998 156.856 0.14248 152.983 0.13623 148.455V16.8913C0.13623 12.3688 1.97373 8.49862 5.64873 5.28078C9.32373 2.06294 13.7362 0.451283 18.8862 0.445801H131.386C136.542 0.445801 140.958 2.05746 144.633 5.28078C148.308 8.5041 150.142 12.3743 150.136 16.8913V148.455C150.136 152.978 148.302 156.851 144.633 160.074C140.964 163.297 136.549 164.906 131.386 164.901ZM18.8862 148.455H131.386V16.8913H18.8862V148.455Z"
  //       fill="#d1d5db"
  //     />
  //   </svg>
  // );
  const availableIcon = (
    <svg
      className="absolute hidden lg:block bottom-0 right-0 fill-current text-gray-300"
      width="109"
      height="99"
      viewBox="0 0 109 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M57.8362 73.2525L41.3362 56.7525L50.5862 47.5025L57.8362 54.7525L93.8362 18.7525L103.086 28.0025L57.8362 73.2525ZM18.8862 148.455H131.386V16.8913H18.8862V148.455ZM18.8862 164.901C13.73 164.901 9.31748 163.292 5.64873 160.074C1.97998 156.856 0.14248 152.983 0.13623 148.455V16.8913C0.13623 12.3688 1.97373 8.49862 5.64873 5.28078C9.32373 2.06294 13.7362 0.451283 18.8862 0.445801H131.386C136.542 0.445801 140.958 2.05746 144.633 5.28078C148.308 8.5041 150.142 12.3743 150.136 16.8913V148.455C150.136 152.978 148.302 156.851 144.633 160.074C140.964 163.297 136.549 164.906 131.386 164.901H18.8862Z"
        fill="#d1d5db"
      />
    </svg>
  );

  return (
    <FadeInRight>
      <section className="w-full flex flex-col gap-4 md:gap-6 lg:gap-10 p-2 py-3 lg:py-6 items-center mt-2 lg:mt-4">
        <h2 className="font-bold text-xl md:text-2xl">Explore Categories</h2>
        <div className="w-full max-w-[400px] md:max-w-[800px] lg:max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 lg:gap-6 xl:gap-8 px-2 lg:px-6">
            <CategoryItem
              count={counts.reviews}
              label="Reviews"
              to="#"
              icon={reviewIcon}
            />
            <CategoryItem
              count={counts.doctors}
              label="Doctors"
              to="/doctors"
              icon={doctorsIcon}
            />
            <CategoryItem
              count={counts.facilities}
              label="Facilities"
              to="/facilities"
              icon={facilitiesIcon}
            />

            <CategoryItem
              count={counts.availableCount}
              label={counts.availableCount == 1? "Available Doctor": "Available Doctors"}
              to="/available-doctors"
              icon={availableIcon}
            />
          </div>
        </div>
      </section>
    </FadeInRight>
  );
};

export default ExploreCategories;
