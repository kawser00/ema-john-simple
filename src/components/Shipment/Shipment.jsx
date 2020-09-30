import React, { useContext } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data =>{
    // console.log('form submitted',  data);
    const savedCart = getDatabaseCart()
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}

    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(orderDetails),
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder()
          alert('Your order placed successfully')
        }
      })

  } 

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      {/* <input name="example" defaultValue="test" ref={register} /> */}

      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name"/>
      {errors.name && <span className="error">Name field is required</span>}
      
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email"/>
      {errors.email && <span className="error">Email field is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Your Address"/>
      {errors.address && <span className="error">Address field is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Your Phone"/>
      {errors.phone && <span className="error">Phone field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;