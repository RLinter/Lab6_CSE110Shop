// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })  // Initialize shadow root

    // Wrapper for the attributes
    const wrapper = document.createElement('li')
    wrapper.setAttribute('class', 'product')

    // Image attribute
    const image = document.createElement('img')

    // Title attribute
    const title = document.createElement('p')
    title.setAttribute('class', 'title')

    // Price attribute
    const price = document.createElement('p')
    price.setAttribute('class', 'price')

    // Button attribute
    const button = document.createElement('button')
    button.setAttribute('onclick', "alert('Added to Cart')")

    // Append them to wrapper, li in this case
    wrapper.appendChild(image)
    wrapper.appendChild(title)
    wrapper.appendChild(price)
    wrapper.appendChild(button)

    // Control flower for switching between add and remove
    button.addEventListener('click', event => {
      if(event.target.textContent === 'Add to Cart'){
        add(this)
        event.target.textContent = 'Remove from Cart'
        event.target.setAttribute('onclick', "alert('Removed from Cart')")
        var num = Number(document.getElementById('cart-count').textContent)
        document.getElementById('cart-count').textContent = num + 1
      } else {
        remove(this)
        event.target.textContent = 'Add to Cart'
        event.target.setAttribute('onclick', "alert('Added to Cart')")
        var num = Number(document.getElementById('cart-count').textContent)
        document.getElementById('cart-count').textContent = num - 1
      }
    })
    button.textContent = 'Add to Cart'

    const style = document.createElement('style')
    style.textContent = 
      `.price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
          
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
          
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
          
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
          
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
          
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
          
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
      `
    this.shadowRoot.append(style, wrapper)
  }

  connectedCallback(){
    // Refresh the shadow root elements values
    refresh(this)
  }

}

customElements.define('product-item', ProductItem);