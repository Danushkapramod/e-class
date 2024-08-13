import ClassForm from '../class/ClassForm';
import ClassView from '../class/ClassView';
import Update from '../class/Update';
import StudentLayout from '../students/StudentLayout';
import StudentTableAll from '../students/StudentTableAll';

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
      element: <ClassForm />,
    },

    {
      path: ':id',
      element: <ClassView />,
    },
    {
      path: ':id/update',
      element: <Update />,
    },
    {
      path: ':id/delete',
      element: <div>Delete Class</div>,
    },
  ],
};
