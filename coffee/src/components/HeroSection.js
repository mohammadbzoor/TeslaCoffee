import { Link } from "react-router-dom";
import { FaBolt, FaCoffee } from "react-icons/fa";
import { GiCoffeeBeans } from "react-icons/gi";
import { SiTesla } from "react-icons/si";
import "./Hero.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content text-center">

          {/* الشعار */}
          <div className="hero-brand mb-4">
            <h1 className="hero-brand-arabic">تسلا</h1>
            <span className="hero-brand-english">TESLA</span>
            <span className="hero-brand-coffee">COFFEE</span>
          </div>

          {/* العنوان */}
          <h2 className="hero-title">اكتشف طعم القهوة المميز</h2>

          {/* الوصف */}
          {/* <p className="hero-description">
            كوب سيراميك مطفي بلون أسود مع شعار ذهبي فاخر
            <br />
            تصميم بسيط وأنيق يعكس هوية المكان
          </p> */}

          {/* الأزرار */}
          <div className="hero-buttons">
            <Link to="/offers" className="hero-btn hero-btn-outline">
              العروض الخاصة
            </Link>
            <Link to="/menu" className="hero-btn hero-btn-primary">
              تصفح المنيو
            </Link>
          </div>

          {/* المميزات */}
          <div className="hero-features">

            <div className="feature-item">
              <div className="feature-icon-box">
                <FaBolt className="feature-icon" />
              </div>
              <span className="feature-label">الطاقة</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <GiCoffeeBeans className="feature-icon" />
              </div>
              <span className="feature-label">القهوة</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <SiTesla className="feature-icon" />
              </div>
              <span className="feature-label">الابتكار</span>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <FaCoffee className="feature-icon" />
              </div>
              <span className="feature-label">التجربة</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
