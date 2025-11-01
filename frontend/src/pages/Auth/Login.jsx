import { useState , useEffect } from 'react'
import { Link, useLocation , useNavigate  } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import loader from '../../comonents/loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../../redux/api/users.js'



const Login = () => {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading}] = useLoginMutation()

  const {userInfo} = useSelector((state) => state.auth)

  const {search} = useLocation()
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/'
  
  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [navigate , redirect , userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='h-screen'>
        <section className="pl-[9rem] flex flex-wrap ">
            <div className="mr-[4rem] mt-[5rem]">
               <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

               <form onSubmit={submitHandler} className='container w-[32rem]'>
                    <div className='my-[2-rem]'>
                      <label htmlFor="email"className="block text-sm font-medium text-white">
                        Email Address
                      </label>
                      <input
                          type="email"
                          id="email"
                          className="mt-1 p-2 border rounded w-full"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="my-[2rem]">
                      <label htmlFor="password" className="block text-sm font-medium text-white" >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button 
                      disabled={isLoading} 
                      type='submit'  
                      className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                     >
                        {isLoading ? 'Signing In ...' : 'Sign In'}
                    </button>
                    {isLoading && <loader />}
               </form>
                <div className="mt-4">
                  <p className="text-white">
                    New Customer?{" "}
                    <Link
                      to={redirect ? `/register?redirect=${redirect}` : "/register"}
                      className="text-teal-500 hover:underline"
                    >
                      Register
                    </Link>
                  </p>
               </div>
            </div>

               <div className="relative h-[35rem] w-[50%]  xl:block md:hidden sm:hidden mt-[3rem] rounded-lg overflow-hidden">
                    <img
                      src="https://i.pinimg.com/736x/6e/35/54/6e3554bc2c42702a0d85bb5f453923d8.jpg"
                      alt="Background"
                      className="w-full h-full object-cover brightness-100 "
                    />
                     <div className="absolute inset-0 bg-black/30"></div>
               </div>
        </section>
    </div>
  )
}

export default Login