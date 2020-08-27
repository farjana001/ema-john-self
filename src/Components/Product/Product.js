import React from 'react';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Product = (props) => {

console.log(props);   
    const {name, img, seller, price, stock, star, features} = props.product;

    return (
       <div className="single-product">

           {/* img div */}
           <div><img src={img} alt=""/></div>

           <div className='product-details'>
                <h3 className='product-name'>{name}</h3>
                <br/>
                <p><small>by: {seller}</small></p>
                <p className='price'>${price}</p>
                <p><small>only {stock} items left in the stock - order soon</small></p>
                <button onClick={() => props.handleProduct(props.product)} className='add-button'><FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>
                
            <div className="star-feature">
                {/* for star rating */}
                <p>{star}</p>
                <h4>Features: </h4>
                {/* for feature */}
                <ul className='feature'>
                    {
                        features.map(feature => <li>{feature.description} : <span className='value'>{feature.value}</span></li>)
                    }
                </ul>
            </div>

        </div>
    </div>
    );
};

export default Product;