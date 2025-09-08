import { LoaderCircle, Lock, MailIcon } from 'lucide-react'
import { useState, useEffect, useContext } from 'react'
import { cn } from '../../lib/utils'
import Logo from '../../components/logo'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AuthContext } from '../../Auth/Authentication'

const LoginOrganizer = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const { login, user } = useContext(AuthContext)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "Organizer") navigate("/organizer/Home")
      else if (user.role === "Attendee") navigate("/attendee/Explore")
      else if (user.role === "Admin") navigate("/admin/home")
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in both email and password',
        confirmButtonColor: '#1E293B'
      })
      setLoading(false)
      return
    }

    try {
      const response = await axios.post("https://192.168.201.124:5001/api/Auth/login", {
        email,
        password,
      })

      const { token, user: loggedUser } = response.data

      // Save user and token in context
      login(loggedUser, token)

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${loggedUser.firstName} 🎉`,
        timer: 2000,
        showConfirmButton: false
      })

      // Redirect based on role
      if (loggedUser.role === "Organizer") navigate("/organizer/Home")
      else if (loggedUser.role === "Attendee") navigate("/attendee/Explore")
      else if (loggedUser.role === "Admin") navigate("/admin/home")

    } catch (error: any) {
      console.error("Login failed:", error)
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || "Invalid credentials",
        confirmButtonColor: '#1E293B'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-gray-100 p-6'>
        <h1 className='text-center mb-8'><Logo size="text-4xl" /></h1>
        <h2 className='mb-8 text-center text-2xl font-semibold text-gray-800'>Login As Event Manager</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#344054]">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#667085]"><MailIcon size={20} /></span>
              <input
                type="email"
                name="email"
                id="email"
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full rounded-lg border border-[#D0D5DD]",
                  "px-4 py-2.5 text-gray-700 placeholder:text-[#667085] pl-10",
                  "focus:border-blue-200 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                )}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#344054]">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#667085]"><Lock size={20} /></span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder='Enter your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full rounded-lg border border-[#D0D5DD]",
                  "px-4 py-2.5 text-gray-700 placeholder:text-[#667085] pl-10",
                  "focus:border-blue-200 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                )}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'h-10 w-full rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out',
              'inline-flex items-center justify-center gap-2',
              'bg-slate-900 text-white hover:bg-slate-700',
              'disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed'
            )}
          >
            {loading ? <LoaderCircle className="animate-spin" color="#fff" /> : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginOrganizer
