import { StyledFooter, StyledImg, StyledNavs, StyledText } from './styles';
import { Link } from 'react-router-dom';
import { footerLink } from '@/constants/footerLink';
import { INavsItem } from './types';

export const Footer = () => {
    return (
        <StyledFooter>
            <StyledText>Contact us</StyledText>
            <StyledNavs>
                {footerLink.map((item: INavsItem) => (
                    <Link to={'/'} key={item.path}>
                        <StyledImg src={item.path}></StyledImg>
                    </Link>
                ))}
            </StyledNavs>
        </StyledFooter>
    );
};
