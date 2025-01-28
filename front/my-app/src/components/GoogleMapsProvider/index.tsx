'use client';

import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];

export const GoogleMapsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        throw new Error("API Key for Google Maps is missing");
    }

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries} loadingElement={
        <div className='w-full min-h-screen flex flex-col md:flex-row'> 
            <div className='flex-1 bg-gradient-to-br from-white to-cyan-50 flex flex-col items-center justify-center p-8'>
                <p className='text-3xl md:text-4xl font-extralight text-center'>loading...</p>
            </div>
        </div>
    }>
            {children}
        </LoadScript>
    );
};
