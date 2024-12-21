import hcdcschool from '../images/hcdcschool.png'
import hcdcschool2 from '../images/hcdcschool2.png'
import hcdcschool3 from '../images/hcdcschool3.png'

import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
    <div className="row">
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100" style={{ height: '620px' }}
            src={hcdcschool}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" style={{ height: '620px' }}
            src={hcdcschool2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100" style={{ height: '620px' }}
            src={hcdcschool3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
