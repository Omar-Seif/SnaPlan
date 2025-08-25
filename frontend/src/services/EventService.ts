// src/services/eventService.ts
// import { API_BASE_URL } from '../config';
import { draftEventsDummy } from '../data/draftevents';
import { eventsDummy } from '../data/events';
import { submittedEventsDummy } from '../data/submittedevents';
import type { DraftEvent, Event, SubmittedEvent } from '../types/Event';


//get EventCards Real

// export const getEventCards = async (): Promise<Event[]> => {
//     const response = await fetch(`${API_BASE_URL}/api/Events/simple`);

//     if (!response.ok) {
//         throw new Error('Failed to fetch events');
//     }
//     return response.json();

// };



// get EventCards Mock

export const getEventCardsMock = async (): Promise<Event[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return the dummy data as if it came from an API
    return Promise.resolve(eventsDummy as unknown as Event[]);
};



// get DraftEvents Real

// export const getDraftEvents = async (): Promise<DraftEvent[]> => {
//     const response = await fetch(`${API_BASE_URL}/api/Events/simple`);

//     if (!response.ok) {
//         throw new Error('Failed to fetch events');
//     }
//     return response.json();
// };


// get DraftEvents Mock

export const getDraftEventsMock = async (): Promise<DraftEvent[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return the dummy data as if it came from an API
    return Promise.resolve(draftEventsDummy as unknown as DraftEvent[]);
};



//get SubmittedEvents Real

// export const getSubmittedEvents = async (): Promise<SubmittedEvent[]> => {
//     const response = await fetch(`${API_BASE_URL}/api/Events/simple`);

//     if (!response.ok) {
//         throw new Error('Failed to fetch events');
//     }
//     return response.json();
// };



// get SubmittedEvents Mock

export const getSubmittedEventsMock = async (): Promise<SubmittedEvent[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return the dummy data as if it came from an API
    return Promise.resolve(submittedEventsDummy as unknown as SubmittedEvent[]);
};
