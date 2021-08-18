function Node({ $app, initialState, onClick }) {
    this.state = initialState;
    this.$div = document.createElement('div');
    this.$div.className = "Nodes";
    $app.appendChild(this.$div);

    this.setState = (next) => {
        this.state = next;
        this.render();
    }

    this.onClick = onClick;

    this.render = () => {
        if (this.state.nodes && this.state.nodes.length > 0) {
            const innerNode = this.state.nodes.map((node) => {
                const nodePath = node.type === 'FILE' ? "./assets/file.png" : "./assets/directory.png";

                return `<div class="Node" data-node-id=${node.id}>
                    <img src="${nodePath}" />
                    <div>${node.name}</div>
                </div>`
            }).join("");

            this.$div.innerHTML = innerNode;
        }



        this.$div.addEventListener("click", e => {
            const node = e.target.closest(".Node");
            if (node) {
                const { nodeId } = node.dataset;
                const selectedNode = this.state.nodes.find(target => target.id === nodeId);
                if (selectedNode) {
                    this.onClick(selectedNode);
                }
            }
        })
    }
}

export default Node;