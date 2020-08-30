import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [ cart, setCart ] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProduct = productKey.map(key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProduct);
    }, [])
    return (
        <div>
            <h2>Cart Items: {cart.length}</h2>
            {
                cart.map(pd => <ReviewItem product={pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;