import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Container = styled.div`
  display: flex;
  position: relative;
  user-select: none;
  cursor: pointer;

  div {
    border-radius: 0.25rem;
  }

  .mini-balance {
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    background-color: ${colors.lightdark};
    gap: 0.5rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    span {
      font-size: 15px;
    }
    img {
      width: 15px;
      height: 15px;
    }
    &:hover {
      filter: brightness(0.9);
    }
  }
  .mini-balance-deposit {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background-color: ${colors.green};

    span {
      font-size: 22px;
    }
  }
`;

export const AllBalances = styled.div`
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};

  span {
    font-size: 15px;
    font-weight: 700;
    color: ${colors.dark};
  }
  img {
    width: 15px;
    height: 15px;
  }
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: ${colors.white};

  &:hover {
    filter: brightness(0.9);
  }
`;

export const BalanceValue = styled.span`
  width: 12rem;
`;
