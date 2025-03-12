/* eslint-disable */
import {
  StyledArrowDownOutlined,
  StyledArrowUpOutlined,
  StyledLeftText,
  StyledMetric,
  StyledQuestionCircleOutlined,
  StyledRightDiv,
  StyledRightText,
  StyledSubTextDiv,
  StyledTitle,
  StyledTitleDiv
} from './metric.styled';

export default function Metric(props) {
  const { variant, title, leftText, rightText } = props;
  let arrowIcon = null;

  switch (variant) {
    case 'up':
      arrowIcon = <StyledArrowUpOutlined />;
      break;
    case 'down':
      arrowIcon = <StyledArrowDownOutlined />;
      break;
    default:
      break;
  }

  return (
    <StyledMetric>
      <StyledTitleDiv>
        <StyledTitle ellipsis={{ tooltip: title }}>{title}</StyledTitle>
        <StyledQuestionCircleOutlined />
      </StyledTitleDiv>
      <StyledSubTextDiv>
        <StyledLeftText>{leftText}</StyledLeftText>
        <StyledRightDiv>
          {arrowIcon}
          <StyledRightText textVariant={variant}>{rightText}</StyledRightText>
        </StyledRightDiv>
      </StyledSubTextDiv>
    </StyledMetric>
  );
}
