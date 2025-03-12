import React from 'react';
import Footer from 'commons/Footer';

const footerData = {
  bgColor: '#F7F8FB',
  color: '#7A8AAC',
  className: 'market-place-footer',
  border: '1px solid #D8DDE6'
};
export default function index() {
  return <Footer data={footerData} />;
}
