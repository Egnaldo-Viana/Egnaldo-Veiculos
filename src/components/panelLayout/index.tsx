import React from 'react';

import { PanelControl } from '../panelControl';
import style from './panelLayout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export function PanelLayout({ children }: LayoutProps) {
  return (
    <div className={style.layout}>
      <PanelControl />
      <main className={style.container}>{children}</main>
    </div>
  );
}
