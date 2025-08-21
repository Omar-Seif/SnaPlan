import DraftRow from "./DraftRow"




const DraftsGrid = () => {
    return (
        <>
            {/* Events Table Section */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden mt-5">
                {/* Table Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">Draft Events List</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Event Title</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Start Date</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">End Date</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Venue</th>
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <DraftRow draftEvent={{
                                title: "Introduction to AI",
                                startDate: "15/11/2025",
                                endDate: "17/11/2025",
                                venue: "Dubai Plaza"
                            }} />

                            <DraftRow draftEvent={{
                                title: "Web Development Workshop",
                                startDate: "20/11/2025",
                                endDate: "21/11/2025",
                                venue: "Tech Hub"
                            }} />

                            <DraftRow draftEvent={{
                                title: "Digital Marketing Summit",
                                startDate: "25/12/2025",
                                endDate: "27/12/2025",
                                venue: "Conventional Center"
                            }} />
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Showing 3 of 12 draft events</p>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                            Previous
                        </button>
                        <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DraftsGrid
