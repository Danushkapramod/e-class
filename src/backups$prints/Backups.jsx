import useSingupDrive from './useSingupDrive';
import { Button } from '../ui/components/ButtonNew';
import Checkbox from '../ui/components/Checkbox';
import useBackup from './useBackup';
import { getBackupAcccount } from '../services/apiAccets';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsBackuping } from '../GlobalUiState';

const authUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `client_id=89181791749-i81vabbfv9pk58u2o25l5itu7jpke2j2.apps.googleusercontent.com&` +
  `redirect_uri=http://localhost:5173/app/backups&` +
  `response_type=code&` +
  `scope=https://www.googleapis.com/auth/drive.file%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&` +
  `access_type=offline`;

function Backups() {
  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const { isBackuping } = useSelector((store) => store.global);
  const { data, isPending } = useSingupDrive();
  const { mutateAsync } = useBackup();
  const [files, setFiles] = useState([]);
  console.log(files);

  const {
    data: driveAcccoun,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: 'driveAccount',
    queryFn: !isBackuping ? getBackupAcccount : null,
    retry: 3,
  });

  useEffect(() => {
    if (data && !isBackuping) {
      queryclient.removeQueries({ queryKey: 'driveAccount' });
      refetch();
    }
  }, [data, isBackuping, queryclient, refetch]);

  function onSubmit() {
    window.open(authUrl, '_blank');
  }
  function backupHandler() {
    dispatch(setIsBackuping(true));
    mutateAsync({ endPoit: 'drive-backup-classpayments' })
      .then(() => {
        if (files.includes('classes')) return mutateAsync({ endPoit: 'drive-backup-classes' });
      })
      .then(() => {
        if (files.includes('teachers')) return mutateAsync({ endPoit: 'drive-backup-teachers' });
      })
      .then(() => {
        if (files.includes('students')) return mutateAsync({ endPoit: 'drive-backup-students' });
      })
      .finally(() => {
        dispatch(setIsBackuping(false));
      });
  }
  return (
    <div className="mt-[8%] flex items-center justify-center ">
      <div className="flex h-[25rem] w-full max-w-sm flex-col  gap-2 rounded  border-border-2 p-4 px-6">
        <p className=" text-center text-2xl font-medium">Backup Settings</p>
        <div className="flex h-full flex-col justify-between">
          <div className=" mt-6">
            <div className=" text-xl">Google Account</div>
            {!driveAcccoun ? (
              <Button
                spinner={isPending || isLoading}
                size="sm"
                onClick={onSubmit}
                label="Add Google Account"
              />
            ) : (
              <div className=" flex items-end justify-between">
                <div className=" px-2 py-1 text-text--muted">{driveAcccoun}</div>
                <button
                  onClick={onSubmit}
                  className="material-symbols-outlined scale-[70%] rounded border border-border-3 p-1 px-2 text-text--secondery"
                >
                  edit
                </button>
              </div>
            )}
          </div>

          <div>
            <div className=" text-xl">Backup Files</div>

            <div className=" ">
              <p className=" flex w-max items-center gap-1 rounded border-border-3 py-1 text-sm opacity-80">
                <span className=" material-symbols-outlined scale-75">check</span>
                Class Payments
                <span className=" material-symbols-outlined scale-[70%] cursor-default">help</span>
              </p>

              <p className=" mb-1 text-sm">Optional*</p>
              <ul className=" flex flex-wrap gap-2">
                <li className=" flex w-max items-center gap-2 rounded border border-border-3 px-3 py-1.5 text-sm">
                  <Checkbox
                    id="backupfileClass"
                    _checked={files.includes('classes')}
                    falseCall={() => setFiles(files.filter((file) => file !== 'classes'))}
                    trueCall={() => setFiles([...files, 'classes'])}
                  />
                  Classes
                </li>
                <li className=" flex w-max items-center gap-2 rounded border border-border-3 px-3 py-1.5 text-sm">
                  <Checkbox
                    id="backupfileTeacher"
                    _checked={files.includes('teachers')}
                    falseCall={() => setFiles(files.filter((file) => file !== 'teachers'))}
                    trueCall={() => setFiles([...files, 'teachers'])}
                  />
                  Teachers
                </li>
                <li className=" flex w-max items-center gap-2 rounded border border-border-3 px-3 py-1.5 text-sm">
                  <Checkbox
                    id="backupfileStudent"
                    _checked={files.includes('students')}
                    falseCall={() => setFiles(files.filter((file) => file !== 'students'))}
                    trueCall={() => setFiles([...files, 'students'])}
                  />
                  Students
                </li>
              </ul>
            </div>
          </div>

          <div className="">
            <Button
              disabled={isBackuping}
              spinner={isBackuping}
              onClick={backupHandler}
              label="Backup"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Backups;
