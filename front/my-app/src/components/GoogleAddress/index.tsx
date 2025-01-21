'use client';

import React, { useState } from "react";
import usePlacesAutocomplete, { getGeocode, getDetails } from "use-places-autocomplete";

export default function AddressAutocomplete() {
    const [selectedCountry, setSelectedCountry] = useState("DE");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: selectedCountry.toLowerCase() },
        },
    });

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const placeDetails = await getDetails({ placeId: results[0].place_id });

            if (placeDetails && typeof placeDetails !== "string") {
                const addressComponents = placeDetails.address_components;

                setAddress(address);
                setCity(
                    addressComponents?.find((c) => c.types.includes("locality"))?.long_name || ""
                );
                setPostalCode(
                    addressComponents?.find((c) => c.types.includes("postal_code"))?.long_name || ""
                );
            }
        } catch (error) {
            console.error("Error fetching geocode or place details:", error);
        }
    };

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
                    name="country"
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
            </div>

            <div className="mb-4">
                <label
                    htmlFor="address"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    Delivery Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
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
            </div>

            {/* City Field */}
            <div className="mb-4">
                <label
                    htmlFor="city"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    City
                </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
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
            </div>

            <div>
                <label
                    htmlFor="postal-code"
                    className="block text-base font-normal text-gray-700 mb-3"
                >
                    Postal Code
                </label>
                <input
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    value={postalCode}
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
            </div>
        </div>
    );
}
