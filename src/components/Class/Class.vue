<template>
    <div>
        <div
            class="className"
            :style="{width: parseInt(this.width)*0.99 + 'px' , height: parseInt(this.height)*0.25 + 'px'}"
            @click.stop="handleClick"
        >
            <el-input v-show="showClassInput" size="mini" v-model="className"></el-input>
            <div v-show="!showClassInput">{{className}}</div>
        </div>
        <div
            class="classContent"
            :style="{width: parseInt(this.width)*0.99 + 'px', height: parseInt(this.height)*0.7 + 'px'}"
            @click.stop="handleContentClick"
        >
            <ClassContentEditor id="classContentEditor" v-show="showContentInput"></ClassContentEditor>
            <template v-for="(item, index) in variables">
                <span :key="index">
                    {{item.modifier + " " + item.dataType + " " + item.name + ";"}}
                    <br />
                </span>
            </template>
            <template v-for="(item, index) in functions">
                <span :key="index">
                    {{item.modifier + " " + item.dataType + " " + item.name + "();"}}
                    <br />
                </span>
            </template>
        </div>
    </div>
</template>
<script>
import CommonComponent from "../CommonComponent.vue";
import ClassContentEditor from "./ClassContentEditor.vue";
export default {
    name: "Class",
    extends: CommonComponent,
    components: {
        ClassContentEditor
    },
    data() {
        return {
            showClassInput: false,
            showContentInput: false,
            className: "someClass",
            type: "", // e.g. abstract
            variables: [
                { modifier: "public", dataType: "boolean", name: "var" }
            ], // mock data
            functions: [{ modifier: "public", dataType: "int", name: "func" }]
        };
    },
    methods: {
        handleClick() {
            this.showClassInput = true;
            this.showContentInput = false;
        },
        handleContentClick(event) {
            let classContentEditor = document.getElementById(
                "classContentEditor"
            );
            classContentEditor.style.left = event.clientX - 5 + "px";
            classContentEditor.style.top = event.clientY - 10 + "px";
            classContentEditor.style.position = "fixed";
            this.showContentInput = true;
            this.showClassInput = false;
        },
        hideInputAndSave() {
            this.showClassInput = false;
            this.showContentInput = false;
        }
    }
};
</script>
<style scoped>
.className {
    min-width: 100px;
    min-height: 30px;
    border: 1px solid black;
}
.classContent {
    min-width: 100px;
    min-height: 50px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}
</style>