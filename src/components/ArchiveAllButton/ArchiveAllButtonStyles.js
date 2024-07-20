import { css } from "@emotion/react";

export const buttonStyle = css`
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;
