import profile from '../assets/profile.jpg'


const SessionCard = () => {
    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center gap-4 border rounded-lg p-4 bg-white shadow-sm">
                    <div className="text-sm font-medium text-gray-500 w-24 md:w-auto mr-auto md:mr-2">
                        09:00 AM - 10:00 AM
                    </div>
                    <div className="flex flex-1 justify-between items-center">
                        <div className="text-lg font-medium">Opening Keynote: The Future of Event Technology</div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 ml-4 mr-2">
                            <img
                                src={profile}
                                alt='Mr.Omar'
                                className="w-6 h-6 rounded-full"
                            />
                            <span>Mr.Omar Hany</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SessionCard
