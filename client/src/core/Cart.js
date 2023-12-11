import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

import Copyright from './Copyright';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const handdlePedido = () => {
    localStorage.removeItem('cart');
  }

  const showItems = (items) => {
    return (
      <div>
        <h2>Su carrito tiene {`${items.length}`} productos</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Tu carrito esta vacío.. <br /> <Link to='/shop'>Continuar comprando</Link>
    </h2>
  );

  return (
    <Layout
      title='Carrito de compras'
      description='Administre los artículos de su carrito, agregar eliminar'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-md-4'>
          <h2 className='mb-4'>Resumen de tu carrito</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
          {/* <button onClick={handdlePedido} >Haz Pedido</button> */}
        </div>
        <div className='col-md-2'></div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;
