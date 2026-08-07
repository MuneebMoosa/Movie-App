import React from 'react'
import { Link } from 'react-router'
const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-72 bg-zinc-900 border-r border-zinc-800 shadow-2xl">
      <aside className="h-full text-white flex flex-col">
        {/* Header */}
        <div className="px-8 py-8 border-b border-zinc-800">
          <h2 className="text-2xl font-bold text-teal-400">
            Admin Panel
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Movie Management
          </p>
        </div>

        {/* Navigation */}
        <ul className="flex-1 px-5 py-8 space-y-3">

          <li>
            <Link
              to="/admin/movies/dashboard"
              className="block rounded-xl px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 font-medium text-white shadow-lg transition hover:scale-[1.02]"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/admin/movies/create"
              className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-zinc-800 hover:text-teal-400 transition"
            >
              Create Movie
            </Link>
          </li>

          <li>
            <Link
              to="/admin/movies/genres"
              className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-zinc-800 hover:text-teal-400 transition"
            >
              Create Genre
            </Link>
          </li>

          <li>
            <Link
              to="/admin/movie-list"
              className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-zinc-800 hover:text-teal-400 transition"
            >
              Update Movie
            </Link>
          </li>

          <li>
            <Link
              to="/admin/movies/comments"
              className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-zinc-800 hover:text-teal-400 transition"
            >
              Comments
            </Link>
          </li>

        </ul>
      </aside>
    </div>
  );
};

export default Sidebar