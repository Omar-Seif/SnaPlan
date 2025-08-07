import { MailIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils.js'



const Login = () => {

    const [email, setEmail] = useState<string>("")

    return (
        <>
            <div>
                <div>
                    <h2></h2>
                    <form action="">
                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#344054]">
                                Email
                            </label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-[#667085]"><MailIcon size={20} /></span>
                                <input type="input" name="email" id="email"
                                    placeholder='Enter your Email' value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={cn} />
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
