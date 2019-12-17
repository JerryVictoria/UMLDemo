<script>
export default {
    name: "CommonComponent",
    data() {
        return {
            width: "200px",
            height: "150px"
        };
    },
    created() {
        document.body.addEventListener("click", this.hideInputAndSave);
    },
    destroyed() {
        document.body.removeEventListener("click", this.hideInputAndSave);
    },
    methods: {
        setWidth(width) {
            this.width = width;
        },
        setHeight(height) {
            this.height = height;
        },
        hideInputAndSave() {}
    }
};
</script>