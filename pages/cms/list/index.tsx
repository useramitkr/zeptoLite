import { GroceryItem } from '@/typeScript/list.interface';
import { useState, useEffect } from 'react';

const groceryItems: GroceryItem[] = [
  { name: 'Apple', price: 150, category: 'Fruits', user: { name: 'User1', price: 0, category: '' } },
  { name: 'Milk', price: 200, category: 'Dairy', user: { name: 'User2', price: 0, category: '' } },
  { name: 'Bread', price: 205, category: 'Bakery', user: { name: 'User3', price: 0, category: '' } },
  { name: 'Carrot', price: 102, category: 'Vegetables', user: { name: 'User4', price: 0, category: '' } },
  { name: 'Eggs', price: 300, category: 'Dairy', user: { name: 'User5', price: 0, category: '' } },
  { name: 'Orange', price: 150, category: 'Fruits', user: { name: 'User6', price: 0, category: '' } },
  { name: 'IceCream', price: 200, category: 'Dairy', user: { name: 'User7', price: 0, category: '' } },
];

const coupons: { [key: string]: number } = { SAVE10: 10, SAVE20: 20 };

export default function GroceryApp() {
  const [cart, setCart] = useState<GroceryItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [coupon, setCoupon] = useState<string>('');
  const [lastAction, setLastAction] = useState<{ type: string; item: GroceryItem; index?: number } | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string>(''); // Track applied coupon
  const [couponDiscount, setCouponDiscount] = useState<number>(0); // Track coupon discount

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: GroceryItem) => {
    setCart([...cart, item]);
    setLastAction({ type: 'add', item });
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    const removedItem = newCart.splice(index, 1)[0];
    setCart(newCart);
    setLastAction({ type: 'remove', item: removedItem, index });
  };

  const undoAction = () => {
    if (!lastAction) return;
    if (lastAction.type === 'add') {
      setCart(cart.slice(0, -1));
    } else if (lastAction.type === 'remove') {
      const newCart = [...cart];
      newCart.splice(lastAction.index!, 0, lastAction.item);
      setCart(newCart);
    }
    setLastAction(null);
  };

  const filteredItems = groceryItems
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (filter === 'All' ? true : item.category === filter))
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Calculate coupon discount based on appliedCoupon state
  const appliedCouponDiscount = coupons[appliedCoupon] ? (total * coupons[appliedCoupon]) / 100 : 0;

  // Apply only the coupon discount
  const finalTotal = total - appliedCouponDiscount;

  const handleApplyCoupon = () => {
    if (!coupons[coupon]) {
      alert('Invalid coupon code!');
    } else {
      setAppliedCoupon(coupon);
      setCouponDiscount((total * coupons[coupon]) / 100); // discount
    }
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto flex space-x-8">
      {/* Left Layout */}
      <div className="w-2/3">
        {/* <h1 className="text-xl font-bold mb-4">Grocery List</h1> */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 w-full mb-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2 w-full mb-2 text-black bg-white" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Bakery</option>
          <option>Vegetables</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Price ({sortOrder})
        </button>
        <div>
          {filteredItems.map((item, index) => (
            <div key={index} className="border p-2 flex justify-between items-center mb-2">
              <span>{item.name} - ₹{item.price.toFixed(2)}</span>
              <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Layout*/}
      <div className="w-1/3">
        <h2 className="text-lg font-bold mt-4">Cart</h2>
        {cart.map((item, index) => (
          <div key={index} className="border p-2 flex justify-between items-center mb-2">
            <span>{item.name} - ₹{item.price.toFixed(2)}</span>
            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeFromCart(index)}>
              Remove
            </button>
          </div>
        ))}
        <h3 className="mt-4">Total: ₹{total.toFixed(2)}</h3>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="border p-2 w-full"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded mt-2 w-full"
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </button>
          {couponDiscount > 0 && <p>Coupon Discount: -₹{couponDiscount.toFixed(2)}</p>}
        </div>
        <h3 className="font-bold">Final Total: ₹{finalTotal.toFixed(2)}</h3>
        <button className="bg-gray-500 text-white px-4 py-2 rounded mt-2" onClick={undoAction}>
          Undo Last Action
        </button>
      </div>
    </div>
  );
}
