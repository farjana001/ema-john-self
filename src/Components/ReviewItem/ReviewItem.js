import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price } = props.product
    const reviewStyle = {
        borderBottom:'1px solid lightgray',
        marginBottom: '10px',
        paddingBottom: '10px',
        marginLeft: '80px'
    }
    return (
        <div style={reviewStyle} className='review-item'>
            <h4 className='product-name'>{name}</h4>
    <p>Quantity : {quantity}</p>
    <p><small>Price : ${price}</small></p>
    <button onClick={() => props.removeProduct(key)} className='add-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;