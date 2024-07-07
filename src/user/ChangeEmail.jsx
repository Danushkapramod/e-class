import Button from "../ui/components/Button";
import { useChangeEmail } from "../authentication/useChangeEmail";
import { useRequestResetPin } from "../authentication/useEmailChangePin";
import { useEffect, useRef } from "react";

export default function ChangeEmail({ window, setWindow }) {
  return window === "EmailChangeWindow" ? (
    <EmailChangeWindow setWindow={setWindow} window={window} />
  ) : (
    <EnterPinWindow setWindow={setWindow} window={window} />
  );
}

function EmailChangeWindow({ setWindow }) {
  const { mutate, isPending } = useRequestResetPin(handleSuccess);

  function onReqEmailChangePin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = Object.fromEntries(formData.entries());
    mutate(email);
  }

  function handleSuccess() {
    setWindow("EnterPinWindow");
  }

  return (
    <form onSubmit={onReqEmailChangePin}>
      <div className=" mt-4 flex flex-col justify-between  px-4">
        <label className=" pb-1" htmlFor="new_email">
          Enter new email address
        </label>
        <input
          className=" w-full rounded  border border-slate-700 bg-white/15 px-4 
                         py-2  focus:outline focus:outline-slate-400 "
          type="email"
          required
          id="new_email"
          placeholder="new email"
          name="new_email"
        ></input>
      </div>

      <div className="mt-auto flex justify-center pt-6">
        <Button
          disabled={isPending}
          spinner={isPending}
          className="px-8"
          type="primary"
        >
          submit
        </Button>
      </div>
    </form>
  );
}

function EnterPinWindow({ setWindow }) {
  const inputRef = useRef();
  const { mutate, isPending } = useChangeEmail(handleSuccess);

  function changeEmail(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pin = Object.fromEntries(formData.entries());
    mutate(pin);
  }

  function handleSuccess() {
    setWindow("EmailChangeWindow");
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={changeEmail} className=" relative flex flex-col">
      <div className=" mt-4 flex h-full flex-col items-center justify-center">
        <label className=" pb-2 text-xl" htmlFor="pin">
          Enter verification pin
        </label>
        <input
          className=" focus:right max-w-56 overflow-visible rounded-lg border 
           border-slate-600 bg-white/10 px-6 py-3 text-3xl font-medium tracking-widest 
           outline-none focus:ring  focus:ring-slate-500 "
          type="text"
          placeholder="******"
          id="pin"
          required
          ref={inputRef}
          name="pin"
        />
      </div>

      <div className="mt-auto flex justify-center pt-6">
        <Button
          disabled={isPending}
          spinner={isPending}
          className="px-8"
          type="primary"
        >
          submit
        </Button>
      </div>
      <button>
        <span
          onClick={() => setWindow("EmailChangeWindow")}
          className=" material-symbols-outlined absolute right-2 top-2 rounded-full bg-white/[0.05] p-2 hover:bg-white/10"
        >
          close
        </span>
      </button>
    </form>
  );
}
