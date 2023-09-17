import { useDispatch } from 'react-redux';
import {
  removeCart,
  increaseCart,
  decreaseCart,
} from '../redux/slices/cartSlice.js';

const CartItem = ({ id, title, img, price, amount }) => {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////
  return (
    <article key={id} className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          type="button"
          className="remove-btn"
          onClick={() => dispatch(removeCart(id))}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="amount-btn"
          onClick={() => dispatch(increaseCart(id))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
        <p className="amount">{amount}</p>
        <button
          type="button"
          className="amount-btn"
          onClick={() => {
            if (amount === 1) return dispatch(removeCart(id));
            dispatch(decreaseCart(id));
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default CartItem;
