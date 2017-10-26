//if(process.env.BROWSER) require('styles/index.scss');

import { h, render } from 'preact';
import Store from './model/store';
import createView from './view/view';
const store = new Store();

const View = createView(store);
const root = document.querySelector('#app');
render(<View />, root, root.lastElementChild);
