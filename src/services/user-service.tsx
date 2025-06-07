import apiClient from './api-client.ts';

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const abortController = new AbortController();
    const req = apiClient.get<User[]>('/users', {
      signal: abortController.signal,
    });
    return { req, cancel: () => abortController.abort() };
  }

  addUser(user: User) {
    return apiClient.post('/users', user);
  }

  updateUser(user: User) {
    return apiClient.patch('/users/' + user.id, user);
  }

  deleteUser(userId: number) {
    return apiClient.delete(
      'https://jsonplaceholder.typicode.com/users/' + userId,
    );
  }
}

export default new UserService();
