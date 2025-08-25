import type { Room } from "../types/Room"

type RoomRowProps = {
    rooms: Room[]
}

const RoomRow = ({ rooms }: RoomRowProps) => {
    return (
        <tr>
            <td colSpan={6} className="p-3 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                    {rooms.map((room, index) => (
                        <div key={index} className="flex items-center gap-2 rounded-full bg-white border px-3 py-1 shadow-sm">
                            <span className="text-sm">{room.name} · {room.capacity}</span>
                            <button className="text-xs text-blue-600 hover:underline">
                                Edit
                            </button>
                            <button className="text-xs text-red-600 hover:underline">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </td>
        </tr>
    )
}

export default RoomRow