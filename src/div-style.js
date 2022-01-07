
import { getNewID } from './helpers.js'


class DivStyle extends HTMLElement {
  connectedCallback(){
    const container = document.createElement('details')
    this.form = document.createElement('form')
    this.form.innerHTML = `
      <label>Brightness</label>
      <input type="range" name="brightness">

      <label>Contrast</label>
      <input type="range" name="contrast">

      <label>Saturation</label>
      <input type="range" name="saturation">

      <label>flip</label>
      <input type="checkbox" name="flip">

    `

    container.appendChild(this.form)
    this.appendChild(container)
    const label = document.createElement('summary')
    label.innerText = 'SETTINGS'
    container.appendChild(label)
  

    this.form.addEventListener('mousedown', () => {
      this.form.addEventListener('mousemove', this.handleChange)
    })

    this.form.addEventListener('mouseup', () => {
      this.form.removeEventListener('mousemove', this.handleChange)
    })

    this.form.addEventListener('click', this.handleChange)


    this.form.addEventListener('ontouchstart', () => {
      this.form.addEventListener('ontouchmove', this.handleChange)
    })

    this.form.addEventListener('ontouchend', () => {
      this.form.removeEventListener('ontouchmove', this.handleChange)
    })

  }

  handleChange(){
    const inputs = this.querySelectorAll('input')
    const values = [...inputs].map(input => input.value !== 'on' ? input.value : input.checked)
    const div_style = this.closest('div-style')
    const video = div_style.querySelector('video')

    video.style.filter = 
    `brightness(${values[0] * 2}%) contrast(${values[1] * 2}%) saturate(${values[2] * 2}%)`

    const translation = values[3] ? -1 : 1
    video.style.transform = `
      scaleX(${translation})
    `

  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value){
    switch(name){
      default:
    }
  }

}

customElements.define('div-style', DivStyle)


