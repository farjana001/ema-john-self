import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log('form submitted', data)
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Name' />
      {errors.name && <span className='error'>Name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='email' />
      {errors.email && <span className='error'>Email is required</span>}
      <input name="address" ref={register({ required: true })} placeholder='Address' />
      {errors.address && <span className='error'>Address is required</span>}
      <input name="phone" ref={register({ required: true })} placeholder='Phone No' />
      {errors.phone && <span className='error'>Phone Number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;