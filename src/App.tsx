import StarRating from "./StarRating.tsx";

export default function App() {
  return (
    <div className="flex h-screen w-screen bg-gray-950">
      <StarRating
        isHalfRatingEnabled={true}
        initialRating={0}
        starsLength={5}
        dimension={120}
      />
    </div>
  );
}
