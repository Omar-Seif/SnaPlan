import Sidebar from '../../components/Sidebar'
import StatusCard from '../../components/StatusCard'
import SubmittedGrid from '../../components/SubmittedGrid'

const SubmittedEvents = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 md:ml-48 transition-all duration-300">
                <div className="p-5 md:p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <StatusCard title="Total Submitted Events" info="12" />
                        <StatusCard title="Rejected Events" info="2" />
                        <StatusCard title="Ongoing Events" info="3" />
                    </div>

                    <SubmittedGrid />

                </div>
            </div>
        </div>
    )
}

export default SubmittedEvents
