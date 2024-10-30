import {
    StyledArt,
    StyledAuthor,
    StyledBGImg,
    StyledBlock,
    StyledCategory,
    StyledContainer,
    StyledContent,
    StyledDelete,
    StyledDescription,
    StyledExit,
    StyledExitImg,
    StyledIcon,
    StyledImg,
    StyledInfo,
    StyledTag,
    StyledTexts,
    StyledTitle,
    StyledUpdate,
} from './styles';
import Background from '@/assets/images/achiveCounterBg.png';
import Pensil from '@/assets/images/icons/pencil.svg';
import Delete from '@/assets/images/icons/delete.svg';
import Exit from '@/assets/images/icons/arrow-exit.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { LINK_TEMPLATES } from '@/constants/link';
import { useDeleteUserArtMutation, useGetArtQuery } from '@/api/art';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSnackbar } from 'notistack';
import { Loader } from '@/components/Loader';

export const Detailed = () => {
    const { id } = useParams();
    const push = useNavigate();
    const { data, isLoading } = useGetArtQuery(id || '');
    const { user } = useSelector((state: RootState) => state.auth);
    const { enqueueSnackbar } = useSnackbar();

    const { mutateAsync } = useDeleteUserArtMutation();
    const handlerDelete = () => {
        try {
            const isConfirm = confirm('Are you sure than you wonna delete art?');
            if (isConfirm && id) {
                mutateAsync(id);
                enqueueSnackbar('Success', { variant: 'success' });
                push(LINK_TEMPLATES.ALL_WORKS());
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong', { variant: 'warning' });
        }
    };

    if (isLoading) {
        return <Loader bgColor={'#E4EDD4'} />;
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
                        <StyledAuthor onClick={() => push(LINK_TEMPLATES.PROFILE(data!.ownerId))}>
                            {data?.authorName}
                        </StyledAuthor>
                        <StyledDescription>{data?.description}</StyledDescription>
                    </StyledTexts>

                    <StyledBlock>
                        <StyledCategory>
                            <StyledInfo>
                                Type:
                                {data?.type.map((item: string) => <StyledTag>{item}</StyledTag>)}
                            </StyledInfo>
                            <StyledInfo>
                                Genre:
                                {data?.genre.map((item: string) => <StyledTag>{item}</StyledTag>)}
                            </StyledInfo>
                        </StyledCategory>
                        {user?.id === data?.ownerId && (
                            <StyledBlock>
                                <StyledUpdate onClick={() => push(LINK_TEMPLATES.EDIT(data?.id || ''))}>
                                    <StyledIcon src={Pensil} />
                                </StyledUpdate>
                                <StyledDelete onClick={handlerDelete}>
                                    <StyledIcon src={Delete} />
                                </StyledDelete>
                            </StyledBlock>
                        )}
                    </StyledBlock>
                </StyledContent>
            </StyledArt>
        </StyledContainer>
    );
};
