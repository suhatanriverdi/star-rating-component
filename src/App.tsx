import StarRating from "./StarRating.tsx";

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Test 1: Half-filled 1 star, 5-star rating */}
      <StarRating
        color="#14DD07"           // Green color
        isHalfRatingEnabled={true} // Half-filled stars enabled
        initialRating={1.5}        // Half-filled 1 star
        starsLength={5}            // 5 stars
        dimension={120}            // Star dimension 120px
      />

      {/* Test 2: Invalid rating (13, greater than 5 stars) */}
      {/* This test will throw an error, commented out */}
      {/* <StarRating*/}
      {/*   initialRating={13}*/}
      {/*   starsLength={5}*/}
      {/*   dimension={90}*/}
      {/* /> */}

      {/* Test 3: Default settings, valid rating */}
      <StarRating
        isHalfRatingEnabled={true}  // Half-filled stars enabled
        initialRating={2}           // 2 stars
        starsLength={5}             // 5 stars
        dimension={90}              // Star dimension 90px
      />

      {/* Test 4: Maximum 5-star rating with different color */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={5}           // Fully filled 5 stars
        dimension={80}              // Star dimension 80px
        color="#CCEE10"             // Yellow-green color
      />

      {/* Test 5: Half-filled 3 stars, different color */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={3.5}         // Half-filled 3.5 stars
        dimension={150}             // Star dimension 150px
        color="#EE00CC"             // Purple color
      />

      {/* Test 6: Only 1 filled star, 5-star rating */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={1}           // 1 filled star
      />

      {/* Test 7: 7-star rating (edge case, more than 5 stars) */}
      <StarRating
        starsLength={10}            // 10 stars
        initialRating={7.5}         // Half-filled 7.5 stars
        isHalfRatingEnabled={true}  // Half-filled stars enabled
      />

      {/* Test 8: 4 stars, half-rating disabled */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={4}           // 4 filled stars
        color="#14DD07"             // Green color
        dimension={90}              // Star dimension 90px
      />

      {/* Test 9: Half-filled 4.5 stars, different color and size */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={4.5}         // Half-filled 4.5 stars
        color="#FF0000"             // Red color
        dimension={120}             // Star dimension 120px
      />

      {/* Test 10: 3 stars rating, half-rating disabled */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={3}           // 3 filled stars
        isHalfRatingEnabled={false} // Half-filled stars disabled
      />

      {/* Test 11: Maximum 5 stars, black color */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={5}           // Fully filled 5 stars
        color="#000000"             // Black color
        dimension={100}             // Star dimension 100px
      />

      {/* Test 12: 0 stars, minimum rating */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={0}           // 0 stars
        color="#0000FF"             // Blue color
        dimension={110}             // Star dimension 110px
      />

      {/* Test 13: Only half-star, 5-star rating */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={0.5}         // Only half-star
        color="#FFD700"             // Gold color
        dimension={130}             // Star dimension 130px
      />

      {/* Test 14: Large star sizes, different color */}
      <StarRating
        starsLength={5}             // 5 stars
        initialRating={2}           // 2 stars
        color="#FF1493"             // Deep pink color
        dimension={200}             // Star dimension 200px
      />
    </div>
  );
}