import { Link } from 'react-router-dom';
import type { Event } from '../types/Events'

interface EventCardProps {
    event: Event
}

const EventsCard = ({ event }: EventCardProps) => {
    const {
        id,
        image,
        title,
        dateRange,
        venue,
        status
    } = event;

    const getStatusColor = () => {
        switch (status) {
            case 'Accepted':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            case 'Pending':
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (

        <Link to={`/organizer/EventDetails/${id}`}>
            <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                {/* Fixed-size image container */}
                <div className="w-full h-48 overflow-hidden">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={image}
                        alt={title}
                    />
                </div>

                <div className="p-4 flex-grow flex flex-col">
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-slate-900 line-clamp-2">
                        {title}
                    </h3>

                    <div className="mb-3 space-y-1.5">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-600">{dateRange}</span>
                        </div>

                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm text-gray-600 line-clamp-1">{venue}</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                            {status}
                        </span>

                        <Link to='/organizer/EventDetails'>
                            <button className="mt-3 w-full inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 transition-colors">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventsCard;
