import StarRating from "./StarRating.tsx";

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <StarRating
        color="#14DD07"
        isHalfRatingEnabled={true}
        initialRating={1.5}
        starsLength={5}
        dimension={120}
      />
      <StarRating
        initialRating={3}
        starsLength={5}
        dimension={90}
      />
      <StarRating />
    </div>
  );
}
