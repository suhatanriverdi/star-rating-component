import { EmptyStar, FilledStar, HalfFilledStar } from "./ui/stars.tsx";
import React, { useState } from "react";
import { debounce } from "lodash";

export type StarRatingProps = {
  /**
   * Total number of stars to display.
   * Defaults to 5.
   */
  starsLength?: number;

  /**
   * Enables or disables half-star ratings.
   * Defaults to false.
   */
  isHalfRatingEnabled?: boolean;

  /**
   * The initial rating to display.
   * Should be in the range of
   * 0 <= initialRating <= starsLength
   * Can be multiples of either 1 or 0.5 based on isHalfRatingEnabled
   * If isHalfRatingEnabled is true
   * Should be numbers like 0.5, 1.00, 1.50, 2.00 ... 5.00, etc.
   * If isHalfRatingEnabled is false
   * Should be integer numbers like 0, 1, 2, 3, ... 5, etc.
   * Defaults to 0.
   */
  initialRating?: number;

  /**
   * The initial dimension of the stars.
   * Will be used for both width and height symmetrically
   * Can be decimal or integer number
   */
  dimension?: number;
};

/*
 * TOOD
 * initialRating, ve starsLength
 * Buna bir düzeltme getir sınırlama koy
 * İnsanlart giremesien range dışındaysa
 * */

export default function StarRating({
  starsLength = 5,
  isHalfRatingEnabled = false,
  initialRating = 0,
  dimension,
}: StarRatingProps) {
  // Return the requested star element based on the given starID
  // 0: Empty
  // 1: Half Filled
  // 2: Filled
  const getStarSVGs = (starID: number) => {
    switch (starID) {
      case 1:
        return <HalfFilledStar dimension={dimension} />;
      case 2:
        return <FilledStar dimension={dimension} />;
      default:
        return <EmptyStar dimension={dimension} />;
    }
  };

  /**
   * Determines whether the right half of a star was clicked.
   *
   * @param event - The MouseEvent object from the click event.
   * @returns `true` if the right half of the star was clicked,
   * `false` if the left half was clicked.
   */
  const isHalfClicked = (event: React.MouseEvent<HTMLElement>): boolean => {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const midpoint = rect.width / 2;
    return event.nativeEvent.offsetX < midpoint;
  };

  // Creates and returns a new stars state by using the given parameter untilIndex
  const createNewStarsState = (untilIndex: number) => {
    const flooredUntilIndex = Math.floor(untilIndex);
    const hasHalfFilledStar = untilIndex - flooredUntilIndex > 0;

    const newStarsState: number[] = Array.from(
      { length: starsLength },
      (_, index) => {
        return index < flooredUntilIndex ? 2 : 0;
      },
    );

    // Handle the state of the right most half clicked star if it exists so
    if (hasHalfFilledStar) {
      newStarsState[flooredUntilIndex] = 1;
    }

    return newStarsState;
  };

  // Initialize stars state
  const initializeStarsState = (): number[] => {
    return createNewStarsState(initialRating);
  };

  const resetStarsState = () => {
    const newEmptyStarsState: number[] = Array(starsLength).fill(0);
    updateStarsState(newEmptyStarsState);
  };

  const updateStarsState = (newStarsState: number[]) =>
    setStarsState(newStarsState);

  const updateLastClickedUntilIndexState = (
    newLastClickedUntilIndexState: number | undefined,
  ) => setLastClickedUntilIndexState(newLastClickedUntilIndexState);

  const handleStarsStateUpdate = (untilIndex: number) => {
    setPreviousStarsState(starsState);

    if (lastClickedUntilIndexState === untilIndex) {
      resetStarsState();
      updateLastClickedUntilIndexState(undefined);
      return;
    }

    const newStarsState: number[] = createNewStarsState(untilIndex);
    updateStarsState(newStarsState);
    updateLastClickedUntilIndexState(untilIndex);
  };

  const getUntilIndex = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    const hasHalfFilledStar = isHalfRatingEnabled && isHalfClicked(event);
    return hasHalfFilledStar ? index - 0.5 : index;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const untilIndex = getUntilIndex(event, index);
    handleStarsStateUpdate(untilIndex);
  };

  const handleMouseLeave = () => {
    updateStarsState(previousStarsState);
    console.log("leave", previousStarsState);
  };

  const handleMouseOver = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    const untilIndex = getUntilIndex(event, index);
    handleStarsStateUpdate(untilIndex);
    console.log("enter", untilIndex);
  };

  const debouncedHandleMouseOver = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    debounce(handleMouseOver(event, index), 100);
  };

  // Stars state
  const [starsState, setStarsState] = useState<number[]>(initializeStarsState);

  // Previous stars state
  const [previousStarsState, setPreviousStarsState] =
    useState<number[]>(starsState);

  // Last clicked index state
  const [lastClickedUntilIndexState, setLastClickedUntilIndexState] = useState<
    number | undefined
  >();

  // Build the star elements from stars state
  const drawStars = () => {
    return starsState.map((star: number, index: number) => {
      return (
        <div
          key={index}
          onMouseOver={(event) => handleMouseOver(event, index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={(event) => handleClick(event, index + 1)}
        >
          {getStarSVGs(star)}
        </div>
      );
    });
  };

  return <div className="flex w-fit h-fit gap-[1rem]">{drawStars()}</div>;
}
