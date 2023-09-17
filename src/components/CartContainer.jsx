import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { showModal } from '../redux/slices/modalSlice.js';
import { calculateCart } from '../redux/slices/cartSlice.js';

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateCart());
  }, []);

  useEffect(() => {
    dispatch(calculateCart());
  }, [cartItems]);

  ///////////////////////////////////////////////////////////
  if (cartItems.length < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
        <div>
          {cartItems.map((cart) => {
            return <CartItem key={cart.id} {...cart} />;
          })}
        </div>
      </header>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total
            <span>${total}</span>
          </h4>
        </div>
        <button
          type="button"
          className="btn clear-btn"
          onClick={() => dispatch(showModal())}
        >
          clear btn
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
