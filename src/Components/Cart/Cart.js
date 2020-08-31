import React from 'react';
import './Cart.css';


const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    let shipping = 0;
    if(total > 100){
        shipping = 0;
    }
    else if(total > 30){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const tax = total / 10;

    const formatNumber = num => {
        const fixedNum = num.toFixed(2);
        return Number(fixedNum);
    }

    const beforeTaxTotal = total + shipping;

    const grandTotal = total + shipping + tax;

    

    return (
        <div className='order-summery'>

            <h3>Order Summery </h3>
            <h4>Items Ordered: {cart.length}</h4>
            <table>
                <tbody>
                    <tr>
                    <td>Item Price:</td><td>${formatNumber(total)}</td>
                    </tr>
                    <tr>
                    <td>Shipping Cost:</td><td>${formatNumber(shipping)}</td>
                    </tr>
                    <tr>
                    <td>Total before tax:</td><td>${formatNumber(beforeTaxTotal)}</td>
                    </tr>
                    <tr>
                    <td>Estimated tax:</td><td>${formatNumber(tax)}</td>
                    </tr>
                </tbody>
            </table>
            <h4 className='order-total'>Order Total: ${formatNumber(grandTotal)}</h4>
            
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;