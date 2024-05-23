import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../Routes';
import Main from '../pages/MainOld';
import { Context } from '..';
import { MAIN_ROUTE, VOCABULARY_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const { userStore } = useContext(Context);
  const { isAuth } = userStore;
  console.log('isAuth = ', isAuth);
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {isAuth && <Route path="*" element={<Navigate to={VOCABULARY_ROUTE} />} />}
      {!isAuth && <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />}
    </Routes>
  );
});

export default AppRouter;
