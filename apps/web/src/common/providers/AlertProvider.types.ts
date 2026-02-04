import type { ReactNode } from 'react';

export type AlertButton = {
  text: string;
  onClick: () => void;
};

export type AlertConfig = {
  id: string;
  title: string;
  children: ReactNode;
  buttons?: [AlertButton] | [AlertButton, AlertButton];
};

export type ShowAlertParams = {
  title: string;
  children: ReactNode;
  buttons?: [AlertButton] | [AlertButton, AlertButton];
};
