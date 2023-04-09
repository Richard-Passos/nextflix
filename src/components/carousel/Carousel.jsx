/* Components */
import { CarouselContainer, ButtonsContainer } from "./Carousel.style";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { MediaCard } from "../media-card";
import { PersonCard } from "../person-card";
import { ChevronRight, ChevronLeft } from "@styled-icons/boxicons-regular";

/* Logic */
import { useEffect, useRef, useState } from "react";

export default function Carousel({ children, title, slides, type = "media" }) {
  const [pageWidth, setPageWidth] = useState(null);
  const carousel = useRef();

  useEffect(() => {
    setPageWidth(document.querySelector("body").offsetWidth);
  }, []);

  useEffect(() => {
    document.querySelector("html").style.fontSize =
      pageWidth >= 2000 ? "100%" : "62.5%";
  }, [pageWidth]);

  /* Seting data to carousel */
  const CARD_WIDTH =
    type === "media"
      ? 175 * (pageWidth >= 2000 ? 1.6 : 1)
      : 100 * (pageWidth >= 2000 ? 1.6 : 1);

  const CARD_HEIGHT =
    type === "media"
      ? 300 * (pageWidth >= 2000 ? 1.6 : 1)
      : 150 * (pageWidth >= 2000 ? 1.6 : 1);

  const CARD_GAP = 15 * (pageWidth >= 2000 ? 1.6 : 1);
  /*  */

  return (
    <CarouselContainer
      ref={carousel}
      cardsCount={slides.length}
      cardWidth={CARD_WIDTH}
      cardHeight={CARD_HEIGHT}
      cardGap={CARD_GAP}
    >
      <div>
        <CarouselProvider
          visibleSlides={
            carousel?.current?.offsetWidth / (CARD_WIDTH + CARD_GAP) -
            (CARD_WIDTH >= 175 ? 0.1 : 0.2)
          }
          step={carousel?.current?.offsetWidth / (CARD_WIDTH + CARD_GAP) - 1}
          naturalSlideWidth={CARD_WIDTH}
          naturalSlideHeight={CARD_HEIGHT}
          totalSlides={slides.length}
          infinite
        >
          <h2 className="carousel-title">{title.replaceAll(/[_-]/g, " ")}</h2>
          {children}

          <Slider>
            {type === "media"
              ? slides.map((media, i) => (
                  <Slide index={i} key={`key-slide-${i}`}>
                    <MediaCard media={media} />
                  </Slide>
                ))
              : slides.map((person, i) => (
                  <Slide index={i} key={`key-slide-${i}`}>
                    <PersonCard person={person} />
                  </Slide>
                ))}
          </Slider>

          <ButtonsContainer>
            <ButtonBack></ButtonBack>
            <ChevronLeft className="carousel__back-button" />

            <ButtonNext></ButtonNext>
            <ChevronRight className="carousel__next-button" />
          </ButtonsContainer>
        </CarouselProvider>
      </div>
    </CarouselContainer>
  );
}
