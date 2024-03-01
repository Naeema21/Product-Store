import React, { useEffect, useState } from 'react';
import ProductCard from '../component/productCard';
import { ProductType } from '../assests/types';

const ProductList: React.FC = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
    }, [])

    return (
        <div >
            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                        {products?.map((product) => {
                            return (
                                <ProductCard product={product}  />
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductList;