import { useDeleteUserArtMutation, useGetArtQuery } from '@/api/art';
import { useGetUserProfile } from '@/api/user';
import Background from '@/assets/images/achiveCounterBg.png';
import Delete from '@/assets/images/icons/delete.svg';
import Pensil from '@/assets/images/icons/pencil.svg';
import { Loader } from '@/components/Loader';
import { LINK_TEMPLATES } from '@/constants/link';
import { RootState } from '@/store/store';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    StyledArt,
    StyledAuthor,
    StyledAvatar,
    StyledBGImg,
    StyledBlock,
    StyledCategory,
    StyledContainer,
    StyledContent,
    StyledDelete,
    StyledDescription,
    StyledImg,
    StyledInfo,
    StyledRow,
    StyledTag,
    StyledTexts,
    StyledTitle,
    StyledUpdate,
} from './styles';
import Avatar from '@/assets/images/userAvatar.jpg';

export const Detailed = () => {
    const { id } = useParams();
    const push = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useSelector((state: RootState) => state.auth);

    const { mutateAsync } = useDeleteUserArtMutation();
    const { data, isLoading } = useGetArtQuery(id || '');
    const isOwner = user?.id === data?.ownerId;

    const { data: profile = user, isLoading: isLoadingProfile } = useGetUserProfile(data?.ownerId || '', isOwner);

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

    if (isLoading || isLoadingProfile) {
        return <Loader bgColor={'#E4EDD4'} />;
    }

    return (
        <StyledContainer>
            <StyledBGImg src={Background} />
            <StyledArt>
                <StyledImg data-cy="art-image" src={data?.image} />
                <StyledContent>
                    <StyledTexts>
                        <StyledTitle data-cy="art-title">{data?.title}</StyledTitle>
                        <StyledRow onClick={() => push(LINK_TEMPLATES.PROFILE(data!.ownerId))}>
                            <StyledAvatar src={profile?.image || Avatar} alt="author avatar" />
                            <StyledAuthor data-cy="art-author">{profile?.name}</StyledAuthor>
                        </StyledRow>
                        <StyledDescription data-cy="art-description">{data?.description}</StyledDescription>
                    </StyledTexts>

                    <StyledBlock>
                        <StyledCategory>
                            <StyledInfo data-cy="art-type-tags">
                                Type:
                                {data?.type.map((item: string) => <StyledTag data-cy="art-tag">{item}</StyledTag>)}
                            </StyledInfo>
                            <StyledInfo data-cy="art-genre-tags">
                                Genre:
                                {data?.genre.map((item: string) => <StyledTag data-cy="art-tag">{item}</StyledTag>)}
                            </StyledInfo>
                        </StyledCategory>
                        {isOwner && (
                            <StyledBlock>
                                <StyledUpdate
                                    onClick={() => push(LINK_TEMPLATES.EDIT(data?.id || ''))}
                                    data-cy="edit-art"
                                >
                                    <img src={Pensil} alt="edit" />
                                </StyledUpdate>
                                <StyledDelete onClick={handlerDelete} data-cy="delete-art">
                                    <img src={Delete} alt="delete" />
                                </StyledDelete>
                            </StyledBlock>
                        )}
                    </StyledBlock>
                </StyledContent>
            </StyledArt>
        </StyledContainer>
    );
};
