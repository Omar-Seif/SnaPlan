import type {JSX} from "react";
import { ShieldBan, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function UnauthorizedPage(): JSX.Element {
  const handleGoBack = () => {
    window.history.back();
  };
  const navigate = useNavigate();
  const handleGoToHome = () =>{
    navigate("/attendee/Explore")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Illustration/Icon Header */}
        <div className="bg-rose-50 p-12 flex justify-center">
          <div className="flex items-center justify-center bg-rose-100 rounded-full w-24 h-24">
            <ShieldBan className="h-12 w-12 text-rose-600" aria-hidden="true" />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-10 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-8">
            Sorry, you don't have the necessary permissions to view this page.
            Please contact the administrator if you believe this is a mistake.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center px-5 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
            <button
              onClick={handleGoToHome}
              className="inline-flex items-center justify-center px-5 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
