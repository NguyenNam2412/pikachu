import { Provider } from 'react-redux'

import { store } from './helpers/store'

import Render from './Components/Render';

function App() {
  return (
    <Provider store={store}>
      <Render />
    </Provider>
  );
}

export default App;
