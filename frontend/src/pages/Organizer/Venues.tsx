
import Sidebar from "../../components/Sidebar"
import StatusCard from "../../components/StatusCard";
import VenueGrid from "../../components/VenueGrid";

const Venues = () => {


    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 md:ml-48 transition-all duration-300">
                <div className="p-5 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <StatusCard title="Total Venues" info="12" />
                        <StatusCard title="Active Venues" info="3" />
                    </div>

                    <VenueGrid />
                </div>
            </div>

        </div>
    );
}

export default Venues
