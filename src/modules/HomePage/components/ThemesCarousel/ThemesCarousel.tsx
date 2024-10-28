import { StyledContainer, StyledContainerTitle, StyledImg, StyledText, StyledTitle } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { themesCarousel } from '@/constants/themesCarousel';
import { A11y, EffectCoverflow, Navigation } from 'swiper/modules';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';

export const ThemesCarousel = () => {
    const push = useNavigate();
    return (
        <StyledContainer data-cy="carousel-container">
            <StyledText data-cy="carousel-title">Themes of the month</StyledText>
            <Swiper
                effect={'coverflow'}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: -25,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                modules={[Navigation, A11y, EffectCoverflow]}
                spaceBetween={100}
                slidesPerView={3}
                navigation
            >
                {themesCarousel.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => push(LINK_TEMPLATES.DETAILED())}
                        data-cy={`carousel-slide-${index}`}
                    >
                        <StyledImg path={item.path} data-cy={`slide-img-${index}`} />
                        <StyledContainerTitle>
                            <StyledTitle data-cy={`slide-title-${index}`}>{item.title}</StyledTitle>
                        </StyledContainerTitle>
                    </SwiperSlide>
                ))}
            </Swiper>
        </StyledContainer>
    );
};
