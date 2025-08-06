import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../app/cartActions";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleAddToCart = () => {
    if (user) {
      dispatch(addItemToCart(product.id, user.uid));
      navigate("/cart");
    }
  };
  return (
    <div className="relative group min-h-96">
      <Link to={`/detail-product/${product.id}`} className="block">
        <div className="border border-gray-300 rounded-lg p-4">
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md"
          />
          <h2 className="mt-3 font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.desc}</p>
          <p className="font-bold mt-2">Rp {product.price.toLocaleString()}</p>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="block bg-sky-700 hover:bg-sky-900 text-white p-2 rounded-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
