import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { remove } from '../store/cartSlice';

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const deleteFromCart = (id) => {
    dispatch(remove(id));
  };

  const cards = products.map((product) => (
    <div className="col-md-12" style={{ marginBottom: '10px' }}>
      <Card key={product.id} className="h-100">
        <div className="text-center pt-2">
          <Card.Img
            variant="top"
            src={product.image}
            style={{
              width: '100px',
              height: '130px',
              objectFit: 'contain'
            }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: 'white' }}>
          <Button variant="danger" onClick={() => deleteFromCart(product.id)}>
            Remove from cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <div className="row">{cards}</div>
    </>
  );
};

export default Cart;
