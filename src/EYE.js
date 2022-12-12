
class ConnectButton extends HTMLElement {
  connectedCallback(){
    const connect_button = document.createElement('button')
    connect_button.innerText = 'CONNECT'
    this.appendChild(connect_button)
    connect_button.addEventListener('click',()=>{
      this.dispatchEvent(new CustomEvent('connect'))
      connect_button.remove()
    })
  }
}

customElements.define('connect-button', ConnectButton)


class EYE extends HTMLElement {
  connectedCallback(){

    const menu = document.createElement('nav');

    const connect = document.createElement('connect-button');
    menu.appendChild(connect);
    connect.addEventListener('connect', ()=> {
      this.initVideo();
    });

    const available_devices = this.available_devices = document.createElement('available-devices');
    available_devices.addEventListener('DEVICE SELECTED', (e)=> {
      this.getMedia()
    })
    menu.appendChild(available_devices);
    this.appendChild(menu);

  }

  handleResize(){
    // this.getSize()
    // this.initVideo()

  }

  initVideo(){
    this.getSize();
    this.video = document.createElement('video');
    this.video.width = this.width;
    this.video.height = this.height;

    this.appendChild(this.video);
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
    return [this.width, this.height]
  }

  async getMedia(){
    if(this.stream){
      this.stream.getTracks().forEach(track => {
        track.stop();
      })
    }

    this.stream = null;

    console.log(this.available_devices.selected_device);
    const constraints = {
      audio: false,
      video: {
        width: this.width, 
        height: this.height,
        deviceId: this.available_devices.selected_device
      }
    }

    console.log(constraints);

    this.stream = await navigator.mediaDevices.getUserMedia(constraints)
    this.video.srcObject = null;
    this.video.srcObject = this.stream;
    this.video.load();
    this.video.play();
  }
}

customElements.define('e-y-e', EYE)



