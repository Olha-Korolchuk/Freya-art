import { StyledArt, StyledCard, StyledContainer, StyledContainerTitle, StyledTitle } from './styles';
import { artworksMock } from '@/constants/artworksMock';
import { IUserInfo } from '../../../../types';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';

export const Artworks = () => {
    const push = useNavigate();
    return (
        <StyledContainer>
            {artworksMock.map((item: IUserInfo, index) => (
                <StyledCard
                    key={index}
                    data-cy={`artwork-card-${index}`}
                    onClick={() => push(LINK_TEMPLATES.DETAILED())}
                >
                    <StyledArt path={item.img} data-cy={`artwork-img-${index}`} />
                    <StyledContainerTitle>
                        <StyledTitle data-cy={`artwork-title-${index}`}>{item.title}</StyledTitle>
                    </StyledContainerTitle>
                </StyledCard>
            ))}
        </StyledContainer>
    );
};
