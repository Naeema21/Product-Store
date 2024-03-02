import React, { useEffect, useState } from 'react';
import ProductCard from '../component/productCard';
import { ProductType } from '../assests/types';



const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch categories
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then((json: string[]) => setCategories(['all', ...json]))
            .finally(() => setLoading(false));

        // Fetch all products initially
        fetchProducts('all');
    }, []);

    const fetchProducts = (category: string) => {
        setLoading(true);
        let apiUrl = 'https://fakestoreapi.com/products';
        if (category !== 'all') {
            apiUrl = `https://fakestoreapi.com/products/category/${category}`;
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then((json: ProductType[]) => setProducts(json))
            .finally(() => setLoading(false));
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        fetchProducts(category);
    }

    if (loading) {
        return (
            <section className="h-screen flex justify-center items-center">
                Loading...
            </section>
        );
    }

    return (
        <div >
            <section className="py-20">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
                    <div className="flex justify-center space-x-4 mb-6">
                        {categories.map((category) => (
                            <button key={category}
                                className={`btn ${selectedCategory === category ? 'text-primary' : 'text-[#14b8a6]'} font-bold`}
                                onClick={() => handleCategoryChange(category)}>
                                {category.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                        {products.map((product) => (
                            <ProductCard  product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductList;
