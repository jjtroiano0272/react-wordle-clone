import React, { useState } from 'react';

export default function Footer(props) {
  return (
    <footer className='footer bg-secondary mt-5 py-5'>
      <div className='container'>
        <div>
          <p>
            <small className='text-light mb-2'>© 2022 J. Troiano</small>
          </p>
        </div>
        <div className='ms-auto'>
          <a
            href='https://jonathan-troiano.netlify.app/'
            className='text-light text-decoration-none'
          >
            View Profile
          </a>
        </div>
      </div>
    </footer>
  );
}
