import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form as Fr, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import fetchAPI from '../services/fetchAPI';
import { actionAPI, actionEdit, actionChangeEditState } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      currency: 'USD',
      value: 0,
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.counter = 0;
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const resp = await fetchAPI();
    this.setState({
      currencies: Object.keys(resp),
    });
  }

  handleChange({ target: { name, value } }) {
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      ActionAPI,
      ActionEdit,
      editingMode,
      editingId,
      exitEditMode,
    } = this.props;
    // console.log(editingId);
    const { currency, value, description, method, tag } = this.state;
    const id = this.counter;
    if (editingMode) {
      ActionEdit({ currency, value, description, method, tag, id: editingId });
    } else {
      ActionAPI({ currency, value, description, method, tag, id });
    }
    exitEditMode(false);
    this.counter += 1;
  }

  render() {
    const {
      currencies,
      currency,
      value,
      description,
      method,
      tag,
    } = this.state;
    const { editingMode } = this.props;
    return (
      <div className={ `${editingMode ? 'bg-warning' : 'bg-dark'} p-4 ` }>
        <Fr onSubmit={ this.handleSubmit }>
          <Fr.Row>
            <Col>
              <Fr.Control
                placeholder="Despesas"
                name="value"
                type="number"
                data-testid="value-input"
                id="disp"
                value={ value }
                onChange={ this.handleChange }
              />
            </Col>
            <Col>
              <Fr.Control
                placeholder="decription"
                name="description"
                type="text"
                data-testid="description-input"
                id="desc"
                value={ description }
                onChange={ this.handleChange }
              />
            </Col>
            <Col>
              <Fr.Control
                as="select"
                name="currency"
                id="curr"
                data-testid="currency-input"
                onChange={ this.handleChange }
                value={ currency }
              >
                {currencies.map((curr) => (
                  <option key={ curr } data-testid={ curr } value={ curr }>
                    {curr}
                  </option>
                ))}
              </Fr.Control>
            </Col>
            <Col>
              <Fr.Control
                as="select"
                name="method"
                id="pay"
                data-testid="method-input"
                onChange={ this.handleChange }
                value={ method }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </Fr.Control>
            </Col>
            <Col>
              <Fr.Control
                as="select"
                name="tag"
                id="desp"
                data-testid="tag-input"
                onChange={ this.handleChange }
                value={ tag }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </Fr.Control>
            </Col>
            <Col>
              <Button type="submit" variant={ `${editingMode ? 'primary' : 'success'}` }>
                {editingMode ? 'Editar despesa' : 'Adicionar despesa'}
              </Button>
            </Col>
          </Fr.Row>
        </Fr>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  editingMode: store.wallet.editor,
  editingId: store.wallet.idToEdit,
});

const mapDispatchToProps = {
  ActionAPI: actionAPI,
  ActionEdit: actionEdit,
  exitEditMode: actionChangeEditState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  ActionAPI: PropTypes.func.isRequired,
  ActionEdit: PropTypes.func.isRequired,
  editingMode: PropTypes.bool.isRequired,
  editingId: PropTypes.number.isRequired,
  exitEditMode: PropTypes.func.isRequired,
};
