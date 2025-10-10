import { formatPrice } from '@/lib/stripe'

interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

interface CartPreviewProps {
  products: Product[]
  totalAmount: number
}

export default function CartPreview({ products, totalAmount }: CartPreviewProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Cart</h2>
      
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs">IMG</span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-600">Qty: {product.quantity}</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  )
}