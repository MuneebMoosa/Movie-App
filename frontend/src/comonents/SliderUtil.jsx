import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MovieCard from '../pages/Movies/MovieCard';

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: data?.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-text-secondary py-8 px-6 bg-surface/40 rounded-xl text-left text-sm font-medium">
        No movies available
      </div>
    );
  }

  return (
    <div className="w-full">
      <Slider {...settings}>
        {data.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderUtil
