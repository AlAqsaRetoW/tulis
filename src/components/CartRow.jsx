import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Trash2, Plus, Minus } from "lucide-react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import {
  incrementQty,
  decrementQty,
  removeItemFromCart,
} from "../app/cartActions";

function CartRow({ item }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);

  const handleIncrement = (id) => {
    if (user) {
      dispatch(incrementQty(id, user.uid));
    }
  };

  const handleDecrement = (id) => {
    if (user) {
      dispatch(decrementQty(id, user.uid));
    }
  };

  const handleRemove = (id) => {
    if (user) {
      dispatch(removeItemFromCart(id, user.uid));
    }
  };

  useEffect(() => {
    const fetchProductById = async () => {
      const product = await getDoc(doc(db, "products", item.productId));
      setProduct(product.data());
    };
    fetchProductById();
  }, [dispatch, item.productId]);

  if (!product) {
    return (
      <div className="theme-bg-surface theme-border border p-4 rounded-lg animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/2 mb-2 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/3 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between theme-border theme-bg-surface hover:theme-bg-elevated border p-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={product.images}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div>
          <h3 className="font-semibold theme-text">{product.name}</h3>
          <p className="theme-text-secondary">
            Rp{product.price.toLocaleString()}
          </p>
          <p className="theme-text-muted text-sm mt-1">
            Total: Rp{(product.price * item.qty).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDecrement(item.id)}
            className="p-2 rounded-md theme-bg-surface hover:theme-bg-elevated theme-text transition-all duration-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={item.qty <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-semibold theme-text">
            {item.qty}
          </span>
          <button
            onClick={() => handleIncrement(item.id)}
            className="p-2 rounded-md theme-bg-surface hover:theme-bg-elevated theme-text transition-all duration-300 hover:shadow-sm"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={() => handleRemove(item.id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
          aria-label="Remove item"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default CartRow;
