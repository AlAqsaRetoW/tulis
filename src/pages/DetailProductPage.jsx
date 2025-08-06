import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../app/productActions";
import { ShoppingCart } from "lucide-react";
import { addItemToCart } from "../app/cartActions";
import { AuthContext } from "../context/AuthContext";

function DetailProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector((state) => state.product);
  const { user } = useContext(AuthContext);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addItemToCart(id, user.uid));
      navigate("/cart");
    }
  };

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-start justify-center pt-32">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex gap-10 p-8 max-w-5xl mx-auto">
      <div className="w-1/2 relative group">
        <img
          src={product?.images}
          alt={product?.name}
          className="w-96 object-cover rounded-md"
        />
      </div>
      <div className="w-1/2 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{product?.name}</h1>
        <p className="text-gray-600">{product?.desc}</p>
        <div className="text-2xl font-bold">
          <p className="font-bold mt-2">
            <span className="text-xs align-top">Rp</span>{" "}
            <span className="text-xl">{product?.price.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-sky-700 text-white rounded-full hover:bg-sky-900 flex items-center gap-2 cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
