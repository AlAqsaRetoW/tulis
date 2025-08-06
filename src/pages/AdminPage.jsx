import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProductTable from '../components/ProductTable';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../app/productActions';

function AdminPage() {
  const dispatch = useDispatch();
  const {
    products,
    loading: productLoading,
    error,
  } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const { user, loading, name, role } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
    dispatch(fetchProducts());
  }, [navigate, user, loading, dispatch]);

  if (loading)
    <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
      <h1 className="text-2xl">Loading data...</h1>
    </div>;

  if (error)
    <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
      <h1 className="text-2xl">Failed to load data...</h1>
    </div>;

  return (
    <>
      {/* <!-- Admin Page Start --> */}
      <main className="my-5 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mt-5">Welcome!</h1>
        <span className="text-xl">
          {name} - {user?.email} - {role}
        </span>
        <ProductTable products={products} loadingProduct={productLoading} />
      </main>
      {/* <!-- Admin Page End --> */}
    </>
  );
}

export default AdminPage;
