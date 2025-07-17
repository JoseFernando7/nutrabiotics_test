import { Product } from '../../shared/models/Product'

interface ProductCardProps {
  product: Product
  onOrder?: (productId: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOrder }) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: ${product.price.toFixed(2)}</p>
      <button onClick={() => onOrder && onOrder(product.productId)}> Ordenar </button>
    </div>
  )
}

export default ProductCard
