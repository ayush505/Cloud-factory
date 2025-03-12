import React from 'react';
import Footer from 'commons/Footer';

const footerData = {
  className: 'smart-factory-footer',
  bgColor: '#F1F2F5',
  color: '#000C17'
};
export default function index() {
  return <Footer data={footerData} />;
}
