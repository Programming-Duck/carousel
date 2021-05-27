function modulo(number, mod) {
  let result = number % mod;
  if (result < 0) {
    result += mod;
  }
  return result;
}

/* Example tests for this function if you were using Jest. These would be in a separate test file. */
// expect(modulo(10, 2)).toBe(0);
// expect(modulo(11, 2)).toBe(1);

function setUpCarousel(carousel) {
  function handleNext() {
    currentSlide = modulo(currentSlide + 1, numSlides);
    changeSlide(currentSlide);
  }

  function handlePrevious() {
    currentSlide = modulo(currentSlide - 1, numSlides);
    changeSlide(currentSlide);
  }

  function changeSlide(slideNumber) {
    // change current slide
    carousel.style.setProperty('--current-slide', slideNumber);

    // handle screen reader accessibility
    const previousSlideNumber = modulo(slideNumber - 1, numSlides);
    const nextSlideNumber = modulo(slideNumber + 1, numSlides);
    const previousSlide = slidesContainer.children[previousSlideNumber];
    const currentSlideElement = slidesContainer.children[slideNumber];
    const nextSlide = slidesContainer.children[nextSlideNumber];

    previousSlide.setAttribute('aria-hidden', true);
    nextSlide.setAttribute('aria-hidden', true);
    currentSlideElement.setAttribute('aria-hidden', false);
  }

  // get elements
  const buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
  const buttonNext = carousel.querySelector('[data-carousel-button-next]');
  const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');

  let currentSlide = 0;
  const numSlides = slidesContainer.children.length;

  // set up events
  buttonPrevious.addEventListener('click', handlePrevious);
  buttonNext.addEventListener('click', handleNext);
}


/* Example for how a class version would work
class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
    this.buttonNext = carousel.querySelector('[data-carousel-button-next]');
    this.slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
    this.currentSlide = 0;
    this.numSlides = this.slidesContainer.children.length;

    this.buttonPrevious.addEventListener('click', this.handlePrevious.bind(this));
    this.buttonNext.addEventListener('click', this.handleNext.bind(this));
  }

  handleNext() {
    this.currentSlide = modulo(this.currentSlide + 1, this.numSlides);
    this.carousel.style.setProperty('--current-slide', this.currentSlide);
  }

  handlePrevious() {
    this.currentSlide = modulo(this.currentSlide - 1, this.numSlides);
    this.carousel.style.setProperty('--current-slide', this.currentSlide);
  }
}
*/



const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(setUpCarousel);

// carousels.forEach(carouselElement => new Carousel(carouselElement));
