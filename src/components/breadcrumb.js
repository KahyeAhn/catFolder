function Breadcrumb({ $app, initialState }) {
    this.state = initialState;
    this.$nav = document.createElement('nav');
    this.$nav.className = "Breadcrumb";
    $app.appendChild(this.$nav);

    this.setState = (next) => {
        this.state = next;
        this.render();
    }

    this.render = () => {
        this.$nav.innerHTML = `
            <div>root</div>
            ${this.state.map((node, index) =>
            `<div data-index=${index}>${node.name}</div>`
        ).join("")}
        `
    }
}

export default Breadcrumb;