import { factory } from 'factory-girl';

import User from '../../app/models/User';

factory.define('User', User, {
  name: factory.chance('name', { middle: true }),
  email: factory.chance('email'),
  password: factory.chance('word', { syllables: 6 }),
});

export default factory;
