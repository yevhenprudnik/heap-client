import { React } from 'react';
import { ClipLoader } from 'react-spinners';
import './LoaderModal.css';

const Loader = () => {
  return (
    <div className="load-modal items-center flex-ns justify-center">
      <div>
        <ClipLoader size={80} />
      </div>
    </div>
  );
};

export default Loader;
