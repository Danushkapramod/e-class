import { FadeLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className=" absolute inset-0 flex items-center justify-center">
      <FadeLoader color="#36d7b7" />
    </div>
  );
}

export default Spinner;
