// AddressAutocomplete.tsx
import React, { useEffect } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

interface AddressAutocompleteProps {
  initialValue?: string;
  onSelect: (selectedAddress: string, coordinates: { lat: number; lng: number }) => void;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  initialValue = "",
  onSelect,
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "AU" } },
    debounce: 300,
  });

  useEffect(() => {
    setValue(initialValue, false);
  }, [initialValue, setValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect(address, { lat, lng });
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  return (
    <div className='relative'>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        placeholder='Enter an address...'
        disabled={!ready}
        className='w-full p-2 border border-gray-300 rounded-md'
      />
      {status === "OK" && (
        <ul className='absolute bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-auto z-10'>
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
