import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, CartContainer, Modal } from './components';
import { getCartItems } from './redux/slices/cartSlice.js';

function App() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.modal);
  const { errMsg, isLoading } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getCartItems('John Doe'));
  }, []);

  //////////////////////////////////////////////////
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (errMsg) {
    return <h2>{errMsg}</h2>;
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
