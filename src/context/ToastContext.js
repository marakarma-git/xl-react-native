import React, { useState, useEffect, useCallback, createContext } from 'react';
import { ToastComponent } from '../components';

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const [config, setConfig] = useState({
    title: "",
    message: "",
    type: "",
    duration: 0,
    pusition: ""
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, config.duration);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const openToast = useCallback((configValue) => {
    setConfig(
      {
        title: configValue.title || "",
        message: configValue?.message || "",
        duration: configValue?.duration || 4500,
        type: configValue?.type || "success",
        position: configValue?.position || 'top'
      }
    );
    setShowToast(configValue?.showToast || false);
  }, [setConfig]);

  return (
    <ToastContext.Provider value={openToast}>
      {children}
      {
        showToast &&
        <ToastComponent
          title={config.title}
          message={config.message}
          type={config.type}
          position={config.position}
          duration={config.duration}
        />
      }
    </ToastContext.Provider>
  );
}

export {
  ToastContext,
  ToastContextProvider
};