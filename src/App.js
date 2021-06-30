import Table from './components/Table'
import './App.css';
import { Provider } from 'react-redux';
import store from './state';
function App() {
  return (
    <Provider store={store}>
      <Table />
    </Provider>
  );
}

export default App;
