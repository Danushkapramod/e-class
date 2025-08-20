import ClassView from '../class/ClassView';
import CreateStudent from '../students/CreateStudent';
import StudentLayout from '../students/StudentLayout';
import StudentTableAll from '../students/StudentTableAll';
import UpdateStudent from '../students/UpdateStudent';

export const StudentRoutes = {
  path: 'students',
  element: <StudentLayout />,
  children: [
    {
      path: '',
      element: <StudentTableAll />,
    },
    {
      path: 'new',
      element: <CreateStudent />,
    },

    {
      path: ':id',
      element: <ClassView />,
    },
    {
      path: ':id/update',
      element: <UpdateStudent />,
    },
    {
      path: ':id/delete',
      element: <div>Delete Class</div>,
    },
  ],
};
