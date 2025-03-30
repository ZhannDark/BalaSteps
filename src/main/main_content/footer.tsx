import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './main.scss';

const { Footer } = Layout;

const Foot = () => {
  return (
    <Footer className="footer">
      <Link className="footer-link" to="/privacy-policy">
        Privacy Policy
      </Link>
      <Link className="footer-link" to="/support">
        Support
      </Link>
      <Link className="footer-link" to="/contact">
        Contact us
      </Link>
      <span className="footer-link">© 2025 BalaSteps</span>
    </Footer>
  );
};

export default Foot;
