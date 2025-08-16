import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProductTable from "../components/ProductTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../app/productActions";

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
      navigate("/login");
    }
    dispatch(fetchProducts());
  }, [navigate, user, loading, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <h1 className="text-2xl theme-text">Loading data...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <h1 className="text-2xl theme-text">Failed to load data...</h1>
        <p className="theme-text-secondary mt-2">
          Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* <!-- Admin Page Start --> */}
      <main className="my-5 max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mt-5 theme-text">Welcome!</h1>
          <div className="mt-2 theme-text-secondary">
            <span className="text-lg">
              {name} - {user?.email} -{" "}
              <span className="theme-accent font-semibold">{role}</span>
            </span>
          </div>
        </div>
        <ProductTable products={products} loadingProduct={productLoading} />
      </main>
      {/* <!-- Admin Page End --> */}
    </>
  );
}

export default AdminPage;
