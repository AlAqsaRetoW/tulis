import ProductRow from './ProductRow';

function ProductTable({ products, loadingProduct }) {
  if (loadingProduct)
    return <h2 className="text-center my-20">Loading products...</h2>;
  return (
    <table className="border border-gray-200 border-collapse w-full mt-10">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border border-gray-300">ID</th>
          <th className="p-2 border border-gray-300">Product Name</th>
          <th className="p-2 border border-gray-300">Image</th>
          <th className="p-2 border border-gray-300">Category</th>
          <th className="p-2 border border-gray-300">Description</th>
          <th className="p-2 border border-gray-300">Price</th>
          <th className="p-2 border border-gray-300">Stock</th>
          <th className="p-2 border border-gray-300">Action</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product, index) => (
          <ProductRow key={product.id} product={product} index={index} />
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
