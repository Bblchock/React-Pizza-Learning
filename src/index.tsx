import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';

const rootElem = document.getElementById('root')
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    // <BrowserRouter>
    <HashRouter basename='/'>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
    // </BrowserRouter>
  );
}
