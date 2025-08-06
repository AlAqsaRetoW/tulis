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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-between border p-4 rounded-lg border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={product.images}
          alt={product.name}
          className="w-24 h-24 object-cover"
        />
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">Rp{product.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDecrement(item.id)}
            className="p-1 rounded-md hover:bg-gray-100"
            disabled={item.qty <= 1}
          >
            <Minus size={20} />
          </button>
          <span className="w-8 text-center">{item.qty}</span>
          <button
            onClick={() => handleIncrement(item.id)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <Plus size={20} />
          </button>
        </div>

        <button
          onClick={() => handleRemove(item.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}

export default CartRow;
