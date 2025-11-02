import { useState , useEffect } from 'react'
import { Link, useLocation , useNavigate  } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import Loader from '../../comonents/Loader.jsx'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/users.js'


const Register = () => {
    const [username , setUserName] = useState('')
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')



    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [register , {isloading}] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'


  useEffect(() => {
      if(userInfo){
        navigate(redirect)
      }
  }, [navigate, redirect , userInfo]) 

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="pl-[9rem] flex flex-wrap h-screen">
          <div className="mr-[4rem] mt-[3rem] ">
             <h1 className="text-2xl font-semibold mb-4">Register</h1>
             <form  onSubmit={submitHandler} className='container w-[32rem]'>
                <div className="my-[2rem]">
                   <label htmlFor="name" className=' block text-sm  font-medium text-white'>
                    Name
                   </label>
                   <input type="text" id="name" className='mt-1 p-2  border rounded w-full'
                    placeholder="Enter Your Name"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                   <label htmlFor="email" className=' block text-sm font-medium text-white'>
                    Email Address
                   </label>
                   <input type="email" id="email" className='mt-1 p-2 border rounded w-full'
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                   <label htmlFor="password" className=' block text-sm font-medium text-white'>
                    Password
                   </label>
                   <input type="password" id="password" className='mt-1 p-2 border rounded w-full'
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="my-[2rem]">
                   <label htmlFor="confirmPassword" className=' block text-sm font-medium text-white'>
                    Confirm Password
                   </label>
                   <input type="password" id="confirmPassword" className='mt-1 p-2 border rounded w-full'
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                    <button disabled={isloading} type='submit'
                    className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer mt-[0.5rem]"
                    >
                        {isloading ? "registering" : "register"}
                    </button>

                    {isloading && <Loader/>}
             </form>
              <div className="mt-4">
              <p className="text-white">
                Already have an account?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  className="text-teal-500 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
           <img
            src="https://i.pinimg.com/736x/e9/46/3f/e9463f48d2baa965ac0aa8eaa13d2d91.jpg"
            alt=""
            className="h-[35rem] w-[50%] xl:block md:hidden sm:hidden rounded-lg mt-[3rem]"
      />
      </div>
  )
}

export default Register