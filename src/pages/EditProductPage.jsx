import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import { successAlert, errorAlert } from '../utils/Swal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, editProduct } from '../app/productActions';
import UploadWidget from '../components/UploadWidget';

function EditProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { id } = useParams();

  const [name, setName] = useState('');
  const [images, setImages] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(editProduct({ id, name, images, category, desc, price, stock }));
      successAlert('Success Edit Product!', `Product has been updated`);
      navigate('/admin');
    } catch (err) {
      errorAlert('Error Edit Product!', err.message);
    }
  };

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImages(product.images);
      setCategory(product.category);
      setDesc(product.desc);
      setPrice(product.price);
      setStock(product.stock);
      console.log(product.category);
    }

  }, [product]);

  return (
    <>
      {/* <!-- Add Product Page Start --> */}
      <main className="my-5 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mt-5">Edit Product</h1>
        <div className="grid grid-cols-4 gap-5 mt-10">
          <div className="col-span-2 mr-20">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label>Product Name:</label>
                <input
                  type="text"
                  placeholder="Product name..."
                  className="p-2 border border-gray-300 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col mt-3">
                <label>Image:</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Image URL..."
                    className="p-2 border border-gray-300 rounded-md flex-1"
                    value={images}
                    disabled
                  />
                  <UploadWidget setImages={setImages} />
                </div>
              </div>
              <div className="flex flex-col mt-3">
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="p-2 border border-gray-300 rounded-md"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col mt-3">
                <label>Category:</label>
                <select
                  className="p-2 border border-gray-300 rounded-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="pen">Pen</option>
                  <option value="pencil">Pencil</option>
                  <option value="brush">Brush</option>
                  <option value="case">Case</option>
                </select>
              </div>
              <div className="flex gap-5 mt-3">
                <div className="flex flex-col flex-1">
                  <label>Price:</label>
                  <input
                    type="number"
                    placeholder="Price..."
                    className="p-2 border border-gray-300 rounded-md"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col mt-3">
                <label>Stock:</label>
                <input
                  type="number"
                  placeholder="Stock"
                  className="p-2 border border-gray-300 rounded-md"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
              <button
                className=" bg-sky-700 rounded-full py-4 px-2 w-full text-white font-bold mt-10 flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
              >
                <Edit />
                Edit Product
              </button>
            </form>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            {images && <img width={400} src={images} alt={product.name} />}
          </div>
        </div>
      </main>
      {/* <!-- Add Product Page End --> */}
    </>
  );
}

export default EditProductPage;
