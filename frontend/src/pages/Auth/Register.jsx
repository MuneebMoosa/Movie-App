import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../comonents/Loader.jsx'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/users.js'

const Register = () => {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } 
      catch (err) {
        // console.log(err);
        toast.error(err?.data?.message);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface/80 border border-border p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-md">
        {/* Form Container */}
        <div className="w-full space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Create an Account
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Join Movies Hub today to review and discover movies.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter Your Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary/20 cursor-pointer"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {isLoading && <div className="mt-2"><Loader /></div>}
          </form>

          <div className="pt-2 border-t border-border/60">
            <p className="text-text-secondary text-sm text-center lg:text-left">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-primary hover:underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Visual Poster Card */}
        <div className="hidden lg:block relative aspect-square rounded-2xl overflow-hidden border border-border/60 shadow-inner">
          <img
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
            alt="Movie Theater Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-6">
            <div className="space-y-1">
              <h3 className="text-white font-bold text-lg">Join the Movie Community</h3>
              <p className="text-white bg-black/70 rounded-l p-1 px-2 text-xs">Rate your favorite titles and keep track of new releases</p>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
