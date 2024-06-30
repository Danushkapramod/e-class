import OptionLayout from "../option/OptionLayout";
import Options from "../option/Options";

export const OptionRoutes = {
  path: "options",
  element: <OptionLayout />,
  children: [
    {
      path: "",
      element: <Options />,
    },
  ],
};
