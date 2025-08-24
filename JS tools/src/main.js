import './style.css'
import { setupCounter } from '/src/js/counter.js'


document.querySelector('#helloButton').addEventListener('click', () => {
  alert('Hello, world!')
})


setupCounter(document.querySelector('#counter'))
