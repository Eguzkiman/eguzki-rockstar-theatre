import { useCallback } from "react";

export interface StarRatingProps {
  currentRating: number;
  onRatingChange?: (newRating: number) => void;
}

export default function StarRating(props: StarRatingProps) {
  const { currentRating, onRatingChange } = props;

  const handleRatingChange = useCallback(
    (newRating: number) => {
      if (newRating === currentRating) onRatingChange?.(0);
      else onRatingChange?.(newRating);
    },
    [currentRating, onRatingChange]
  );

  return (
    <div className="flex justify-center items-center">
      <div className="text-yellow-400"></div>
      <div className="flex items-center">
        <SingleStar
          isSelected={currentRating >= 1}
          onSelect={() => handleRatingChange(1)}
        />
        <SingleStar
          isSelected={currentRating >= 2}
          onSelect={() => handleRatingChange(2)}
        />
        <SingleStar
          isSelected={currentRating >= 3}
          onSelect={() => handleRatingChange(3)}
        />
        <SingleStar
          isSelected={currentRating >= 4}
          onSelect={() => handleRatingChange(4)}
        />
        <SingleStar
          isSelected={currentRating >= 5}
          onSelect={() => handleRatingChange(5)}
        />
      </div>
    </div>
  );
}

export interface SingleStarProps {
  isSelected: boolean;
  onSelect?: () => void;
}

export function SingleStar(props: SingleStarProps) {
  const { isSelected, onSelect } = props;
  return (
    <svg
      className={`mx-1 w-4 h-4 fill-current ${
        onSelect ? "cursor-pointer" : ""
      } text-${isSelected ? "yellow" : "gray"}-400`}
      viewBox="0 0 20 20"
      onClick={onSelect} // TODO: Make this a button for accessibility
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
}
