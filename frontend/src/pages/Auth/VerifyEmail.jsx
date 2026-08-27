import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/api/users.js";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [verifyEmail, { isLoading, isError }] = useVerifyEmailMutation();

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        await verifyEmail(token).unwrap();

        navigate("/login");
      } catch (error) {
        console.error("Email verification failed:", error);
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  // While verifying
  if (isLoading) {
    return (
      <div className="h-screen overflow-hidden flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Verifying your email...
          </h2>

          <p className="mt-2 text-gray-500">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  // Verification failed
  if (isError) {
    return (
      <div className="h-screen overflow-hidden flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">

          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-2xl">✕</span>
          </div>

          <h1 className="text-2xl font-bold mb-3">
            Invalid Verification Link
          </h1>

          <p className="text-gray-500 mb-6">
            This verification link is invalid or has expired.
            Please request a new verification link.
          </p>

          <button
            onClick={() => navigate("/resend-verification")}
            className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800"
          >
            Resend Verification Email
          </button>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 text-sm text-gray-600 hover:text-black"
          >
            Back to Login
          </button>

        </div>
      </div>
    );
  }

  return null;
};

export default VerifyEmail;