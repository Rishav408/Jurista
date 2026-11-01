import { useCallback, useEffect, useState } from 'react';
import api from '../lib/api';

export const CONNECTION_STATE = {
  online: 'online',
  offline: 'offline',
  checking: 'checking',
};

/** Periodic backend health probe with a pause while a request is in flight. */
export function useConnection(pollInterval = 45000) {
  const [status, setStatus] = useState(CONNECTION_STATE.checking);

  const probe = useCallback(async () => {
    setStatus(CONNECTION_STATE.checking);
    const ok = await api.checkHealth();
    setStatus(ok ? CONNECTION_STATE.online : CONNECTION_STATE.offline);
  }, []);

  useEffect(() => {
    probe();
    const id = setInterval(() => {
      // Don't churn the indicator while the user is mid-request.
      setStatus((current) => {
        if (current === CONNECTION_STATE.checking) return current;
        probe();
        return current;
      });
    }, pollInterval);
    return () => clearInterval(id);
  }, [probe, pollInterval]);

  return { status, retry: probe };
}

export default useConnection;
