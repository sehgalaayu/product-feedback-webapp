import { useEffect } from 'react';

export const FlashMessage = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-900 border-green-700 text-green-100',
    error: 'bg-red-900 border-red-700 text-red-100',
    info: 'bg-blue-900 border-blue-700 text-blue-100'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${styles[type as keyof typeof styles] || styles.info} border rounded-xl p-4`}>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-sm">{message}</p>
        </div>
        <button onClick={onClose} className="ml-3 text-current hover:opacity-75">
          ✕
        </button>
      </div>
    </div>
  );
};
