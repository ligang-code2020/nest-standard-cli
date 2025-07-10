export interface UserInterface {
  userId: number;
  username: string;
  password: string;
  passwordHash: string;
}
export const userList: UserInterface[] = [
  {
    userId: 1,
    username: 'john',
    password: '123456',
    passwordHash: '7c0O7v2PZuyD8wbkjSHhXQ==',
  },
  {
    userId: 2,
    username: 'maria',
    password: '567890',
    passwordHash: '4U7L0wYzLiArtUj1E8ECgQ==',
  },
];

export const COMMON_SALT = 'hello_world';
