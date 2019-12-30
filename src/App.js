import App from './App.svelte';
import svelte from 'svelte/compiler';
import createMenu from './utils/menu';

const app = new App({
  target: document.body
});

createMenu();

export default app;
