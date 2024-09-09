interface ToggleState {
  MonthlyButton: boolean;
  CategoryButton: boolean;
}

export const useToggleButton = (
  toggle: ToggleState,
  setToggle: React.Dispatch<
    React.SetStateAction<{
      MonthlyButton: boolean;
      CategoryButton: boolean;
    }>
  >
) => {
  const handleButtonClick = (
    buttonType: "MonthlyButton" | "CategoryButton"
  ) => {
    const oppositeButton =
      buttonType === "MonthlyButton" ? "CategoryButton" : "MonthlyButton";

    if (toggle[oppositeButton]) {
      setToggle((prev) => ({
        ...prev,
        [buttonType]: !prev[buttonType],
        [oppositeButton]: !prev[oppositeButton],
      }));
    } else if (toggle[buttonType]) {
      return;
    } else {
      setToggle((prev) => ({ ...prev, [buttonType]: !prev[buttonType] }));
    }
  };

  return { handleButtonClick };
};
