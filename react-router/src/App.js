import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailsPage from './pages/ProductDetails';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      // when removing / from the paths, they become relative to the root's
      // { path: '', element: <HomePage /> },
      { index: true, element: <HomePage /> }, // this means homepage becomes default when the parent is called
      { path: 'products', Component: ProductsPage },
      { path: 'products/:id', Component: ProductDetailsPage }
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;