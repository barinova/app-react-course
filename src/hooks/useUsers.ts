import userService, { type User } from '../services/user-service.ts';
import { CanceledError } from '../services/api-client.ts';
import { useEffect, useState } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const { req, cancel } = userService.getAll<User>();
    req
      .then(response => {
        setUsers(response.data);
      })
      .catch(er => {
        if (er instanceof CanceledError) {
          return;
        }
        setError(er);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
