import { StyledDiv, StyledLeftText, StyledRightText } from './header.styled';
import { StyledLink } from '..';

export default function Header(props) {
  const { leftText, onLinkClick, rightText } = props;

  return (
    <StyledDiv>
      {onLinkClick ? (
        <StyledLink onClick={onLinkClick}>{leftText}</StyledLink>
      ) : (
        <StyledLeftText>{leftText}</StyledLeftText>
      )}
      <StyledRightText>{rightText}</StyledRightText>
    </StyledDiv>
  );
}
