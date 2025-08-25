import type { Event } from "../types/Event";

export const eventsDummy: Event[] = [{
    id: 1,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    title: "Tech Innovation Summit 2023",
    startDate: "15/11/2025",
    endDate: "17/11/2025",
    // venue: Grand Convention Center, Dubai",
    venue : {name : "Grand Convention Center, Dubai" , address: "123 Main St, Dubai", location: "Dubai, UAE", rooms: [{id: 1, name: "Main Hall", capacity: 500}, {id: 2, name: "Conference Room A", capacity: 200}] },
    status: "Pending",
    description: "Conference or event where people in the technology industry gather to discuss, learn, and network about the latest trends, innovations, and challenges in the field",
    ticket: [
        { id: 1, type: "Standard" },
        { id: 2, type: "VIP" }
    ],
    sessions: [
        {
            id: 1,
            name: "Opening Keynote: The Future of Event Technology",
            timeSlot: {
                id: 1,
                day: "Monday",
                startDate: "",
                endDate: ""
            },
            speaker: {
                id: 1,
                name: "Omar Hany",
                profile: 'https://media.licdn.com/dms/image/v2/D4D03AQFXe-WnuwL6cA/profile-displayphoto-shrink_400_400/B4DZaiI.yOGcAg-/0/1746476986036?e=1758153600&v=beta&t=3oNO5rP6j49FOzTh6cLoNE4wXw0C4V8WqxQb2vaLm98',
                bio: "Experienced keynote speaker in tech innovation."
            }
        },
        {
            id: 2,
            name: "Artificial Inteligence",
            timeSlot: {
                id: 2,
                day: "Monday",
                startDate: "",
                endDate: ""
            },
            speaker: {
                id: 2,
                name: "John Doe",
                profile: "https://randomuser.me/api/portraits/men/32.jpg",
                bio: "Experienced AI specialist."
            }
        }
    ]
},
{
    id: 2,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    title: "Digital Marketing Conference",
    startDate: "15/11/2025",
    endDate: "17/11/2025", venue: {name: "Marriott Hotel, London" , address: "456 High Street, London", location: "London, UK", rooms: [{id: 1, name: "Marketing Hall", capacity: 300}, {id: 2, name: "Strategy Room", capacity: 100}] },
    status: "Pending",
    sessions: [
        {
            id: 3,
            name: "Digital Marketing Trends 2025",
            timeSlot: {
                id: 1,
                day: "Tuesday",
                startDate: "",
                endDate: ""
            },
            speaker: {
                id: 4,
                name: "Sarah Lee",
                profile: "https://randomuser.me/api/portraits/women/44.jpg",
                bio: "Digital marketing strategist and keynote speaker."
            }
        },
        {
            id: 5,
            name: "SEO & Content Mastery",
            timeSlot: {
                id: 2,
                day: "Tuesday",
                startDate: "",
                endDate: ""
            },
            speaker: {
                id: 4,
                name: "Michael Chen",
                profile: "https://randomuser.me/api/portraits/men/45.jpg",
                bio: "SEO expert and content marketing consultant."
            }
        }
    ]
},
{
    id: 3,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    title: "AI & Machine Learning Workshop",
    startDate: "17/11/2025",
    endDate: "17/11/2025", venue: {name:"Innovation Hub, Singapore" , address: "789 Orchard Road, Singapore", location: "Singapore", rooms: [{id: 1, name: "AI Lab", capacity: 100}, {id: 2, name: "ML Workshop Room", capacity: 50}] },
    status: "Pending",
    sessions: [
        {
            id: 6,
            name: "Hands-on with Neural Networks",
            timeSlot: {
                id: 1,
                day: "Wednesday",
                startDate: "09:00 AM",
                endDate: "11:00 AM"
            },
            speaker: {
                id: 5,
                name: "Priya Singh",
                profile: "https://randomuser.me/api/portraits/women/55.jpg",
                bio: "AI researcher and workshop leader."
            }
        },
        {
            id: 7,
            name: "Machine Learning in Production",
            timeSlot: {
                id: 2,
                day: "Wednesday",
                startDate: "11:00 AM",
                endDate: "01:00 PM"
            },
            speaker: {
                id: 6,
                name: "David Kim",
                profile: "https://randomuser.me/api/portraits/men/56.jpg",
                bio: "ML engineer and industry speaker."
            }
        }
    ]
},
{
    id: 4,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    title: "Blockchain Revolution Forum",
    startDate: "15/11/2025",
    endDate: "17/11/2025", venue:{ name:"Convention Center, New York" , address: "456 Broadway, New York", location: "New York, USA", rooms: [{id: 3, name: "Blockchain Hall", capacity: 300}, {id: 4, name: "Crypto Room", capacity: 150}] },
    status: "Pending",
    sessions: [
        {
            id: 8,
            name: "Blockchain for Business",
            timeSlot: {
                id: 1,
                day: "Thursday",
                startDate: "10:00 AM",
                endDate: "11:00 AM"
            },
            speaker: {
                id: 7,
                name: "Linda Martinez",
                profile: "https://randomuser.me/api/portraits/women/65.jpg",
                bio: "Blockchain entrepreneur and educator."
            }
        },
        {
            id: 9,
            name: "Crypto Security Essentials",
            timeSlot: {
                id: 2,
                day: "Thursday",
                startDate: "12:00 PM",
                endDate: "01:00 PM"
            },
            speaker: {
                id: 8,
                name: "Alex Johnson",
                profile: "https://randomuser.me/api/portraits/men/66.jpg",
                bio: "Cybersecurity expert in blockchain and crypto."
            }
        }
    ]
}]