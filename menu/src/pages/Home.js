import { Container } from "react-bootstrap";
import About from "../components/about/About";
import Offers from "./offers";
import Contact from "../components/Contact/Contact";
import CardList from "../components/CardList/cardList";
import { Link } from "react-router-dom";
export default function Home() {
  const visibleCount = 8;

  return (
    <Container>
      <About />
<div>
  <div className="text-center mb-4">

      <h2 className="text-center my-4 section-title">قائمة الكافيه</h2>
      <CardList visibleCount={visibleCount} />
</div>
      <div className="text-center mt-4">
       <Link to="/menu" className="custom-btn btn-view-more p-2 text-decoration-none">
  عرض المزيد
</Link>
      </div>
</div>
       <Offers hideWhenEmpty />
      <Contact />

    </Container>
  );
}
