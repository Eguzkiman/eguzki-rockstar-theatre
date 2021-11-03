import { useCallback, useEffect, useState } from "react";
import StarRating from "components/StarRating";

interface NavBarProps {
  searchValue: string;
  selectedStarRating: number;
  setSearchValue: (newValue: string) => void;
  setSelectedStarRating: (newValue: number) => void;
}

export default function NavBar(props: NavBarProps) {
  const {
    searchValue,
    setSearchValue,
    selectedStarRating,
    setSelectedStarRating,
  } = props;

  const [isTransparent, setIsTransparent] = useState(true);

  const handleScroll = useCallback(() => {
    const { scrollY } = window;
    setIsTransparent(scrollY < 250);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={`fixed h-16 w-full transition duration-500 z-40 ${
        isTransparent ? "bg-transparent" : "bg-gray-900"
      }`}
    >
      <div className="flex h-full justify-end items-center mx-16">
        <div className="inline-block my-auto">
          <input
            type="text"
            className="bg-transparent border border-white placeholder-white  rounded-full py-1 px-4"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            placeholder="Search movies"
          />
        </div>
        <div className="mr-4"/>
        <div>

        Filter by rating:
        </div>
        <div className="mr-2"/>
        <StarRating currentRating={selectedStarRating} onRatingChange={setSelectedStarRating}/>
      </div>
    </div>
  );
}
