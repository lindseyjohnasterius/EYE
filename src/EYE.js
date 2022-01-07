console.log('EYE')





class EYE extends HTMLElement {
  connectedCallback(){

    const connect_button = document.createElement('button')
    connect_button.innerText = 'CONNECT'
    this.appendChild(connect_button)
    connect_button.addEventListener('click',()=>{
      this.initVideo();
      connect_button.remove()
    })

  }

  handleResize(){
    // this.getSize()
    // this.initVideo()

  }

  initVideo(){
    this.getSize();

    // const available_devices = document.createElement('available-devices');
    // this.appendChild(available_devices);
    // available_devices.addEventListener('DEVICE SELECTED', (e) => {
    //   this.selected_device = e.detail;
    //   this.initVideo();
    // })

    const div_style = document.createElement('div-style');


    this.video = document.createElement('video');
    this.video.width = this.width;
    this.video.height = this.height;
    div_style.appendChild(this.video);
    this.appendChild(div_style)

    this.video.addEventListener('click', () => {
      if(this.video.paused){
        this.video.play()
      } else {
        this.video.pause()
      }
    })

    this.getMedia();


    window.addEventListener("resize", ()=>this.handleResize());

  }

  getSize(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  async getMedia(){
    if(this.stream){
      this.stream = null
    }
    const constraints = {
      audio: false,
      video: {
        width: this.width, 
        height: this.height,
        deviceId: this.selected_device
      }
    }

    this.stream = await navigator.mediaDevices.getUserMedia(constraints)

    this.video.srcObject = this.stream
    this.video.play()
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

customElements.define('e-y-e', EYE)






class AvailableDevices extends HTMLElement {
  connectedCallback(){
    this.init()
  }

  async init(){
    const drop_down = document.createElement('select')
    const devices = await this.getDevices()
    console.log(devices)
    if(devices.length === 1){
      this.deviceSelected(devices[0])
    }
    // if(devices.length > 0){
    //   devices.forEach(device => {
    //     const option = document.createElement('option')
    //     option.value = device.deviceId
    //     option.innerText = "label"
    //     drop_down.appendChild(option)
    //   })

    // }
  }

  deviceSelected(device){
    const initialize_event = new CustomEvent('DEVICE SELECTED', {detail: device})
    this.dispatchEvent(initialize_event)

  }



  async getDevices(){
    const devices = await navigator.mediaDevices.enumerateDevices()
    const video_devices = devices.filter(device => device.kind === 'videoinput')
    return video_devices
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

customElements.define('available-devices', AvailableDevices)


