// import com from '@src/core/com';
// import app from './app';
import com from './com';

(async () => {
  const app = com.listen('voice.main');

  app.on('opened', () => {
    console.log('opened');
  });
  app.on('closed', () => {
    console.log('closed');
  });
  app.on('request', async data => {
    console.log('request', data);
  });
})();
