import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import aboutImg from '../../Food-image/about_img.png';

function About() {
  const imgRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.style.opacity = '1';
          imgRef.current.style.transform = 'scale(1)';
        }
      },
      { threshold: 0.3 }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;

    wrapper.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

    // حركة الضوء
    const glare = wrapper.querySelector('.glare');
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 70%)`;
    glare.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    const glare = wrapper.querySelector('.glare');
    glare.style.opacity = '0';
  };

  return (
    <section id="about" className="py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className="section-title">رحلة النكهة</h2>
          <p>استمتع بتجربة قهوة تُلامس الحواس وتُحاكي الذوق الرفيع</p>
        </div>

        <Row className="align-items-center">
          <Col md={6}>
            <p>
              في كل فنجان نقدمه، تبدأ رحلة فريدة من الطعم الغني والرائحة الساحرة.
              نختار أجود أنواع حبوب القهوة بعناية، لتحصل على نكهة متوازنة تجمع بين القوة والنعومة.
            </p>
            <p>
              نحن نؤمن أن القهوة ليست مجرد مشروب، بل لحظة هدوء ومتعة.
              لذلك نحرص على تقديم تجربة متكاملة، تُشعرك بالراحة في كل رشفة،
              وتمنحك طاقة تبدأ بها يومك أو تسترخى بها في أمسيتك.
            </p>
          </Col>

          <Col md={6} className="text-center">
            {/* Wrapper خارجي للظل */}
            <div style={{
              borderRadius: '20px',
              padding: '4px',
              background: 'linear-gradient(135deg, #c8a96e44, #8B6914aa, #c8a96e44)',
              boxShadow: '0 8px 32px rgba(139, 105, 20, 0.25)',
              transition: 'box-shadow 0.4s ease',
            }}>
              {/* Wrapper الرئيسي للحركة */}
              <div
                ref={wrapperRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'transform 0.15s ease, box-shadow 0.4s ease',
                  cursor: 'none',
                  lineHeight: 0,
                }}
              >
                {/* طبقة الضوء */}
                <div
                  className="glare"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '16px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                />

                {/* الصورة */}
                <img
                  ref={imgRef}
                  src={aboutImg}
                  alt="Coffee experience"
                  className="img-fluid"
                  style={{
                    display: 'block',
                    width: '100%',
                    borderRadius: '16px',
                    opacity: 0,
                    transform: 'scale(1.06)',
                    transition: 'opacity 0.9s ease, transform 1.1s ease',
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;