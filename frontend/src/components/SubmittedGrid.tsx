import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import type { SubmittedEvent } from "../types/Event"
import { getSubmittedEventsMock } from "../services/EventService"
import SubmittedRow from "./SubmittedRow"

const SubmittedGrid = () => {
    const [submittedEvents, setSubmittedEvents] = useState<SubmittedEvent[]>([])
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchSubmittedEvents = async () => {
            try {
                setLoading(true)
                setError(null)
                const submittedEvents: SubmittedEvent[] = await getSubmittedEventsMock()
                setSubmittedEvents(submittedEvents)
            } catch (err) {
                console.log(err)
                setLoading(false)
                setError(err instanceof Error ? err.message : "Failed to load events")
            } finally {
                setLoading(false)
            }
        }
        fetchSubmittedEvents()
    }, [])

    return (
        <>
            {/* Events Table Section */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-md overflow-hidden mt-5">
                {/* Table Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">Submitted Events List</h2>
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
                                <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">Status</th>
                                <th className="ml-3 p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {error && <div className="error-message">{error}</div>}

                            {loading ? <LoaderCircle className="animate-spin" color={loading ? "#9CA3AF" : "#fff"} /> :

                                submittedEvents.map((event, index) => (
                                    <SubmittedRow submittedEvent={event} key={index} />
                                ))}

                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Showing 3 of 12 submitted events</p>
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

export default SubmittedGrid
