import React from 'react';

import socket from '../api';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

const Nav = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const history = useHistory();

  const backHandler = () => {
    dispatch({ type: 'CLEAR_NAME' });
    socket.disconnect();
    history.push('/');
  };

  return (
    <nav>
      {name && <h3 onClick={backHandler}>Back</h3>}
      <h2>Chateria</h2>
    </nav>
  );
};

export default Nav;
