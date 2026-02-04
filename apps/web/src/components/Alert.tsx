import { ReactNode } from 'react';

import type { AlertButton } from '@/common/providers/AlertProvider.types';

type Props = {
  title: string;
  children: ReactNode;
  buttons?: [AlertButton] | [AlertButton, AlertButton];
  onClose: () => void;
};

function Alert({ title, children, buttons, onClose }: Props) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          {buttons && buttons.length > 0 && (
            <>
              {buttons[0] && (
                <button
                  type="button"
                  className="btn btn-ghost text-base-content size-10 break-keep"
                  onClick={buttons[0].onClick}
                >
                  {buttons[0].text}
                </button>
              )}
              {buttons[1] && (
                <button
                  type="button"
                  className="btn btn-primary bg-primary text-primary-content hover:bg-primary-focus size-10 break-keep"
                  onClick={buttons[1].onClick}
                >
                  {buttons[1].text}
                </button>
              )}
            </>
          )}
          {!buttons && (
            <button
              type="button"
              className="btn btn-primary bg-primary text-primary-content hover:bg-primary-focus size-10 break-keep"
              onClick={onClose}
            >
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alert;
