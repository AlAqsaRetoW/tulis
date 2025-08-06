import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useContext, useState } from 'react';
import { fetchProducts } from '../app/productActions';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { query, collection, where, getDocs, orderBy } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, role, name } = useContext(AuthContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState(null);

  const handleReset = () => {
    setFilter('');
    setSort('');
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    dispatch(fetchProducts());
  }, [user, loading]);

  useEffect(() => {
    const filterProducts = async () => {
      setProductLoading(true);
      setProductError(null);
      try {
        let q = query(collection(db, 'products'));

        // Filter products by category
        if (filter) {
          q = query(q, where('category', '==', filter));
        }

        // Sorting products by price
        if (sort === 'price-asc') {
          q = query(q, orderBy('price', 'asc'));
        } else if (sort === 'price-desc') {
          q = query(q, orderBy('price', 'desc'));
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
        setProductError(err);
      } finally {
        setProductLoading(false);
      }
    };
    filterProducts();
  }, [filter, sort]);

  return (
    <>
      {/* <!-- Home Page Start --> */}
      <main className="my-5 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mt-5">Welcome, {name || 'Guest'}!</h1>

        <div className="flex gap-4 mt-5">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option disabled>Filter by Category</option>
            <option value="">All</option>
            <option value="pen">Pen</option>
            <option value="pencil">Pencil</option>
            <option value="brush">Brush</option>
            <option value="case">Case</option>
          </select>

          <select
            className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <button
            className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
            onClick={handleReset}
          >
            Clear Filter
          </button>
        </div>

        {productLoading ? (
          <div className="grid grid-cols-5 gap-5 mt-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse min-h-96">
                <div className="h-52 bg-gray-200"></div>
                <div className="h-4 bg-gray-200 w-1/3 mt-2"></div>
                <div className="h-4 bg-gray-200 w-1/3 mt-2"></div>
                <div className="h-6 bg-gray-200 w-1/2 mt-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {!productLoading && filteredProducts.length === 0 && (
              <h1>Tidak ada data yang sesuai</h1>
            )}
            {!productLoading && productError && <h1>Error: {productError}</h1>}
            <div className="grid grid-cols-5 gap-5 mt-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>
      {/* <!-- Home Page End --> */}
    </>
  )
}

export default HomePage