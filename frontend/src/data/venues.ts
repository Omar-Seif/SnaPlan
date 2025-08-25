import type { Venue } from "../types/Venue";

export const venuesDummy: Venue[] = [
    {
        name: "Venue A",
        address: "123 Main St",
        location: "City Center",
        rooms: [
            { name: "Hall A", capacity: 200 },
            { name: "Hall B", capacity: 300 }
        ]
    },
    {
        name: "Venue B",
        address: "456 Main St",
        location: "Almaza",
        rooms: [
            { name: "Hall C", capacity: 400 },
            { name: "Hall D", capacity: 500 }
        ]
    },
    {
        name: "Venue C",
        address: "123 Main St",
        location: "City Stars",
        rooms: [
            { name: "Hall E", capacity: 600 },
            { name: "Hall F", capacity: 700 }
        ]
    },
]