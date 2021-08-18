import { fetchData } from "./api/api.js";
import Breadcrumb from "./components/breadcrumb.js";
import Node from "./components/node.js";
import imageView from "./components/imageView.js";
import ImageView from "./components/imageView.js";


function App($app) {
    this.state = {
        isRoot: false,
        nodes: [],
        depth: [],
        selectedPath: null,
    }

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth,
    });

    const nodes = new Node({
        $app,
        initialState: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
        },
        onClick: async (node) => {
            if (node.type === "DIRECTORY") {
                const nextNodes = await fetchData(node.id);
                this.setState({
                    ...this.state,
                    nodes: nextNodes,
                    depth: [...this.state.depth, node],
                })
            } else if (node.type === "FILE") {
                this.setState({
                    ...this.state,
                    selectedPath: node.filePath
                })

            }
        }
    });

    const imageView = new ImageView({
        $app,
        selectedPath: this.state.selectedPath,
    })

    this.setState = (next) => {
        this.state = next;
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes,
        })
        imageView.setState(this.state.selectedPath);
    }


    const init = async () => {
        try {
            const rootNodes = await fetchData();
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
        } catch (e) {
            throw new Error(e);
        }
    }

    init();
}


export default App;