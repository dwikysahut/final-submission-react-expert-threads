import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

export default function Loading() {
  return (
    <div className="fixed top-0 h-5 right-0 w-full  z-40">
      <LoadingBar style={{ backgroundColor: 'pink', height: '5px' }} />
    </div>
  );
}
