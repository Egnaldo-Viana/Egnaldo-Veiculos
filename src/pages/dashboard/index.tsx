import { PanelLayout } from '../../components/panelLayout';
import style from './dashboard.module.css';
export function Dashboard() {
  return (
    <PanelLayout>
      <div className={style.container}>
        <p>Essa é a página Dashboard</p>
      </div>
    </PanelLayout>
  );
}
