import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResendVerificationEmailMutation } from "../../redux/api/users.js";

const ResendVerification = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [ resendVerificationEmail, { isLoading, isSuccess, isError, error }, ] = useResendVerificationEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      await resendVerificationEmail(email).unwrap();
    } catch (error) {
      console.error("Resend verification failed:", error);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {!isSuccess ? (
          <>
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">
                Verify your email
              </h1>

              <p className="text-gray-500">
                Enter the email address you used to create your account
                and we'll send you a new verification link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              {/* Error */}
              {isError && (
                <p className="text-sm text-red-500">
                  {error?.data?.message ||
                    "Unable to send verification email."}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {isLoading
                  ? "Sending..."
                  : "Send Verification Email"}
              </button>
            </form>

            {/* Back to login */}
            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-gray-600 hover:text-black"
              >
                Back to Login
              </button>
            </div>
          </>
        ) : (
          /* Success */
          <div className="text-center">

            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>

            <h1 className="text-2xl font-bold mb-3">
              Verification email sent!
            </h1>

            <p className="text-gray-500 mb-6">
              We've sent a new verification link to{" "}
              <span className="font-medium text-gray-700">
                {email}
              </span>
              .
            </p>

            <p className="text-sm text-gray-400 mb-6">
              Please check your inbox and click the verification
              link to verify your account.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResendVerification;