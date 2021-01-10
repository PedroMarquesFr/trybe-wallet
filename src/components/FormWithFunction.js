import React, { useState, useEffect } from 'react';
import fetchAPI from '../services/fetchAPI';

export default function Form() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetchAPI();
      setCurrencies(Object.keys(resp));
    }
    fetchData();
  }, []);

  return (
    <div>
      <form>
        <div>
          <label htmlFor="disp">
            despesas
            <input type="number" data-testid="value-input" id="disp" />
          </label>
        </div>
        <div>
          <label htmlFor="desc">
            Descrição
            <input type="text" data-testid="description-input" id="desc" />
          </label>
        </div>
        <div>
          <select name="cars" id="cars" data-testid="currency-input">
            {currencies.map((curr) => (
              <option key={ curr } data-testid={ curr }>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
