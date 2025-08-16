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
        <div className="theme-border theme-border-hover theme-bg-surface hover:theme-bg-elevated border rounded-lg p-4 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl">
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md"
          />
          <h2 className="mt-3 font-semibold theme-text">{product.name}</h2>
          <p className="theme-text-secondary">{product.desc}</p>
          <p className="font-bold mt-2 theme-accent">
            Rp {product.price.toLocaleString()}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          className="theme-accent-bg theme-accent-hover text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
