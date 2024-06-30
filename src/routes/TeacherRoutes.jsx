import CreateTeacher from "../teacher/CreateTeacher";
import TeacherLayout from "../teacher/TeacherLayout";
import TeachersTable from "../teacher/TeachersTable";
import Update from "../teacher/Update";
import ViewTeacher from "../teacher/ViewTeacher";

export const TeachersRoutes = {
  path: "teachers",
  element: <TeacherLayout />,
  children: [
    {
      path: "",
      element: <TeachersTable />,
    },
    {
      path: ":id/update",
      element: <Update />,
    },
    {
      path: ":id",
      element: <ViewTeacher />,
    },
    {
      path: "new",
      element: <CreateTeacher />,
    },
  ],
};
