import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [ cart, setCart ] = useState([]);

    const removeProduct = (productKey)  => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        // console.log('clicked', productKey);
    }

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

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
       setCart([]);
       setOrderPlaced(true);
       processOrder();
    }

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>;
    }
    return (
        <div className='twin-container'>
           <div className="product-container">
           {
                cart.map(pd => <ReviewItem product={pd} removeProduct={removeProduct}></ReviewItem>)
            }
           </div>
           {thankYou}
           <div className="cart-container">
               <Cart cart={cart}><button onClick={handlePlaceOrder} className='add-button'>Place Order</button></Cart>
           </div>
           
        </div>
    );
};

export default Review;