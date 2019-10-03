import '../../bootstrap';

import readline from 'readline';
import factory from './factories';
import api from '../../services/api';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const callSeeders = async mocks => {
  for (let i = 0; i < mocks.length; i += 100) {
    const requests = mocks.slice(i, i + 100).map(user => {
      return api
        .post('/users', user)
        .catch(err =>
          console.log(
            `Error seeding ${user} to ${process.env.APP_URL} - ${err}`
          )
        );
    });

    await Promise.all(requests).catch(err =>
      console.log(`Error sending request to the batch ${i} - ${err}`)
    );
  }
  process.emit('done');
};

rl.question(
  `This will load mock data into your pre-configured database.
  Make sure to use it on a DEVELOPMENT database instance.
  Are you sure you want to seed ${process.env.APP_URL},
  to confirm enter the number of seeds you want to use. (Using 0 or less exits) `,
  answer => {
    if (isNaN(answer) || Number(answer) <= 0) {
      process.exit(0);
    } else {
      factory.attrsMany('User', Number(answer)).then(callSeeders);
    }
  }
);

process.on('done', () => process.exit(0));
// factory.attrsMany('User', 5).then(array => {
//   array.forEach(user => api.post('/users', user));
// });
