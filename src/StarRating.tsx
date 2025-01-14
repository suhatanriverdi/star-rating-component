import {EmptyStar, FilledStar, HalfFilledStar} from "./ui/stars.tsx";
import React, {useCallback, useMemo, useState} from "react";

/**
 * Props for the StarRating component.
 */
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
   * Should be in the range of 0 <= initialRating <= starsLength.
   * Can be multiples of either 1 or 0.5 based on `isHalfRatingEnabled`.
   *
   * - If `isHalfRatingEnabled` is true:
   *   Values like 0.5, 1.0, 1.5, etc. are allowed.
   * - If `isHalfRatingEnabled` is false:
   *   Integer values like 0, 1, 2, etc. are allowed.
   *
   * Defaults to 0.
   */
  initialRating?: number;

  /**
   * Dimension of the stars (width and height, in pixels).
   * Defaults to the dimension defined in the star components.
   */
  dimension?: number;

  /**
   * Color of the stars.
   * Defaults to the color defined in the star components.
   */
  color?: string;
};

/**
 * StarRating Component
 *
 * A flexible and customizable star rating component that supports
 * full and half-star ratings with interactive hover and click states.
 *
 * - Provides smooth transitions on hover.
 * - Dynamically updates based on user interaction.
 *
 * @param {StarRatingProps} props - The configuration options for the component.
 * @returns {JSX.Element} The rendered star rating component.
 */
export default function StarRating({
                                     starsLength = 5,
                                     initialRating = 0,
                                     isHalfRatingEnabled = (initialRating % 1 !== 0),
                                     dimension,
                                     color,
                                   }: StarRatingProps) {
  /**
   * The following check ensures that the `initialRating` is within the valid range.
   * - If `initialRating` is less than 0 or greater than `starsLength`, an error is thrown to prevent invalid ratings.
   *
   * @throws {Error} If the initialRating is outside the valid range (0 <= initialRating <= starsLength).
   */
  if (initialRating > starsLength || initialRating < 0) {
    throw new Error("initialRating must be within 0 <= initialRating <= starsLength");
  }

  /**
   * Memoizes the `color` prop to avoid unnecessary recalculations when it hasn't changed.
   * This optimization ensures that the component doesn't re-render due to unnecessary changes in the `color` prop.
   *
   * @type {string} The color to be used for the stars.
   */
  const memoizedColor = useMemo(() => color, [color]);

  /**
   * Memoizes the `dimension` prop to avoid unnecessary recalculations when it hasn't changed.
   * This optimization ensures that the component doesn't re-render due to unnecessary changes in the `dimension` prop.
   *
   * @type {number} The dimension (size) of the stars in pixels.
   */
  const memoizedDimension = useMemo(() => dimension, [dimension]);

  /**
   * Returns the corresponding star SVG component based on the `starID`.
   * This function uses the memoized `color` and `dimension` props to ensure optimal performance
   * by preventing unnecessary recalculations and re-renders.
   *
   * @param {number} starID - The identifier for the star's state.
   * - `0` = Empty star.
   * - `1` = Half-filled star.
   * - `2` = Fully-filled star.
   * @returns {JSX.Element} The corresponding star SVG component.
   */
  const getStarSVGs = useCallback(
    (starID: number) => {
      switch (starID) {
        case 1:
          return <HalfFilledStar color={memoizedColor} dimension={memoizedDimension}/>;
        case 2:
          return <FilledStar color={memoizedColor} dimension={memoizedDimension}/>;
        default:
          return <EmptyStar color={memoizedColor} dimension={memoizedDimension}/>;
      }
    },
    [memoizedColor, memoizedDimension]
  );

  /**
   * Determines if the left or right half of a star was clicked.
   *
   * @param {React.MouseEvent<HTMLElement>} event - Mouse event from the click.
   * @returns {boolean} `true` if the left half was clicked, `false` otherwise.
   */
  const isHalfClicked = (event: React.MouseEvent<HTMLElement>): boolean => {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const midpoint = rect.width / 2;
    return event.nativeEvent.offsetX < midpoint;
  };

  /**
   * Creates a new array representing the state of the stars
   * based on the provided index.
   *
   * @param {number} untilIndex - The rating index up to which stars should be filled.
   * @returns {number[]} Array representing the stars' state.
   */
  const createNewStarsState = (untilIndex: number): number[] => {
    const flooredUntilIndex = Math.floor(untilIndex);
    const hasHalfFilledStar = untilIndex - flooredUntilIndex > 0;

    const newStarsState: number[] = Array.from(
      {length: starsLength},
      (_, index) => (index < flooredUntilIndex ? 2 : 0)
    );

    if (hasHalfFilledStar) {
      newStarsState[flooredUntilIndex] = 1;
    }

    return newStarsState;
  };

  /**
   * Initializes the state of the stars based on the `initialRating`.
   *
   * @returns {number[]} The initial state of the stars.
   */
  const initializeStarsState = (): number[] => createNewStarsState(initialRating);

  /**
   * Resets the state of the stars to empty.
   */
  const resetStarsState = (): void => {
    const newEmptyStarsState = Array(starsLength).fill(0);
    updateStarsState(newEmptyStarsState);
    setPreviousStarsState(newEmptyStarsState);
  };

  /**
   * Updates the stars' state in the component's state.
   *
   * @param {number[]} newStarsState - The new stars' state to set.
   */
  const updateStarsState = (newStarsState: number[]) =>
    setStarsState(newStarsState);

  /**
   * Updates the last clicked index in the state.
   *
   * @param {number | null} newLastClickedUntilIndexState - The new last clicked index.
   */
  const updateLastClickedUntilIndexState = (
    newLastClickedUntilIndexState: number | null
  ) => setLastClickedUntilIndexState(newLastClickedUntilIndexState);

  /**
   * Handles updates to the stars' state when a star is clicked.
   *
   * @param {number} untilIndex - The index up to which stars should be filled.
   */
  const handleStarsStateUpdate = (untilIndex: number) => {
    setPreviousStarsState(starsState);

    if (lastClickedUntilIndexState === untilIndex) {
      resetStarsState();
      updateLastClickedUntilIndexState(null);
      return;
    }

    const newStarsState = createNewStarsState(untilIndex);
    updateStarsState(newStarsState);
    updateLastClickedUntilIndexState(untilIndex);
  };

  /**
   * Computes the index up to which stars should be filled based on user interaction.
   *
   * @param {React.MouseEvent<HTMLElement>} event - Mouse event from the interaction.
   * @param {number} index - The star's index.
   * @returns {number} The computed index.
   */
  const getUntilIndex = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const hasHalfFilledStar = isHalfRatingEnabled && isHalfClicked(event);
    return hasHalfFilledStar ? index - 0.5 : index;
  };

  /**
   * Handles click events on stars to update the rating.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The click event.
   * @param {number} index - The index of the clicked star.
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const untilIndex = getUntilIndex(event, index);
    handleStarsStateUpdate(untilIndex);
  };

  /**
   * Handles hover events to visually update stars based on interaction.
   */
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (!isHalfRatingEnabled) {
      updateStarsState(createNewStarsState(index));
      return;
    }

    const element = event.currentTarget as HTMLDivElement;
    const rect = element.getBoundingClientRect();
    const midpoint = rect.width / 2;
    const isLeftSide = event.clientX < rect.left + midpoint;

    if (isLeftSide && lastSide !== "L") {
      updateStarsState(createNewStarsState(index - 0.5));
      setLastSide("L");
    } else if (!isLeftSide && lastSide !== "R") {
      updateStarsState(createNewStarsState(index));
      setLastSide("R");
    }
  };

// States

  /**
   * `starsState` holds the current state of the stars, where each star is represented
   * by a number: 0 = Empty, 1 = Half-filled, 2 = Fully-filled.
   *
   * This state is used to dynamically render the stars based on user interaction.
   *
   * It is initialized with the value returned from `initializeStarsState()`, which
   * is based on the `initialRating`.
   */
  const [starsState, setStarsState] = useState<number[]>(initializeStarsState);

  /**
   * `previousStarsState` stores the previous state of the stars before the user interacts
   * with them. This allows for resetting to the prior state if necessary (for example,
   * when the user clicks the same rating to clear it).
   *
   * It is initialized with the current value of `starsState` on component mount.
   */
  const [previousStarsState, setPreviousStarsState] = useState<number[]>(starsState);

  /**
   * `lastClickedUntilIndexState` stores the index of the last star that was clicked by
   * the user. This helps to track the last interaction, enabling the logic to toggle
   * the stars back to their previous state if the same rating is clicked again.
   *
   * It is initialized with the value of `initialRating`, representing the initial rating
   * state of the stars when the component is mounted.
   */
  const [lastClickedUntilIndexState, setLastClickedUntilIndexState] =
    useState<number | null>(initialRating);

  /**
   * `lastSide` keeps track of the last side of a star (left or right) that was hovered over
   * when half-star rating is enabled. This helps to determine whether the user is interacting
   * with the left or right side of a star for finer control of the half-star rating.
   *
   * It is initialized as `null`, which represents no side being selected at the start.
   */
  const [lastSide, setLastSide] = useState<"L" | "R" | null>(null);

  /**
   * Renders the stars as interactive elements.
   *
   * @returns {JSX.Element[]} Array of star components.
   */
  const drawStars = () => {
    const paddingValue = dimension ? dimension * 0.004 : 0.5;
    return starsState.map((star, index) => (
      <div
        style={{
          padding: `${paddingValue}rem`,
        }}
        key={index}
        onMouseMove={(event) => handleMouseMove(event, index + 1)}
        onMouseLeave={handleMouseLeave}
        onClick={(event) => handleClick(event, index + 1)}
      >
        {getStarSVGs(star)}
      </div>
    ));
  };

  /**
   * Handles mouse leave to reset hover state.
   */
  const handleMouseLeave = () => {
    updateStarsState(previousStarsState);
    setLastSide(null);
  };

  return <div className="flex w-fit">{drawStars()}</div>;
}