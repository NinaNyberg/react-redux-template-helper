import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { getProducts } from '../store/productSlice';
import StatusCode from '../utils/StatusCode';

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  // const [products, setProducts] = useState([]);

  const itemsPerRow = 4;
  const [nextRow, setNextRow] = useState(itemsPerRow);
  const handleLoadMore = () => {
    setNextRow(nextRow + itemsPerRow);
  };

  useEffect(() => {
    dispatch(getProducts());

    // fetch('https://fakestoreapi.com/products')
    //   .then((data) => data.json())
    //   .then((result) => {
    //     setProducts(result);
    //     console.log(result);
    // });
  }, []);

  if (status === StatusCode.LOADING) {
    return <p>Loading...</p>;
  }
  if (status === StatusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger">
        Something went wrong! Please try again
      </Alert>
    );
  }

  const addToCart = (product) => {
    dispatch(add(product));
  };
  const cards = products.slice(0, nextRow).map((product) => (
    <div className="col-md-3" style={{ marginBottom: '10px' }}>
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
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <div>
      <h1>Products list</h1>
      <div className="row">{cards}</div>
      {nextRow < products.length && (
        <Button
          style={{
            backgroundColor: 'green',
            marginTop: '10px',
            cursor: 'pointer'
          }}
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default Product;
