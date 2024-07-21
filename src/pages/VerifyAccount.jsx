import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../ui/components/Button';
import { useVerifyEmail } from '../authentication/useVerifyEmail';
import { useEffect, useRef } from 'react';
import Spinner from '../ui/components/Spinner';

function VerifyAccount() {
  const { mutate, isPending, isSuccess, isError, error } = useVerifyEmail();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasRunRef = useRef(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token || hasRunRef.current) return;

    mutate(token);
    hasRunRef.current = true;
  }, [mutate, searchParams]);

  if (isPending) return <Spinner />;
  if (isSuccess)
    return (
      <div className="flex h-screen items-center justify-center text-slate-700">
        <div className=" mx-2 w-[28rem] min-w-72 rounded px-8 py-24 text-center shadow-2xl">
          <span className="material-symbols-outlined h-max origin-top scale-[280%] pb-14 font-light text-blue-600">
            add_task
          </span>
          <p className="pb-4 text-xl">Your account has been successfully verified</p>
          <p className="pb-6 text-center align-middle">
            Thank you for verifying your email address. You can now proceed to login.
          </p>
          <Button
            onClick={() => navigate('/login')}
            type="primary"
            className="!flex !w-full !justify-center !py-3 !normal-case"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );

  if (error || isError)
    return (
      <div className="flex h-screen items-center justify-center  text-slate-700">
        <div className=" mx-2 w-[28rem] min-w-72 rounded px-8 py-24 text-center shadow-2xl">
          <span className="material-symbols-outlined h-max origin-top scale-[280%] pb-14 font-light text-blue-600">
            sentiment_dissatisfied
          </span>
          <p className="pb-4 text-xl">Account Verification Unsuccessful</p>
          <p className="pb-6 text-center align-middle">
            We regret to inform you that your account verification was unsuccessful. Please try
            verifying your account again or contact our support team for assistance.
          </p>
        </div>
      </div>
    );

  // Default case: Render nothing if not pending, success, or error
}

export default VerifyAccount;
