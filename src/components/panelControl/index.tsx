import { Link } from 'react-router';
import style from './panelControl.module.css';
import supabase from '../../services/supabaseClient';
import logo from '../../assets/logoDash.png';
import iconDash from '../../assets/dashboard.png';
import iconCadastro from '../../assets/iconCadastro.png';

export function PanelControl() {
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <aside className={style.container}>
      <Link to="/" className={style.logoWrapper}>
        <img className={style.logo} src={logo} alt="logo do site" />
      </Link>

      <nav className={style.navegacao}>
        <Link to="/dashboard" className={style.textDash}>
          <img src={iconDash} alt="icone do botão Dashboard" />
          Dashboard
        </Link>
        <Link to="/dashboard/new" className={style.textCadas}>
          <img src={iconCadastro} alt="icone do botão Cadastro" />
          Cadastrar veiculo
        </Link>
      </nav>
      <button className={style.button} onClick={handleLogout}>
        Sair da conta
      </button>
    </aside>
  );
}
