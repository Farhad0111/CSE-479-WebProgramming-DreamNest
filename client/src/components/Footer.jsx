import "../styles/Footer.scss";
import { LocalPhone, Email } from "@mui/icons-material";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_left">
        <a className="logo" href="/">
          {/* <img src="/assets/logo.png" alt="logo" /> */}
          <span className="dream">Dream</span>
          <span className="nest">Nest</span>
        </a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+8801234567</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>dreamnest@support.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
}

export default Footer;
