const IMAGE_URL = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public/";

function ImageView({ $app, initialState }) {
    this.state = initialState;
    this.$div = document.createElement("div");
    this.$div.className = "ImageViewer";
    $app.appendChild(this.$div);

    this.setState = (next) => {
        this.state = next;
        this.render();
    }

    this.render = () => {
        if (this.state) {
            this.$div.classList.add("Modal");
            this.$div.innerHTML = `
            <div class="content">
            <img src=${IMAGE_URL}${this.state} />
            </div>
            `
        }
    }

}

export default ImageView;