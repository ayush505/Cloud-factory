import { StyledButton, StyledButtonDiv, StyledVideoCameraOutlined } from './button.styled';

export default function LiveVideoButton(props) {
  return (
    <StyledButton type="primary" {...props}>
      <StyledButtonDiv>
        <StyledVideoCameraOutlined />
        Live Video
      </StyledButtonDiv>
    </StyledButton>
  );
}
