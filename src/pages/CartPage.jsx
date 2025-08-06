import { useSelector, useDispatch } from "react-redux";
import { getItemFromCart } from "../app/cartActions";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CartRow from "../components/CartRow";

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      dispatch(getItemFromCart(user.uid));
    }
  }, [dispatch, user]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.totalPrice || 0;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  };

  return (
    <div className="max-w-screen-xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartRow key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-80 p-4 border rounded-lg border-gray-200">
              <div className="flex justify-between mb-4">
                <span>Total:</span>
                <span className="font-bold">
                  Rp{calculateTotal().toLocaleString()}
                </span>
              </div>
              <button className="w-full bg-sky-700 text-white py-2 rounded-lg hover:bg-sky-800">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
