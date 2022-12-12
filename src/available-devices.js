

class AvailableDevices extends HTMLElement {

  connectedCallback(){
    this.init()
  }

  async init(){
    const drop_down = document.createElement('select')
    const devices = this.devices = await this.getDevices()
    if(devices.length > 0){
      devices.forEach(device => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.innerText = device.label;
        drop_down.appendChild(option);
      })
    }

    this.selected_device = devices[0];

    drop_down.addEventListener('change', (e)=>{
      const device = devices.find(d => {
        return d.deviceId === e.target.value
      })
      this.deviceSelected(device);
    })

    this.appendChild(drop_down)
  }

  deviceSelected(device){
    this.selected_device = device;
    this.dispatchEvent(
      new CustomEvent('DEVICE SELECTED', {detail:device})
    );
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
