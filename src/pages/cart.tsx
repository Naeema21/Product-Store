import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IoMdArrowForward } from "react-icons/io";

import CartItem from "../component/cartItem";
import Loader from "../component/loader";
import { BASE_URL } from "../services/api";
import { CartItemData, CartItemType, ProductType } from "../assests/types";
import React from "react";

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItemData[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/carts/user/2`)
            .then(res => res.json())
            .then((json) => {
                setCartItems(json[0].products);
                fetchProducts(json[0].products);
            })
            .finally(() => setLoading(false));
    }, []);

    const fetchProducts = (cartItems: any) => {
        const productIdsWithQuantities = cartItems.map((product: CartItemData) => ({
            productId: product.productId,
            quantity: product.quantity
        }));
        Promise.all(productIdsWithQuantities.map((product: CartItemData) => (
            fetch(`${BASE_URL}/products/${product.productId}`)
                .then(res => res.json())
        )))
            .then(products => setProducts(products));
    };

    // Function to update the cart
    const updateCart = (updatedItem: CartItemType) => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-
        ${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        
        fetch(`${BASE_URL}/carts/${updatedItem.id}`, {
            method: "PUT",
            body: JSON.stringify({
                userId: 2,
                date: formattedDate,
                products: [{ products: updatedItem.id, quantity: updatedItem.quantity }]
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                const updatedCart = cartItems.map(product => {
                    if (product.productId === updatedItem.id) {
                        return { ...product, quantity: updatedItem.quantity };
                    }
                    return product;
                });
                setCartItems(updatedCart);
            })
            .catch(error => console.error('Error updating cart:', error));
    };


    const removeItem = (productId: number) => {
        fetch(`${BASE_URL}/carts/${productId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then((json) => {
                const updatedCartItems = cartItems.filter((item) => item.productId !== productId)
                setCartItems(updatedCartItems)
                fetchProducts(updatedCartItems)
            }).catch(error => console.error('Error updating cart:', error));
    }



    if (loading) {
        return <Loader />
    }

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
                    {products.map((product, index) => (
                        <CartItem key={index}
                            item={{ ...product, quantity: cartItems[index]?.quantity }}
                            updateCart={updateCart}
                            removeItem={removeItem}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-y-3 mt-4">
                    <div className="flex w-full justify-between items-center">
                        <div className="font-semibold">
                            <span className="mr-2">Subtotal:</span> ${" "}
                            {products.reduce((total, product, index) => total + (product.price * cartItems[index]?.quantity || 0), 0)}
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
