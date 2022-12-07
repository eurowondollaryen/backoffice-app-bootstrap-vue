// btn-cell-renderer.js

export default {
template: `
        <span>
            <button @click="btnClickedHandler()">Click me!</button>
        </span>
    `,
methods: {
    btnClickedHandler() {
        alert(this.params.value);
        this.params.clicked(this.params.value);
    }
},
};