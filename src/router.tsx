import { createBrowserRouter } from 'react-router'

import TestsPage from './pages/tests-page'
import CardsPage from './pages/cards-page'
import RootLayout from './layouts/root-layout'
import SimulatorPage from './pages/simulator-page'
import DictionariesPage from './pages/dictionaries-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DictionariesPage />,
  },
  {
    path: '/simulator',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: SimulatorPage,
      },
      {
        path: 'tests',
        Component: TestsPage,
        children: [{ path: ':id', Component: SimulatorPage }],
      },
      {
        path: 'cards',
        Component: CardsPage,
        children: [{ path: ':id', Component: SimulatorPage }],
      },
    ],
  },
])
