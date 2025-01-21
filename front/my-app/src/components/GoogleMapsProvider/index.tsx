'use client';

import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"]; // Cargar la librería de Places

export const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        throw new Error("API Key for Google Maps is missing");
    }

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            {children}
        </LoadScript>
    );
};
