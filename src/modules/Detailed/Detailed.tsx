import {
    StyledArt,
    StyledAuthor,
    StyledBGImg,
    StyledBlock,
    StyledCategory,
    StyledContainer,
    StyledContent,
    StyledDescription,
    StyledExit,
    StyledExitImg,
    StyledIcon,
    StyledImg,
    StyledInfo,
    StyledTexts,
    StyledTitle,
    StyledUpdate,
} from './styles';
import Background from '@/assets/images/achiveCounterBg.png';
import Pensil from '@/assets/images/icons/pencil.svg';
import Exit from '@/assets/images/icons/arrow-exit.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { LINK_TEMPLATES } from '@/constants/link';
import { useGetArtQuery } from '@/api/art';

export const Detailed = () => {
    const { id } = useParams();
    const push = useNavigate();
    const { data, isLoading } = useGetArtQuery(id || '');
    if (isLoading) {
        return <>Loading...</>;
    }
    return (
        <StyledContainer>
            <StyledBGImg src={Background} />
            <StyledExit onClick={() => push(-1)}>
                <StyledExitImg src={Exit} />
            </StyledExit>
            <StyledArt>
                <StyledImg src={data?.image} />

                <StyledContent>
                    <StyledTexts>
                        <StyledTitle>{data?.title}</StyledTitle>
                        <StyledAuthor>{data?.authorName}</StyledAuthor>
                        <StyledDescription>{data?.description}</StyledDescription>
                    </StyledTexts>

                    <StyledBlock>
                        <StyledCategory>
                            <StyledInfo>Type: {data?.type}</StyledInfo>
                            <StyledInfo>Genre: {data?.genre}</StyledInfo>
                        </StyledCategory>
                        <StyledUpdate onClick={() => push(LINK_TEMPLATES.MODIFY)}>
                            <StyledIcon src={Pensil} />
                        </StyledUpdate>
                    </StyledBlock>
                </StyledContent>
            </StyledArt>
        </StyledContainer>
    );
};
