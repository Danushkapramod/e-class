// eslint-disable-next-line react/prop-types
function Error({ errorMsg }) {
  return (
    <div className=" mt-[15vh] flex items-center justify-center  text-amber-500">
      <span className=" material-symbols-outlined pr-2">error</span>
      {errorMsg}
    </div>
  );
}

export default Error;
