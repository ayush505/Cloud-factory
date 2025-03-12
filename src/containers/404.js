import React from 'react';
import styled from 'styled-components';

import { BLACK, WHITE } from 'commons/Colors';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BLACK};
  color: ${WHITE};
  height: 100vh;
  font-weight: 700;
  font-size: 2em;
`;

export default function NotFound() {
  return (
    <Container>
      <p>
        You seem to have landed on a wrong URL <span role="img" aria-label="Devil Emoji" />
      </p>
    </Container>
  );
}
