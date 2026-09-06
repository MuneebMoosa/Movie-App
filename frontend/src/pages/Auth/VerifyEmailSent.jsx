import { useLocation, useNavigate } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";

const VerifyEmailSent = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const email = new URLSearchParams(search).get("email");

  return (
    <div className="w-full max-w-5xl mx-auto py-8 sm:py-12">
      <div className="max-w-md mx-auto bg-surface/80 border border-border p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-md">

        <div className="text-center">

          {/* Email Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <MdMarkEmailRead className="w-9 h-9 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight mb-3">
            Check your email
          </h1>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-6">
            We've sent a verification link to
          </p>

          {email && (
            <p className="mt-2 text-text-primary font-semibold break-all">
              {email}
            </p>
          )}

          <p className="text-text-secondary text-sm leading-6 mt-4">
            Please check your inbox and click the verification link
            to activate your account.
          </p>

          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-8 py-3 bg-primary hover:bg-primary-hover text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary/20 cursor-pointer"
          >
            Go to Login
          </button>

          {/* Resend */}
          <button
            onClick={() => navigate("/resend-verification")}
            className="mt-5 text-sm text-text-secondary hover:text-text-primary hover:underline transition-colors cursor-pointer"
          >
            Didn't receive the email? Resend
          </button>

        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSent;