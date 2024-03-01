import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductType } from "../assests/types";


const ProductDetails: React.FC = () => {
    const [product, setProduct] = useState<ProductType | null>(null);
    const { id } = useParams<string>();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => setProduct(json))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return (
            <section className="h-screen flex justify-center items-center">
                Loading...
            </section>
        );
    }

    return (
        <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                        <img className="max-w-[200px] lg:max-w-xs" src={product.image} alt="" />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{product.title}</h1>
                        <div className="text-2xl text-red-500 font-medium mb-6">$ {product.price}</div>
                        <p className="mb-8">{product.description}</p>
                        <button onClick={() => { }} className='bg-primary py-4 px-8 text-white'>Add to cart</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
