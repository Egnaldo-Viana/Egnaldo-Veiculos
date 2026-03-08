import React from 'react';
import style from './header.module.css';
import { Link } from 'react-router';
import logo from '../../assets/logoVeiculo.png';
import { FiLogIn } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';

import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
  const { signed, loadingAuth } = React.useContext(AuthContext);
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link to="/">
          <img
            src={logo}
            alt="logo do site Egnaldo veìculos"
            className={style.logo}
          />
        </Link>
        {!loadingAuth && signed && (
          //usuario logado
          <Link to="/dashboard">
            <div>
              <FiLogIn size={26} color="#000" />
            </div>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/login">
            <MdAdminPanelSettings size={26} color="#000" />
          </Link>
        )}
      </header>
    </div>
  );
}
