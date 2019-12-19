<script>
export default {
    name: "CommonComponent",
    props: {
        id: String,
        type: String
    },
    data() {
        return {
            width: "200px",
            height: "180px"
        };
    },
    methods: {
        setWidth(width) {
            this.width = width;
        },
        setHeight(height) {
            this.height = height;
        },
        hideInputAndSave() {
            this.setEditStateFalse();
        },
        setEditStateFalse() {
            this.$store.commit("setEditState", { editing: false });
            this.$store.commit("setEditId", { id: "" });
        },
        setEditStateTrue() {
            this.$store.commit("setEditState", { editing: true });
        },
        setEditingId() {
            this.$store.commit("setEditId", { id: this.id });
        },
        commitWidth() {
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "width",
                value: this.width,
                id: this.$store.state.editingId
            });
        },
        commitHeight() {
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "height",
                value: this.height,
                id: this.$store.state.editingId
            });
        }
    }
};
</script>
