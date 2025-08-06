import { Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../app/productActions';
import { successAlert, errorAlert, confirmDelete } from '../utils/Swal';

function ProductRow({ product, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    confirmDelete('Delete this product?', "This action cannot be reverted!").then(
      (result) => {
        if (result == true) {
          dispatch(deleteProduct(product.id));
          successAlert('Success!', 'Product has been deleted.');
        }
      }
    );
  };

  return (
    <tr>
      <td className="p-2 border text-center border-gray-300">{index + 1}</td>
      <td className="p-2 border font-bold text-center border-gray-300">
        {product.name}
      </td>
      <td className="p-2 border border-gray-300">
        <img
          className="mx-auto"
          width={200}
          src={product.images}
          alt={product.name}
        />
      </td>
      <td className="p-2 border text-center border-gray-300">
        {product.category}
      </td>
      <td className="p-2 border text-center border-gray-300">
        {product.desc}
      </td>
      <td className="p-2 border text-center border-gray-300">
        Rp{product.price.toLocaleString()}
      </td>
      <td className="p-2 border text-center border-gray-300">
        {product.stock.toLocaleString()}
      </td>
      <td className="text-center p-2 border border-gray-300">
        <button className="bg-gray-200 rounded-md py-2 px-2 text-sky-700 me-2 font-semibold cursor-pointer"
          onClick={() => navigate('/edit-product/' + product.id)}>
          <Edit />
        </button>
        <button className="bg-sky-700 rounded-md py-2 px-2 text-white font-semibold cursor-pointer"
          onClick={handleDelete}>
          <Trash />
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;