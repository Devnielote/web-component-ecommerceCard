class productCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({
            mode: 'open',
        });
    };
    static get observedAttributes() {
        return [ `bgtext`,`img`,`title`,`subtitle`,`description`,`price`,`button`];
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
                    <div class="image-bgText">
                        <p>${this.bgtext}</p>
                    </div>
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
                --subtitle-fontsize: .9rem;
                --price-fontsize: 2.5rem;
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            section {
                display: flex;
                flex-direction: column;
                width: 100%;
                min-width: 320px;
                max-width: 1024px;
                height: 800px;
                background: var(--color-secondary);
            }

            .image-container {
                position: relative;
                width: 100%;
                height: 45%;
                padding-left: 2rem;
                background: var(--color-primary);
            }

            .image-container .image-bgText {
                font-weight: bold;
                font-size: 5rem;
                color: rgba(0,0,0,.2)
            }

            .image-container img {
                position: absolute;
                bottom: -15%;
                right: 10%;
                width: 100%;
                min-width: 360px;
                max-width: 50%;
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
                text-transform: uppercase;
                color: #ACACAE;
            }

            .price-container {
                display: flex;
                justify-content: space-between;
            }

            .price-container span {
                font-weight: bold;
                font-size: var(--title-fontsize);
                color: #ACACAE;
            }

            .price-container button {
                width: 110px;
                background: var(--color-primary);
                border-radius: 20px;
                border: none;
                text-transform: uppercase;
                font-weight: bold;
                color: var(--color-secondary);
            }
            @media (min-width: 1024px){
                section {
                    flex-direction: row;
                }

                .image-container {
                    width: 50%;
                    height: 100%;
                }

                .image-container .image-bgText {
                    font-size: 8rem;
                }

                .image-container img {
                   top: 15%;
                   right: -15%;
                   min-width: 800px;
                   transform: rotate(-30deg);
                }

                .info-container {
                    width: 50%;
                    height: 100%;
                    padding: 0 3rem 0 3rem;
                }

                .info-container p {
                    padding-left: 2rem;
                }

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