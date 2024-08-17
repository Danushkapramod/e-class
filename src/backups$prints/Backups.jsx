import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../services/apiData';

function Backups() {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    async function fetchTokens() {
      if (params.get('code')) {
        const res = await axios.post(
          `${BASE_URL}/services/drive-oauth-signup`,
          {
            code: params.get('code'),
          },
          { withCredentials: true }
        );
        console.log(res.data);
      }
    }
    fetchTokens().then(setParams(''));
  }, [params, setParams]);

  function onSubmit() {
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=89181791749-i81vabbfv9pk58u2o25l5itu7jpke2j2.apps.googleusercontent.com&` +
      `redirect_uri=http://localhost:5173/app/backups&` +
      `response_type=code&` +
      `scope=https://www.googleapis.com/auth/drive.file&` +
      `access_type=offline`;

    window.open(authUrl, '_blank');
  }
  return (
    <div>
      <input className=" border bg-transparent" type="email" />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default Backups;
