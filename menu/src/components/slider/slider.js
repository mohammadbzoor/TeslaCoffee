import { Carousel } from "react-bootstrap"
import { imageSlider } from "../../data/slider"

export default function Slider() {
    return (
        <Carousel data-bs-theme="dark" className="">
            {imageSlider.map((item, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100 slider-image"
                        src={item.img}
                        alt={`Slide ${index + 1}`}
                    />

                    <Carousel.Caption>
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
