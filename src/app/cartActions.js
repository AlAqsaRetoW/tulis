import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { setLoading, setError, setCart } from './cartSlice';

export const getItemFromCart = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const cartQuery = query(
      collection(db, 'cart'),
      where('status', '==', 'unpaid'),
      where('userId', '==', userId)
    );
    const cartSnapshot = await getDocs(cartQuery);
    const cartItems = cartSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(setCart(cartItems));
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addItemToCart = (productId, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const product = await getDoc(doc(db, 'products', productId));
    const productData = product.data();
    
    // Ensure price is a valid number
    const price = Number(productData.price) || 0;

    const cartQuery = query(
      collection(db, 'cart'),
      where('productId', '==', productId),
      where('status', '==', 'unpaid'),
      where('userId', '==', userId)
    );
    const cartSnapshot = await getDocs(cartQuery);

    if (!cartSnapshot.empty) {
      const cartDoc = cartSnapshot.docs[0];
      const currentQty = Number(cartDoc.data().qty) || 0;
      const newQty = currentQty + 1;
      await updateDoc(doc(db, 'cart', cartDoc.id), {
        qty: newQty,
        totalPrice: price * newQty,
      });
    } else {
      await addDoc(collection(db, 'cart'), {
        productId: productId,
        userId: userId,
        qty: 1,
        status: 'unpaid',
        totalPrice: price,
      });
    }

    dispatch(getItemFromCart(userId));
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const incrementQty = (id, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const cartDoc = await getDoc(doc(db, 'cart', id));
    const cartData = cartDoc.data();
    if (cartData) {
      const productDoc = await getDoc(doc(db, 'products', cartData.productId));
      const productData = productDoc.data();
      
      // Ensure values are valid numbers
      const price = Number(productData.price) || 0;
      const currentQty = Number(cartData.qty) || 0;
      const newQty = currentQty + 1;
      
      await updateDoc(doc(db, 'cart', id), {
        qty: newQty,
        totalPrice: price * newQty,
      });
    }

    dispatch(getItemFromCart(userId));
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const decrementQty = (id, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const cartDoc = await getDoc(doc(db, 'cart', id));
    const cartData = cartDoc.data();

    if (cartData) {
      // Get product price from products collection
      const productDoc = await getDoc(doc(db, 'products', cartData.productId));
      const productData = productDoc.data();

      // Ensure values are valid numbers
      const price = Number(productData.price) || 0;
      const currentQty = Number(cartData.qty) || 0;
      const newQty = currentQty - 1;
      
      await updateDoc(doc(db, 'cart', id), {
        qty: newQty,
        totalPrice: price * newQty,
      });
      dispatch(getItemFromCart(userId));
    }
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const removeItemFromCart = (id, userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const cartDoc = await getDoc(doc(db, 'cart', id));
    const cartData = cartDoc.data();
    if (cartData) {
      await deleteDoc(doc(db, 'cart', id));
      dispatch(getItemFromCart(userId));
    }
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};
