import ImageKit from '@imagekit/nodejs';
import dotenv from 'dotenv';

dotenv.config(); // Ensures your process.env variables are readable

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// This line guarantees the default export
export default imagekit;