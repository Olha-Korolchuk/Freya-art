import {
    StyledArt,
    StyledArts,
    StyledButton,
    StyledCard,
    StyledContainer,
    StyledContainerTitle,
    StyledContent,
    StyledImg,
    StyledLine,
    StyledText,
    StyledTitle,
} from './styles';
import Plus from '@/assets/images/icons/plus.svg';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';
import { useGetUserArtsQuery } from '@/api/art';
import { IArtIterator } from '@/api/art/types';

export const Arts = () => {
    const push = useNavigate();
    const { data, isLoading } = useGetUserArtsQuery();

    // "TODO: Provide Loader"
    if (isLoading) {
        return <>Loading</>;
    }
    return (
        <>
            <StyledContainer>
                <StyledContent>
                    <StyledText>Artworks</StyledText>
                    <StyledButton onClick={() => push(LINK_TEMPLATES.CREATE)}>
                        <StyledImg src={Plus} />
                    </StyledButton>
                </StyledContent>
                <StyledLine />
                <StyledArts>
                    {data?.map((item: IArtIterator) => (
                        <StyledCard onClick={() => push(LINK_TEMPLATES.DETAILED(item.id))} key={item.id}>
                            <StyledArt path={item.image} />
                            <StyledContainerTitle>
                                <StyledTitle>{item.title}</StyledTitle>
                            </StyledContainerTitle>
                        </StyledCard>
                    ))}
                </StyledArts>
                {/* <StyledNoArts>
                    <StyledText>The user has not added artwork yet</StyledText>
                </StyledNoArts> */}
            </StyledContainer>
        </>
    );
};
