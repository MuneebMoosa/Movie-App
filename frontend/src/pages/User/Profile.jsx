import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../comonents/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { useProfileMutation } from '../../redux/api/users'
import { FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi'

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || '')
      setEmail(userInfo.email || '')
    }
  }, [userInfo])

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-8 sm:py-12">
      <div className="bg-surface/80 border border-border p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-md space-y-6">
        {/* Profile Header Badge */}
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xl">
            {userInfo?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-text-primary tracking-tight">
              Update Profile
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm">
              Manage your personal account settings
            </p>
          </div>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Name
            </label>
            <div className="relative flex items-center">
              <FiUser className="absolute left-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Enter name"
                className="w-full pl-11 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-4 text-text-secondary" />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full pl-11 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              New Password (Optional)
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-4 text-text-secondary" />
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full pl-11 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Confirm New Password
            </label>
            <div className="relative flex items-center">
              <FiCheckCircle className="absolute left-4 text-text-secondary" />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full pl-11 pr-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              disabled={loadingUpdateProfile}
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary/20 cursor-pointer"
            >
              {loadingUpdateProfile ? 'Updating Profile...' : 'Update Profile'}
            </button>
            {loadingUpdateProfile && <div className="mt-2 flex justify-center"><Loader /></div>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile