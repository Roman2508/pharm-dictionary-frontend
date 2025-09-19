import { createBrowserRouter } from "react-router"

import TestPage from "./pages/test-page"
import CardPage from "./pages/card-page"
import RootLayout from "./layouts/root-layout"
import DictionariesPage from "./pages/dictionaries-page"
import ExerciseListPage from "./pages/exercise-list-page"
import ExerciseTypesPage from "./pages/exercise-types-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DictionariesPage />,
  },
  {
    path: "/exercises",
    Component: RootLayout,
    children: [
      { index: true, Component: ExerciseTypesPage },

      { path: "tests", element: <ExerciseListPage variant="test" /> },
      { path: "tests/:id", element: <TestPage /> },

      { path: "cards", element: <ExerciseListPage variant="card" /> },
      { path: "cards/:id", element: <CardPage /> },
    ],
  },
])
