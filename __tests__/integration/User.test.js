import request from 'supertest';
import bcrypt from 'bcryptjs';
import truncate from '../util/truncate';

import App from '../../src/app';
import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register user with name, email and password', async () => {
    const response = await request(App)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'diego@gmail.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicate email', async () => {
    await request(App)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'diego@gmail.com',
        password: '123456',
      });

    const response = await request(App)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'diego@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });

  it('should encrypt user password when new user is created', async () => {
    const user = await User.create({
      name: 'Diego Fernandes',
      email: 'diego@gmail.com',
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
