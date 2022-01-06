



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
  

    this.form.addEventListener('mousedown', () => {
      this.form.addEventListener('mousemove', this.handleChange)
    })

    this.form.addEventListener('mouseup', () => {
      console.log('mouse_up')
      this.form.removeEventListener('mousemove', this.handleChange)
    })

  }

  handleChange(){
    console.log(this)
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


