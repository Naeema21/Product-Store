import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import CartItem from "../component/cartItem";
import { ProductType } from "../assests/types";



interface CartItemData {
    productId: number;
    quantity: number;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemData[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/carts/user/2')
            .then(res => res.json())
            .then((json) => {
                setCartItems(json[0].products);
                fetchProducts(json[0].products);
            });
    }, []);

    const fetchProducts = (cartItems: any) => {
        const productIdsWithQuantities = cartItems.map((product: CartItemData) => ({
            productId: product.productId,
            quantity: product.quantity
        }));
        Promise.all(productIdsWithQuantities.map((product: CartItemData) => (
            fetch(`https://fakestoreapi.com/products/${product.productId}`)
                .then(res => res.json())
                .then((productData: ProductType) => ({ ...productData })) // Add 'amount' property to each product
        )))
            .then(products => setProducts(products));
    };



    return (
        <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
            <div className="container mx-auto">
                <div className="flex items-center justify-between py-6 border-b">
                    <div className="uppercase text-sm font-semibold">Shopping Bag 2</div>
                    <div className="cursor-poniter w-8 h-8 flex justify-center items-center">
                        <IoMdArrowForward className="text-2xl" />
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
                    {products.map((product, index) => {
                        return <CartItem item={{ ...product, amount: cartItems[index]?.quantity }} />
                    }
                    )}
                </div>
                <div className="flex flex-col gap-y-3  mt-4">
                    <div className="flex w-full justify-between items-center">
                        {/* total */}
                        <div className="font-semibold">
                            <span className="mr-2">Subtotal:</span> ${" "}
                            {products.reduce((total, product, index) => total + (product.price * cartItems[index]?.quantity || 0), 0)}
                        </div>
                        {/* clear cart icon */}
                        <div
                            onClick={() => { }}
                            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
                        >
                            <FiTrash2 />
                        </div>
                    </div>

                    <Link
                        to={"/"}
                        className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
                    >
                        Checkout
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Cart;
