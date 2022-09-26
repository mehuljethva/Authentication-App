import { Fragment, useEffect, memo } from 'react';

import { useDispatch } from 'react-redux';

import { users } from '../actions/usersActions';


const UserUpdateCall = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  // ** Get data on mount
  useEffect(() => {
    dispatch(users());
  }, [dispatch]);

  return null;
};

export default memo(UserUpdateCall);