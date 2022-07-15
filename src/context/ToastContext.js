import React, {useState, useEffect, useCallback, createContext} from 'react';
import {ToastComponent} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {clearSessionExpiredFlag} from '../redux/action/auth_action';

const ToastContext = createContext();

const defaultConfig = {
  title: '',
  message: '',
  type: '',
  duration: 0,
  pusition: '',
};

const ToastContextProvider = ({children}) => {
  const dispatch = useDispatch();
  const {isSessionExpired} = useSelector((state) => state?.auth_reducer);

  const [config, setConfig] = useState(defaultConfig);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (isSessionExpired) {
      setConfig({
        title: 'Session Expired',
        type: 'warning',
        message: 'Your session has expired or login in from another device',
        duration: 4500,
        showToast: true,
        position: 'top',
      });

      setShowToast(true);
    }
  }, [isSessionExpired]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        dispatch(clearSessionExpiredFlag());
      }, config.duration);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const openToast = useCallback(
    (configValue) => {
      setConfig({
        title: configValue.title || '',
        message: configValue?.message || '',
        duration: configValue?.duration || 4500,
        type: configValue?.type || 'success',
        position: configValue?.position || 'top',
      });
      setShowToast(configValue?.showToast || false);
    },
    [setConfig],
  );

  return (
    <ToastContext.Provider value={openToast}>
      {children}
      {showToast && (
        <ToastComponent
          title={config.title}
          message={config.message}
          type={config.type}
          position={config.position}
          duration={config.duration}
          setShowToast={setShowToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export {ToastContext, ToastContextProvider};
