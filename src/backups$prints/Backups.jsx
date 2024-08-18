import useSingupDrive from './useSingupDrive';
import { Button } from '../ui/components/ButtonNew';
import Checkbox from '../ui/components/Checkbox';
import useBackup from './useBackup';
import { getBackupAcccount } from '../services/apiAccets';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const authUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=89181791749-i81vabbfv9pk58u2o25l5itu7jpke2j2.apps.googleusercontent.com&` +
  `redirect_uri=http://localhost:5173/app/backups&` +
  `response_type=code&` +
  `scope=https://www.googleapis.com/auth/drive.file%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&` +
  `access_type=offline`;

function Backups() {
  const { data, isPending } = useSingupDrive();
  const { mutate, isPending: backupPending } = useBackup();

  const {
    data: driveAcccoun,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: 'driveAcccoun',
    queryFn: getBackupAcccount,
    retry: false,
  });

  useEffect(() => {
    if (data) refetch();
  }, [data, refetch]);

  function onSubmit() {
    window.open(authUrl, '_blank');
  }
  function backupHandler() {
    mutate({ endPoit: 'drive-backup-classpayments' });
  }
  return (
    <div className=" mt-4 flex justify-center ">
      <div className="flex h-96  w-full max-w-lg flex-col gap-2 rounded  border-border-2   p-4 px-6">
        <p className=" text-center text-2xl font-medium">Backup Settings</p>

        <div className=" mt-6">
          <div className=" text-lg">Google Account</div>
          {!driveAcccoun ? (
            <Button
              spinner={isPending || isLoading}
              size="sm"
              onClick={onSubmit}
              label="Add Google Account"
            />
          ) : (
            <div className=" px-2 py-1  text-text--muted">{driveAcccoun}</div>
          )}
        </div>
        {/* {data && (
          <div>
            <Button label="Backup" />
          </div>
        )} */}
        <div className=" mt-6">
          <div>
            <div className=" text-lg">Select Backup Files</div>

            <div className=" ">
              <p className=" flex w-max items-center gap-1 rounded border-border-3 py-1 text-sm opacity-80">
                <span className=" material-symbols-outlined scale-75">check</span>
                Class Payments
                <span className=" material-symbols-outlined scale-[70%] cursor-default">help</span>
              </p>

              <p className=" mb-1 text-sm">Optional*</p>
              <ul className=" flex gap-2">
                <li className=" flex w-max items-center gap-2 rounded border border-border-3 px-3 py-1.5 text-sm">
                  <Checkbox />
                  Class Payments
                </li>
                <li className=" flex w-max items-center gap-2 rounded border border-border-3 px-3 py-1.5 text-sm">
                  <Checkbox />
                  Classes
                </li>
                <li className=" flex w-max items-center gap-2 rounded border border-border-3 px-3 py-1.5 text-sm">
                  <Checkbox />
                  Teachers
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className=" mt-auto flex">
          <Button
            disabled={backupPending}
            spinner={backupPending}
            onClick={backupHandler}
            label="Backup"
          />
        </div>
      </div>
    </div>
  );
}

export default Backups;
