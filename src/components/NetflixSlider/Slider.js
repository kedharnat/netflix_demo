import React, { useState } from 'react';
import cx from 'classnames';
import SliderContext from './context'
import Content from './Content'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import './Slider.scss'

const Slider = ({ children, activeSlide, isAdd, onToggle }) => {
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const { width, elementRef } = useSizeElement();
  const {
    slideProps,
    containerRef,
  } = useSliding(width, React.Children.count(children));

  const handleSelect = movie => {
    setCurrentSlide(movie);
  };

  const handleClose = () => {
    setCurrentSlide(null);
  };
  const handleToggle = (movie) => {
    setCurrentSlide(null);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <SliderWrapper>
        <div
          className={cx('slider', { 'slider--open': currentSlide != null })}
        >
          <div ref={containerRef} className="slider__container" {...slideProps}>{children}</div>
        </div>
      </SliderWrapper>
      {currentSlide && <Content movie={currentSlide} isAdd={isAdd} onClose={handleClose} onToggle={(...args) => {
        handleToggle();
        onToggle(...args);
      }}/>}
    </SliderContext.Provider>
  );
};

export default Slider;
