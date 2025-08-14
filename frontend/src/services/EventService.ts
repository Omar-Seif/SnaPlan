// src/services/eventService.ts
import { API_BASE_URL } from '../config';
import type { Event } from '../types/Event';



export const getEvents = async (): Promise<Event[]> => {
    const response = await fetch(`${API_BASE_URL}/api/Events/simple`);

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    return response.json();
};

