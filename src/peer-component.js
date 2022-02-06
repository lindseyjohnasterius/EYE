import { getURLValues } from './helpers.js'

class PeerComponent extends HTMLElement {
  connectedCallback(){
    this.peer = new Peer(); 
    console.log(peer)

    const values = getURLValues()
    console.log(values)
    if(values.peer_id){
      const stream = document.querySelector('e-y-e').stream
      this.peer.call(id, stream)
    } else {

    }

    
  }
}

customElements.define('peer-component', PeerComponent)


