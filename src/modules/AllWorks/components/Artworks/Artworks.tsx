import { StyledArt, StyledCard, StyledContainer, StyledContainerTitle, StyledNoArts, StyledTitle } from './styles';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';
import { IArtIterator } from '@/api/art/types';
import { FC } from 'react';

interface IArtWorksProps {
    arts: IArtIterator[];
}

export const Artworks: FC<IArtWorksProps> = ({ arts }) => {
    const push = useNavigate();
    if (!arts.length) {
        return (
            <StyledNoArts>
                <StyledTitle>Artworks not found</StyledTitle>
            </StyledNoArts>
        );
    }
    return (
        <StyledContainer>
            {arts?.map((item: IArtIterator) => (
                <StyledCard onClick={() => push(LINK_TEMPLATES.DETAILED(item.id))} key={item.id} data-cy="art-card">
                    <StyledArt data-cy="art-img" path={item.image} />
                    <StyledContainerTitle>
                        <StyledTitle data-cy={`artwork-title-${item.id}`}>{item.title}</StyledTitle>
                    </StyledContainerTitle>
                </StyledCard>
            ))}
        </StyledContainer>
    );
};
