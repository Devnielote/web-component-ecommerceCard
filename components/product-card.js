class productCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open',
        });
    };
    static get observedAttributes() {
        return [ `img`,`title`,`subtitle`,`description`,`price`,`button`];
    }

    attributeChangedCallback(attr,oldVal,newVal){
        if(oldVal !== newVal){
            this[attr] = newVal;
        };
    };
    getTemplate(){
        const formatPrice = (price) => {
            const newPrice = new window.Intl.NumberFormat('en-En',{
                style:'currency',
                currency:'USD',
            }).format(price)
            return newPrice;
        };
        const template = document.createElement('template');
        template.innerHTML = /*html*/
        `
            <section>
                <div class='image-container'>
                        <img src=${this.img} alt="" />
                </div>
                <div class='info-container'>
                    <div class='product-title'>
                        <h2>
                            ${this.title}
                        </h2>
                        <h3>
                        ${this.subtitle}
                        </h3>
                    </div>
                    <p>
                        ${this.description}
                    </p>
                    <div class='price-container'>
                        <span>
                            ${formatPrice(this.price)}
                        </span>
                        <button>
                            ${this.button}
                        </button>
                    </div>
                </div>
            </section>
            ${this.getStyles()}
        `;
        return template;
    }

    
    getStyles(){
        return /*css*/ `
        <style>
            :host {
                --color-primary: #47559F;
                --color-secondary: #F1F1F3;
                --title-fontsize: 2rem;
                --subtitle-fontsize: 1rem;
                --price-fontsize: 2.5rem;
            }

            * {
                margin: 0;
                padding: 0;
            }

            section {
                display: flex;
                flex-direction: column;
                height: 95vh;
                background: var(--color-secondary);
            }

            .image-container {
                position: relative;
                width: 100%;
                height: 45%;
                background: var(--color-primary);
            }

            .image-container img {
                position: absolute;
                bottom: -20%;
                right: 10%;
                width: 80%;
            }

            .info-container {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                height: 55%;
                padding: 2rem 1rem 2rem 1rem;
            }

            .info-container h2 {
                font-size: var(--title-fontsize);
            }

            .info-container h3 {
                font-size: var(--subtitle-fontsize);
                color: #ACACAE;
            }

            .price-container {
                display: flex;
                justify-content: space-between;
            }

            .price-container span {
                font-size: var(--title-fontsize)
            }

        </style>
        `
    }
    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    connectedCallback(){
        this.render()
    };
}

customElements.define('product-card',productCard);