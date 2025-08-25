// import { API_BASE_URL } from "../config";
import { venuesDummy } from "../data/venues";
import type { Venue } from "../types/Venue";



//get Venues Real

// export const getVenues = async (): Promise<Venue[]> => {
//     const response = await fetch(`${API_BASE_URL}/api/Events/simple`);

//     if (!response.ok) {
//         throw new Error('Failed to fetch events');
//     }
//     return response.json();

// };



//get Venues Mock

export const getVenuesMock = async (): Promise<Venue[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return the dummy data as if it came from an API
    return Promise.resolve(venuesDummy as unknown as Venue[]);
};
