import { Product } from "../../shared/models/Product";

export const addProductToCart = async (productId: string, products: Product[], addToCart: (product: Product) => void): Promise<void> => {
  const productToOrder = products.find((product) => product.productId === productId);

  if (productToOrder) {
    addToCart(productToOrder);
    console.log(`Product ordered: ${productToOrder.name}`);
    alert(`Producto ${productToOrder.name} agregado al carrito`);
  } else {
    console.error(`Product with ID ${productId} not found`);
  }
}
