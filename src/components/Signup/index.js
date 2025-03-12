import styled from 'styled-components';
import { Col, Row } from 'antd';
import icon_signup1 from 'resources/images/signup/icon_signup1.svg';
import icon_signup2 from 'resources/images/signup/icon_signup2.svg';
import icon_signup3 from 'resources/images/signup/icon_signup3.svg';
import SignUpForm from './SignupForm';

const StyledRow = styled(Row)`
  background-color: #f1f2f5;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  width: 100%;
`;
const FormCol = styled(Col)`
  display: flex;
  justify-content: center;
  background-color: #fff;
`;
const SideCol = styled(Col)`
  padding: 45px;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.div`
  font-weight: 900;
  font-size: 35px;
  color: black;
`;
const Subtitle = styled.div`
  font-size: 16px;
  color: #3e4977;
`;
const ParaInfo = styled.p`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000;
`;
function SideInformationBar(props) {
  return (
    <div style={{ marginBottom: '45px', height: '80px' }}>
      <div style={{ float: 'left', width: '40px' }}>
        <img src={props.icon} alt="group icon" />
      </div>
      <div style={{ float: 'left', width: '80%' }}>
        <ParaInfo>{props.title}</ParaInfo>
        <p style={{ fontSize: '12px', lineHeight: '18px' }}>{props.para}</p>
      </div>
    </div>
  );
}
export default function Signup() {
  return (
    <StyledRow className="signup-page-content">
      <FormCol sm={24} lg={18}>
        <div>
          <div style={{ paddingLeft: 'calc(1rem + 10px)' }}>
            <FormTitle>Getting started</FormTitle>
            <Subtitle>Setup your profile to continue.</Subtitle>
          </div>
          <SignUpForm />
        </div>
      </FormCol>

      <SideCol sm={24} lg={6}>
        <div>
          <SideInformationBar
            icon={icon_signup1}
            title="Expand All Across India"
            para="Cater to our PAN India clients and grow your product 
                  reach while we manage sales, operations, & logistics."
          />
          <SideInformationBar
            icon={icon_signup2}
            title="Receive Hassle-Free Payments"
            para="Get timely payments for fulfilled orders.
                   Avail early payment options with partner financing solutions."
          />
          <SideInformationBar
            icon={icon_signup3}
            title="Work on Latest Innovations"
            para="Collaborate on innovative development projects and be a 
                  part of the next biggest success story."
          />
        </div>
      </SideCol>
    </StyledRow>
  );
}
