import hcdcschool from '../images/hcdcschool.png';
import hcdcschool2 from '../images/hcdcschool2.png';
import hcdcschool3 from '../images/hcdcschool3.png';
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
    <div className="row">
      <Carousel variant="dark" interval={1000}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={hcdcschool}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={hcdcschool2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={hcdcschool3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
