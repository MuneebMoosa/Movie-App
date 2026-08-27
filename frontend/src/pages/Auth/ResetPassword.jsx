import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../redux/api/users.js";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        token,
        newPassword,
        confirmPassword,
      }).unwrap();

      toast.success("Password reset successfully");

      navigate("/login");
    } catch (err) {
      toast.error(
        err?.data?.message || "Invalid or expired reset link"
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 sm:py-12">
      <div className="bg-surface/80 border border-border p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
            Reset Password
          </h1>

          <p className="text-text-secondary text-sm mt-2">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">

          <div className="space-y-1.5">
            <label
              htmlFor="newPassword"
              className="block text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              New Password
            </label>

            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              Confirm Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary/20 cursor-pointer"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-primary hover:underline font-semibold"
          >
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;