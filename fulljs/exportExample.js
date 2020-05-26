const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = (message) => {
  console.log('*******************');
  console.info(message);
  console.log('*******************');
};

export default {
  port: env.PORT || 8080
};
