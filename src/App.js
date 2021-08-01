import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer'
import { fetchCustomers } from './asyncActions/customers'

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)


  const addCash = () => {
    dispatch({
      type: 'ADD_CASH',
      payload: 1
    })
  }

  const getCash = () => {
    dispatch({
      type: 'GET_CASH',
      payload: 1
    })
  }

  const addCustomer = name => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (id) => {
    dispatch(removeCustomerAction(id))
  }

  return (
    <div>
      <p>Денежка: {cash}</p>
      <button onClick={() => addCash()} style={{ marginRight: '10px' }}>Добавить</button>
      <button onClick={() => getCash()}>Снять</button>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => addCustomer(prompt())} style={{ marginRight: '10px' }}>Добавить клиента</button>
        <button onClick={() => getCash()}>Удалить клиента</button>
        <button onClick={() => dispatch(fetchCustomers())}>Получить клиентов из базы</button>
        {/* <button onClick={() => fetchCustomers()(dispatch)}>Получить клиентов из базы</button> */}
        {customers.length > 0 ?
          <div>
            {customers.map(customer =>
              <p onClick={() => removeCustomer(customer.id)} style={{ padding: '5px' }}>{customer.name}</p>
            )}
          </div>
          :
          <p>Клиенты отсутствуют</p>
        }
      </div>
    </div>
  );
}

export default App;
