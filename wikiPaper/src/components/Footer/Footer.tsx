import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>
            &copy; {new Date().getFullYear()} All copyrights for Hiba Khaleel.
          </p>
          <p> : Terms of Service | Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
