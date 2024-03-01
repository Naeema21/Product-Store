import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ProductList from './pages/product';
import ProductDetails from './pages/ProductDetail';
import Header from './layout/header';

const Routes = createBrowserRouter([
  {
    path: "/",
    element:<Header />,
    children: [
      { path: "/products", element: <ProductList /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/", element: <ProductList /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider  router={Routes}/>
    </div>
  );
}

export default App;
