import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA3Skj-7EcHf4Iwo_VeFI19OJjT19EnC2w',
  authDomain: 'image-uploader-42b88.firebaseapp.com',
  projectId: 'image-uploader-42b88',
  storageBucket: 'image-uploader-42b88.appspot.com',
  messagingSenderId: '595002218120',
  appId: '1:595002218120:web:179094957f512289a6313d',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
