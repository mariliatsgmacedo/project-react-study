import { render } from 'react-dom';
import { App } from './App';

//Receber dois parametros
//1 - O que vai ser renderizado o que eu quero exibir na tela
//2 - Dentro de qual elemento eu quero renderizar essa informação
render(<App/>, document.getElementById('root'))