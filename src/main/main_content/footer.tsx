import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './main.scss';

const { Footer } = Layout;

const Foot = () => {
  return (
    <Footer className="footer">
      <Link className="footer-link" to="/home">
        Privacy Policy
      </Link>
      <Link className="footer-link" to="">
        Support
      </Link>
      <Link className="footer-link" to="">
        Contact us
      </Link>
      <Link className="footer-link" to="">
        © 2025 BalaSteps
      </Link>
    </Footer>
  );
};

export default Foot;
