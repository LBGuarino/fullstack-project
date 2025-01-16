import { ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type ResponsiveType = {
  [key: string]: {
    breakpoint: { max: number; min: number };
    items: number;
    slidesToSlide?: number;
  };
};

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

type CarouselProps = {
  children: ReactNode;
  deviceType?: string;
};

export const CarouselComponent: React.FC<CarouselProps> = ({
  deviceType,
  children,
}) => {
  return (
    <Carousel
      swipeable={deviceType === "mobile"}
      draggable={true}
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={deviceType !== "mobile"}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="relative mx-auto max-w-7xl bg-transparent rounded-lg overflow-hidden"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={deviceType}
      dotListClass="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
      itemClass="px-8"
      renderDotsOutside={true}
      arrows={false}
    >
      {children}
    </Carousel>
  );
};

export default CarouselComponent;
