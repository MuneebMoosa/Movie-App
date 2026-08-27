import React from 'react'
import { useState } from 'react'
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd
} from 'react-icons/ai'
import { MdOutlineLocalMovies } from "react-icons/md"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/users'
import { logout } from '../../redux/features/auth/authSlice'

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout());
      navigation('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-surface/95 backdrop-blur-md border border-border shadow-2xl rounded-full px-5 py-2.5 max-w-fit w-[92%] sm:w-auto">
      <section className="flex items-center justify-between gap-4 sm:gap-8">
        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-text-primary hover:text-secondary transition-colors duration-200"
          >
            <AiOutlineHome size={20} />
            <span className="text-xs sm:text-sm font-medium">Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center gap-1.5 text-text-primary hover:text-secondary transition-colors duration-200"
          >
            <MdOutlineLocalMovies size={20} />
            <span className="text-xs sm:text-sm font-medium">Movies</span>
          </Link>
        </div>

        {/* User Account / Auth Section */}
        <div className="relative flex items-center">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-light hover:bg-border text-text-primary text-xs sm:text-sm font-medium transition-colors focus:outline-none"
            >
              <span>{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : null}

          {dropdownOpen && userInfo && (
            <ul className="absolute bottom-full mb-3 right-0 w-44 bg-surface border border-border rounded-xl shadow-xl overflow-hidden py-1 z-50">
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/20 hover:text-primary transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-primary/20 hover:text-primary transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logoutHandler();
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-danger hover:bg-danger/10 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex items-center gap-3 sm:gap-4">
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-text-primary hover:text-secondary text-xs sm:text-sm font-medium transition-colors"
                >
                  <AiOutlineLogin size={19} />
                  <span className="text-xs sm:text-sm font-medium">Login</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium transition-colors shadow"
                >
                  <AiOutlineUserAdd size={18} />
                  <span>Register</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </nav>
  )
}

export default Navigation
