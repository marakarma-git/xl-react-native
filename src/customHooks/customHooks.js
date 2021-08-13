import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

const useToastHooks = () => {
  return useContext(ToastContext);
}

export {
  useToastHooks
};