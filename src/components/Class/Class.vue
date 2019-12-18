<template>
    <div class="classStyle">
        <div
            class="className"
            :style="{width: parseInt(this.width)*0.99 + 'px' , height: parseInt(this.height)*0.25 + 'px'}"
            @click.stop="handleClick"
        >
            <el-input
                v-show="showClassInput"
                size="mini"
                v-model="className"
                style="margin-top: 2px; font-size: 16px"
            ></el-input>
            <span
                v-show="!showClassInput"
                style="line-height: 30px; vertical-align: middle;"
            >{{className}}</span>
        </div>
        <div
            class="classContent"
            :style="{width: parseInt(this.width)*0.99 + 'px', height: parseInt(this.height)*0.7 + 'px'}"
        >
            <ClassContentEditor
                id="classContentEditor"
                v-show="showContentInput"
                :initData="initData"
            ></ClassContentEditor>
            <template v-for="(item, index) in variables">
                <span
                    :class="{contentSpan: true, hoverSpan: hoverItem === item}"
                    @click.stop="handleContentClick(item, 'variable', $event)"
                    :key="index + item.name"
                >
                    {{item.modifier + " " + item.dataType + " " + item.name + ";"}}
                    <br />
                </span>
            </template>
            <div class="horizontalSplitLine" v-show="variables.length > 0 && functions.length > 0"></div>
            <template v-for="(item, index) in functions">
                <span
                    :class="{contentSpan: true, hoverSpan: hoverItem === item}"
                    @click.stop="handleContentClick(item, 'function', $event)"
                    :key="index + item.name"
                >
                    {{item.modifier + " " + item.dataType + " " + item.name + "(" + item.params + ");"}}
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
    props: {
        id: String,
        type: String, // e.g. class
        styles: {
            width: Number,
            hight: Number,
            positionX: Number,
            positionY: Number
        },
        properties: {
            // 各个组件不一样，这里以类图里的类举例
            className: String,
            type: String, // e.g. abstract
            variables: Array,
            functions: Array
        }
    },
    data() {
        return {
            showClassInput: false,
            showContentInput: false,
            className: "someClass",
            classType: "", // e.g. abstract
            variables: [
                { modifier: "public", dataType: "boolean", name: "var1" },
                { modifier: "public", dataType: "char", name: "var2" }
            ], // mock data
            functions: [
                {
                    modifier: "public",
                    dataType: "int",
                    name: "func",
                    params: "int count"
                }
            ],
            initData: {
                contentType: "",
                modifier: "",
                dataType: "",
                name: "",
                params: ""
            },
            hoverItem: null
        };
    },
    methods: {
        handleClick() {
            this.showClassInput = true;
            this.showContentInput = false;
            this.hoverItem = null;
        },
        handleContentClick(item, contentType, event) {
            this.hoverItem = item;
            this.initData = item;
            this.initData.contentType = contentType;
            let classContentEditor = document.getElementById(
                "classContentEditor"
            );
            classContentEditor.style.left = event.clientX + 10 + "px";
            classContentEditor.style.top = event.clientY - 10 + "px";
            classContentEditor.style.position = "fixed";
            this.showContentInput = true;
            this.showClassInput = false;
        },
        hideInputAndSave() {
            this.hoverItem = null;
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
    font-size: 18px;
    text-align: center;
}
.classContent {
    min-width: 100px;
    min-height: 50px;
    padding-top: 2px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    line-height: 20px;
}
.contentSpan {
    display: inline-block;
    min-height: 20px;
    padding: 2px;
}
.horizontalSplitLine {
    border-bottom: 1px dashed grey;
    height: 1px;
    width: 100%;
    margin-top: 2px;
    margin-bottom: 4px;
}
.classStyle {
    background-color: #fff;
    border-radius: 1%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.hoverSpan {
    background-color: #409eff;
    border-radius: 10%;
    color: white;
}
</style>
