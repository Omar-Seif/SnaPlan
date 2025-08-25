


const RoomRow = () => {
    return (
        <tr>
            <td colSpan={6} className="p-3 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 rounded-full bg-white border px-3 py-1 shadow-sm">
                        <span className="text-sm">Hall A · 200</span>
                        <button className="text-xs text-blue-600 hover:underline">
                            Edit
                        </button>
                        <button className="text-xs text-red-600 hover:underline">
                            Delete
                        </button>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white border px-3 py-1 shadow-sm">
                        <span className="text-sm">Hall B · 300</span>
                        <button className="text-xs text-blue-600 hover:underline">
                            Edit
                        </button>
                        <button className="text-xs text-red-600 hover:underline">
                            Delete
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default RoomRow
