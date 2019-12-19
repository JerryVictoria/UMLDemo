<template>
    <div id="app">
        <div
            style="width: 100%; height: 800px; border: 1px solid red"
            @dragstart.stop="handleDragStart"
            @dragend.stop="handleDragEnd"
            @dragenter.stop="handleDragEnter"
            @dragover.stop="handleDragOver"
        >
            <template v-for="item in $store.state.UML.nodes">
                <Resizer
                    :key="item.id"
                    :id="item.id"
                    :style="{left: item.styles.left + 'px', top: item.styles.top + 'px'}"
                >
                    <component :is="item.type" v-bind="item"></component>
                </Resizer>
            </template>
        </div>
    </div>
</template>

<script>
import Class from "./components/Class/Class.vue";
import Resizer from "./components/Resizer.vue";
import $ from "jquery";
export default {
    name: "app",
    components: {
        Class,
        Resizer
    },
    data() {
        return {
            cursorToLeft: 0, //拖动的鼠标位置距离父div的距离
            cursorToTop: 0
        };
    },
    methods: {
        handleDragStart(event) {
            console.log("handleDragStart");
            event.dataTransfer.effectAllowed = "copyMove";
            let resizer = $(event.target);
            this.cursorToLeft = event.clientX - resizer.offset().left;
            this.cursorToTop = event.clientY - resizer.offset().top;
        },
        handleDragEnd(event) {
            console.log("handleDragEnd");
            //更新图数据（vue数据驱动图像变化）
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "left",
                value: event.clientX - this.cursorToLeft,
                id: this.$store.state.editingId
            });
            this.$store.commit("modifyNode", {
                nodeKey: "styles",
                key: "top",
                value: event.clientY - this.cursorToTop,
                id: this.$store.state.editingId
            });
            this.cursorToLeft = 0;
            this.cursorToTop = 0;
        },
        handleDragEnter(event) {
            console.log("handleDragEnter");
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
        },
        handleDragOver(event) {
            console.log("handleDragOver");
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
