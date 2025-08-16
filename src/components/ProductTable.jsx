import ProductRow from "./ProductRow";

function ProductTable({ products, loadingProduct }) {
  if (loadingProduct) {
    return (
      <div className="text-center my-20">
        <h2 className="theme-text-secondary text-xl">Loading products...</h2>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 theme-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="theme-border theme-bg-surface border border-collapse w-full mt-10 rounded-lg shadow-sm">
        <thead>
          <tr className="theme-bg-elevated">
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              ID
            </th>
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              Product Name
            </th>
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              Image
            </th>
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              Category
            </th>
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              Description
            </th>
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              Price
            </th>
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              Stock
            </th>
            <th className="p-3 theme-border theme-text border text-left font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <ProductRow key={product.id} product={product} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
