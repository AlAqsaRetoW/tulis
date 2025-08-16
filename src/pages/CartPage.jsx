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
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-8 theme-text">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="theme-text-secondary text-xl">Your cart is empty</p>
          <p className="theme-text-muted mt-2">
            Add some products to get started!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartRow key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-80 p-6 theme-border theme-bg-surface border rounded-lg shadow-lg">
              <div className="flex justify-between mb-6">
                <span className="theme-text-secondary text-lg">Total:</span>
                <span className="font-bold text-xl theme-accent">
                  Rp{calculateTotal().toLocaleString()}
                </span>
              </div>
              <button className="w-full theme-accent-bg theme-accent-hover text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
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
