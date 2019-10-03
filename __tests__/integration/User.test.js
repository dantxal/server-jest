import request from 'supertest';
import App from '../../src/app';

describe('User', () => {
  it('should be able to register user with name, email and password', async () => {
    const response = await request(App)
      .post('/users')
      .send({
        name: 'Diego Fernandes',
        email: 'diego@gmail.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
});
