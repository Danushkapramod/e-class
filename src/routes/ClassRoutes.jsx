import ClassesTable from "../class/ClassesTable";
import ClassForm from "../class/ClassForm";
import ClassLayout from "../class/ClassLayout";
import ClassView from "../class/ClassView";
import Update from "../class/Update";

export const ClassRoutes = {
  path: "classes",
  element: <ClassLayout />,
  children: [
    {
      path: "",
      element: <ClassesTable />,
    },
    {
      path: "new",
      element: <ClassForm />,
    },

    {
      path: ":id",
      element: <ClassView />,
    },
    {
      path: ":id/update",
      element: <Update />,
    },
    {
      path: ":id/delete",
      element: <div>Delete Class</div>,
    },
  ],
};
