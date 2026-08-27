import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CiMail } from "react-icons/ci";
import  {useForgotPasswordMutation}  from "../../redux/api/users.js";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email).unwrap();

      setIsSubmitted(true);

      toast.success("Password reset link sent successfully.");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 sm:py-12">
      <div className="bg-surface/80 border border-border p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">

        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                Forgot Password?
              </h1>

              <p className="text-text-secondary text-sm mt-2">
                Enter your email address and we'll send you a link to
                reset your password.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-text-secondary"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary/20 cursor-pointer"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
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
          </>
        ) : (
          <div className="text-center flex flex-col items-center py-4">
            <div className="flex items-center justify-center">
              <CiMail className="text-5xl text-primary" />
            </div>

            <h2 className="text-xl font-bold text-text-primary">
              Check your email
            </h2>

            <p className="text-text-secondary text-sm mt-2">
              We've sent a password reset link to:
            </p>

            <p className="text-text-primary font-semibold text-sm mt-2 break-all">
              {email}
            </p>

            <p className="text-text-secondary text-sm mt-4">
              Check your inbox and follow the link to create a new password.
            </p>

            <Link
              to="/login"
              className="inline-block mt-6 text-sm text-primary hover:underline font-semibold"
            >
              ← Back to Login
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;