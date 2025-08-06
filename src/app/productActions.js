import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { setProduct, setProducts, setLoading, setError } from './productSlice';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch(setProducts(data));
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const querySnapshot = await getDoc(doc(db, 'products', id));
    dispatch(setProduct(querySnapshot.data()));
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await addDoc(collection(db, 'products'), {
      category: product.category,
      desc: product.desc,
      images: product.images,
      name: product.name,
      price: Number(product.price),
      stock: Number(product.stock),
    });
    dispatch(fetchProducts());
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editProduct = (product) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await updateDoc(doc(db, 'products', product.id), {
      category: product.category,
      desc: product.desc,
      images: product.images,
      name: product.name,
      price: Number(product.price),
      stock: Number(product.stock),
    });
    dispatch(fetchProducts());
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await deleteDoc(doc(db, 'products', id));
    dispatch(fetchProducts());
  } catch (err) {
    console.error(err);
    dispatch(setError(err));
  } finally {
    dispatch(setLoading(false));
  }
};
