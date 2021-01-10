import React from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import TableComp from '../components/Table';
import Logo from './logotrybe.png';

class Wallet extends React.Component {
  constructor() {
    super();
    this.expenseCounter = this.expenseCounter.bind(this);
  }

  expenseCounter(expenses) {
    return expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const multiplier = exchangeRates[currency].ask;
      return acc + value * multiplier;
    }, 0);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home" className="d-flex align-items-end">
            <img src={ Logo } alt="Logo" height="44" className="mb-1 mr-1" />
            <span className="font-weight-bold">Wallet</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="d-flex align-items-center">
              <span data-testid="email-field" className="mr-2">
                {email}
              </span>
              <span data-testid="total-field">
                {this.expenseCounter(expenses)}
              </span>
              <span data-testid="header-currency-field">BRL</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Form />
        <TableComp />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  expenses: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
