import { StyledArt, StyledCard, StyledContainer, StyledContainerTitle, StyledTitle } from './styles';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';
import { useGetFiltredArtsQuery } from '@/api/art';
import { IArtIterator } from '@/api/art/types';

export const Artworks = () => {
    const push = useNavigate();
    const { data, isLoading } = useGetFiltredArtsQuery();

    if (isLoading) {
        return <>Loading....</>;
    }
    return (
        <StyledContainer>
            {data?.map((item: IArtIterator) => (
                <StyledCard onClick={() => push(LINK_TEMPLATES.DETAILED())}>
                    <StyledArt path={item.image} />
                    <StyledContainerTitle>
                        <StyledTitle>{item.title}</StyledTitle>
                    </StyledContainerTitle>
                </StyledCard>
            ))}
        </StyledContainer>
    );
};
