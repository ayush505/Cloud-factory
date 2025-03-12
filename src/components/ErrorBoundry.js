/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const Wrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1.5625rem;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: 600;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.15);
  margin: 0.625rem 0;
`;
const SadEmoji = styled.span`
  font-size: 2rem;
`;
const TimeStamp = styled.div`
  font-size: 10px;
  color: grey;
`;

const IS_PRODUCTION_ENV = process.env.NODE_ENV === 'production';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    // TODO: Uncomment this{Anubhaw}
    // this.airbrake = new AirbrakeClient()
  }

  static getDerivedStateFromError(error, info) {
    // Update state so the next render will show the fallback UI.

    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Send error to Airbrake
    if (IS_PRODUCTION_ENV) this.airbrake.notify(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <SadEmoji>🤕</SadEmoji>
          <span>Omg, Something went Wrong</span>
          <TimeStamp>{format(new Date(), 'DD MMM, HH:MM a')}</TimeStamp>
        </Wrapper>
      );
    }
    return this.props.children;
  }
}
