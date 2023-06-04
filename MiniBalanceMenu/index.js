import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../services/axios';

import * as actions from '../../store/modules/selectedbalance/actions';
import formatNumber from '../../services/formatNumber';
import BTCicon from '../../assets/media/images/cryptoicons/BTCicon.png';
import BRLicon from '../../assets/media/images/cryptoicons/BRLicon.png';
import { DropdownContainer, TextHighLight } from '../../styles/GlobalStyles';
import * as styled from './styled';
import { getCryptoIcon } from '../getCryptoIcon';

export default function MiniBalance() {
  const dispatch = useDispatch();

  const idLogged = useSelector((state) => state.auth.user.id);

  const [balancesList, setBalancesList] = useState(null);
  const [showAllBalances, setShowAllBalances] = useState(false);

  const dropdownRef = useRef(null);
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowAllBalances(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);

  async function getBalances() {
    const { data } = await axios.get(`balances/${idLogged}`);

    if (data.length > 0) {
      const updatedBalancesList = data.map((balance) => {
        const formattedBalance = formatNumber(balance);
        return { ...balance, balance: formattedBalance };
      });
      return setBalancesList(updatedBalancesList);
    }
    return null;
  }

  useEffect(() => {
    getBalances();
  }, []);

  function getBalance(currency) {
    let value;
    if (balancesList) {
      balancesList.forEach((balance) => {
        if (balance.currency === currency) {
          value = balance.balance;
        }
      });
    }
    return value;
  }

  function handleChangeBalance(currency) {
    dispatch(actions.changeBalance({ balance: currency }));
  }

  const renderAllBalances = () => {
    const balancesRows = [];
    if (balancesList) {
      balancesList.forEach((balance) => {
        balancesRows.push(
          <styled.Balance
            key={v4()}
            onClick={() => handleChangeBalance(balance.currency)}
          >
            <styled.BalanceValue>{balance.balance}</styled.BalanceValue>
            {getCryptoIcon(balance.currency)}
            <span>{balance.currency}</span>
          </styled.Balance>
        );
      });
    }
    return balancesRows;
  };

  return (
    <styled.Container>
      <div className="mini-balance" onClick={() => setShowAllBalances(true)}>
        <TextHighLight>{getBalance('BTC') ?? '0.00000000'}</TextHighLight>
        <img src={BTCicon} alt="logo" />
      </div>
      <Link to="/deposit">
        <div className="header-menus mini-balance-deposit">
          <TextHighLight>+</TextHighLight>
        </div>
      </Link>

      <DropdownContainer isActiveDropdown={showAllBalances} ref={dropdownRef}>
        <styled.AllBalances>{renderAllBalances()}</styled.AllBalances>
      </DropdownContainer>
    </styled.Container>
  );
}
