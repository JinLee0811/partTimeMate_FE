// AddressAutocomplete.tsx
import React, { useEffect, useRef } from "react";

interface AddressAutocompleteProps {
  onSelect: (address: string, coordinates: { lat: number; lng: number }, placeId: string) => void;
  disabled?: boolean;
}

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            inputField: HTMLInputElement,
            options?: google.maps.places.AutocompleteOptions
          ) => google.maps.places.Autocomplete;
        };
      };
    };
  }
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onSelect,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!window.google?.maps?.places?.Autocomplete) {
      console.error("Google Maps Places API is not loaded");
      return;
    }

    if (inputRef.current && !autocompleteRef.current) {
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["establishment", "geocode"],
          componentRestrictions: { country: "AU" },
          fields: ["formatted_address", "geometry", "place_id"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry?.location || !place.formatted_address || !place.place_id) {
            console.error("Invalid place data received");
            return;
          }

          onSelect(
            place.formatted_address,
            {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            place.place_id
          );
        });

        autocompleteRef.current = autocomplete;
      } catch (err) {
        console.error("Failed to initialize Google Places Autocomplete:", err);
      }
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [onSelect]);

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        type='text'
        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
        placeholder='Enter address or place name'
        disabled={disabled}
      />
      <div className='absolute right-3 top-2 text-gray-400'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'>
          <path
            fillRule='evenodd'
            d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </div>
  );
};

export default AddressAutocomplete;
