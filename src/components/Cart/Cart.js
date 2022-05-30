import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import axios from 'axios';

const endpoint = "http://ec2-54-242-108-35.compute-1.amazonaws.com/graphql"

const headers = {
  "content-type": "application/json",
}
const Cart = (props) => {

  
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  function saveOrder () {
    let array=[]
    const item ={}
    const newOrder = { items: cartCtx.items, totalAmount: cartCtx.totalAmount };
    newOrder.items.map((item)=>{
     
        item ={id:item.id[1],quantity: item.amount}
        array.push(item)   
    })

    const string=JSON.stringify(array).replaceAll('"', '');
  
    props.onSaveOrder(newOrder);
    const graphqlQuery = {
      "query": `mutation {
        createOrder(createOrderInput: {
          createdOn: 123457,
          products: ${string}
        }) {
          id
        }
      }`,
      "variables": {
       
      }
      }
    const options = {
      "method": "POST",
      "headers": headers,
      "body": JSON.stringify(graphqlQuery)
    }
    fetch(endpoint, options)
      .then( response => response.json())
      .then( data => console.log(data, "sucess"))
      .then(props.onCloseCart)
      .then(alert('The order has been sent'))
      .catch(function(error){
        
        alert('An error in the API')
      })

      
    
    
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={saveOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
