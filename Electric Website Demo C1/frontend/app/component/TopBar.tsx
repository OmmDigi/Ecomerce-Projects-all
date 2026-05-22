import { Package, MapPin } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-black text-white text-sm">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>Free Delivery on orders over $280</span>
        </div>
        
        <div className="hidden md:flex lg:flex items-center gap-6">
          <button className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <Package className="w-4 h-4" />
            <span>Track your Order</span>
          </button>
          
          <button className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            <MapPin className="w-4 h-4" />
            <span>Find a Store</span>
          </button>
          
          {/* <div className="flex items-center gap-4">
            <select className="bg-transparent border-none text-white cursor-pointer hover:text-gray-300 focus:outline-none">
              <option value="INR" className="text-black">INR ₹</option>
              <option value="USD" className="text-black">USD $</option>
              <option value="EUR" className="text-black">EUR €</option>
            </select>
            
            <select className="bg-transparent border-none text-white cursor-pointer hover:text-gray-300 focus:outline-none">
              <option value="En" className="text-black">En</option>
              <option value="Fr" className="text-black">Fr</option>
              <option value="Es" className="text-black">Es</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
}
