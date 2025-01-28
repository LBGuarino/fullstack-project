'use client';

import { OrderFormInputs } from "@/validations/orderFormSchema";
import React, { useState, useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import usePlacesAutocomplete, { getGeocode, getDetails } from "use-places-autocomplete";

interface AddressAutocompleteProps {
  register: UseFormRegister<OrderFormInputs>;
  setValue: UseFormSetValue<OrderFormInputs>;
  errors: FieldErrors<OrderFormInputs>;
}

export default function AddressAutocomplete({
  register,
  setValue,
  errors,
}: AddressAutocompleteProps) {
  const [selectedCountry, setSelectedCountry] = useState("DE");

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue: setAutocompleteValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: selectedCountry.toLowerCase() },
    },
  });

  const handleSelect = async (address: string) => {
    setAutocompleteValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const placeDetails = await getDetails({ placeId: results[0].place_id });

      if (placeDetails && typeof placeDetails !== "string") {
        const addressComponents = placeDetails.address_components;

        setValue("address.street", address);
        const city = addressComponents?.find((c) => c.types.includes("locality"))?.long_name || "";
        setValue("address.city", city);
        const postalCode =
          addressComponents?.find((c) => c.types.includes("postal_code"))?.long_name || "";
        setValue("address.postalCode", postalCode);
        const country =
          addressComponents?.find((c) => c.types.includes("country"))?.short_name || selectedCountry;
        setValue("address.country", country);
        setSelectedCountry(country);
      }
    } catch (error) {
      console.error("Error fetching geocode or place details:", error);
    }
  };

  useEffect(() => {
    setValue("address.country", selectedCountry);
  }, [selectedCountry, setValue]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Country
        </label>
        <select
          id="country"
          {...register("address.country")}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="
            w-full 
            rounded-lg
            border-0
            border-b
            border-gray-300
            bg-transparent
            focus:border-cyan-700
            focus:ring-0
            placeholder-gray-400
            text-sm
            py-2
          "
        >
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="AU">Australia</option>
          <option value="FR">France</option>
        </select>
        {errors.address?.country && (
        <p className="text-red-500 text-sm">{errors.address.country.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Delivery Address
        </label>
        <input
          {...register("address.street")}
          type="text"
          id="address"
          value={value}
          onChange={(e) => setAutocompleteValue(e.target.value)}
          disabled={!ready}
          placeholder="1234 Main St"
          className="
            w-full 
            rounded-lg
            border-0
            border-b
            border-gray-300
            bg-transparent
            focus:border-cyan-700
            focus:ring-0
            placeholder-gray-400
            text-sm
            py-2
          "
        />
        {status === "OK" && (
          <ul className="mt-2 bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {description}
              </li>
            ))}
          </ul>
        )}
        {errors.address?.street && (
        <p className="text-red-500 text-sm">{errors.address.street.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          City
        </label>
        <input
          {...register("address.city")}
          type="text"
          id="city"
          readOnly
          className="
            w-full 
            rounded-lg
            border-0
            border-b
            border-gray-300
            bg-gray-100
            text-gray-500
            focus:ring-0
            placeholder-gray-400
            text-sm
            py-2
          "
        />
        {errors.address?.city && (
        <p className="text-red-500 text-sm">{errors.address.city.message}</p>
        )}

      </div>

      <div>
        <label
          htmlFor="postalCode"
          className="block text-base font-normal text-gray-700 mb-3"
        >
          Postal Code
        </label>
        <input
          {...register("address.postalCode")}
          type="text"
          id="postalCode"
          readOnly
          className="
            w-full 
            rounded-lg
            border-0
            border-b
            border-gray-300
            bg-gray-100
            text-gray-500
            focus:ring-0
            placeholder-gray-400
            text-sm
            py-2
          "
        />
        {errors.address?.postalCode && (
        <p className="text-red-500 text-sm">{errors.address.postalCode.message}</p>
        )}
      </div>
    </div>
  );
}
