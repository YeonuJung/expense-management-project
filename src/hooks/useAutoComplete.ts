export const useAutoComplete = () => {

    const onLoad = (
    autocompleteInstance: google.maps.places.Autocomplete | null,
    setAutocomplete: React.Dispatch<
      React.SetStateAction<google.maps.places.Autocomplete | null>
    >
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = (
    handleInputValue: (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
      name: string
    ) => void,
    autocomplete: google.maps.places.Autocomplete | null
  ) => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const event = {
          target: { value: place.formatted_address || place.name },
        } as React.ChangeEvent<HTMLInputElement>;
        handleInputValue(event, "place");
      }
    }
  };
  return { onLoad, onPlaceChanged };
};
