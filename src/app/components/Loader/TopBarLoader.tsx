import React from 'react';

export default function TopBarLoader({ isLoading = true }: any) { 
  return <>{isLoading && <div className='top-bar-loader'></div>}</>;
}
