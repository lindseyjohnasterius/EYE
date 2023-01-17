



class EyeGrid extends HTMLElement {
  connectedCallback(){

    this.grid = document.createElement('div');
    this.grid.setAttribute('id', 'eye-grid'); 
    this.grid.style.opacity = 0;
    this.appendChild(this.grid);

    const hideShowToggleLabel = document.createElement('label');
    hideShowToggleLabel.innerText = 'SHOW GRID';

    this.hideShowToggle = document.createElement('input');
    this.hideShowToggle.setAttribute('type', 'checkbox');
    this.hideShowToggle.addEventListener('change', (e) =>{
      if(this.hideShowToggle.checked){
        this.grid.style.opacity = '1'
      } else {
        this.grid.style.opacity = '0'
      }
    });

    hideShowToggleLabel.appendChild(this.hideShowToggle);
    this.appendChild(hideShowToggleLabel);
    
    const gridSizeLabel = document.createElement('label');
    gridSizeLabel.innerText = 'Grid Size'; 

    this.notification_box = document.createElement('div');
    this.notification_box.innerText = 'Notification Box Booted';
    this.appendChild(this.notification_box);

    this.gridSize = document.createElement('input');
    this.gridSize.setAttribute('type', 'range');
    this.gridSize.setAttribute('min', 20);
    this.gridSize.setAttribute('max', 100);
    this.gridSize.setAttribute('value', 100);
    this.gridSize.addEventListener('input', (e) => {
      const new_grid_size = `${this.gridSize.value}px ${this.gridSize.value}px`;
      this.grid.style.backgroundSize = new_grid_size;
      this.notification_box.innerText = `Set grid size to ${new_grid_size}`
    })
    gridSizeLabel.appendChild(this.gridSize);
    this.appendChild(gridSizeLabel);


    const allowTiltButton = document.createElement('button')
    allowTiltButton.innerText = 'Allow Tilt';
    this.appendChild(allowTiltButton);
    allowTiltButton.addEventListener('click', () => {this.initializeDeviceTilt()})
  }

  initializeDeviceTilt(){

    function degrees_to_radians(degrees)
    {
      var pi = Math.PI;
      return degrees * (pi/180);
    }

    if(!DeviceMotionEvent.requestPermission){
      this.notification_box.innerText = 'No Device Motion'; 
      return
    }

    DeviceMotionEvent.requestPermission().then(response => {
      this.notification_box.innerText = 'Device Motion Accepted'; 

      if(response === "granted"){
        window.addEventListener('devicemotion', (e) => {
          const acceleration = e.acclerationIncludingGravity;


          let facingUp = -1;
          if (acceleration.z > 0){
            facingUp = +1;
          }

          var tiltLR = Math.round(((acceleration.x) / 9.81) * -90);
          var tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);


          var rotation = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB) + "deg)";

          this.notification_box.innerText = rotation;
          this.grid.style.transform = rotation;
          document.querySelector('video').style.transform = rotation;
        })
      }
    })


   this.notification_box.innerText = 'Notification Box Triggered'


  }

  handleDeviceTilt(){

  }
}

customElements.define('eye-grid', EyeGrid)


