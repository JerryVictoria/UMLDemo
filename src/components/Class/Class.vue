<template>
    <div
        v-clickoutside="hideInputAndSave"
        @click.stop="setEditingId"
        :style="{width: this.width + 'px' , height: this.height*0.95 + 'px'}"
    >
        <div class="className" :style="{width: this.width + 'px', height: this.height*0.25 + 'px'}">
            <div>
                <el-input
                    class="contentSpan"
                    v-if="showClassInput && this.id == $store.state.editingId"
                    size="mini"
                    v-model="className"
                    style="margin-top: 2px; font-size: 16px"
                ></el-input>
                <span
                    @click="handleClick"
                    class="contentSpan"
                    v-else
                    style="line-height: 30px; vertical-align: middle;"
                >{{className}}</span>
            </div>
        </div>
        <div
            class="classContent"
            :style="{width: this.width + 'px', height: this.height*0.7 + 'px'}"
        >
            <ClassContentEditor
                :ref="'classContentEditor' + id"
                v-show="showContentInput && this.id == $store.state.editingId"
                :initData="initData"
            ></ClassContentEditor>
            <template v-for="(item, index) in variables">
                <span
                    :class="{'contentSpan alignLeft': true, hoverSpan: hoverItem === item && id == $store.state.editingId}"
                    @click="handleContentClick(item, 'variable', $event)"
                    :key="index + item.name"
                >
                    {{item.modifier + " " + item.dataType + " " + item.name + ";"}}
                    <br />
                </span>
            </template>
            <div class="horizontalSplitLine" v-show="variables.length > 0 && functions.length > 0"></div>
            <template v-for="(item, index) in functions">
                <span
                    :class="{'contentSpan alignLeft': true, hoverSpan: hoverItem === item && id == $store.state.editingId}"
                    @click="handleContentClick(item, 'function', $event)"
                    :key="index + item.name"
                >
                    {{item.modifier + " " + item.dataType + " " + item.name + "(" + item.params + ");"}}
                    <br />
                </span>
            </template>
            <div class="horizontalSplitLine" v-show="variables.length > 0 || functions.length > 0"></div>
            <el-button
                class="contentSpan hoverSpan"
                @click.stop="handleContentClick({}, '', $event)"
            >+</el-button>
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
        styles: Object,
        properties: Object
    },
    data() {
        return {
            showClassInput: false,
            showContentInput: false,
            className: "",
            classType: "", // e.g. abstract
            variables: [], // mock data
            functions: [],
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
    watch: {
        styles: {
            deep: true,
            handler(sty) {
                this.width = sty.width;
                this.height = sty.height;
            }
        },
        properties: {
            deep: true,
            handler(prop) {
                this.className = prop.className;
                this.classType = prop.classType;
                this.variables = prop.variables;
                this.functions = prop.functions;
            }
        },
        className(cn) {
            this.$store.commit("modifyNode", {
                nodeKey: "properties",
                key: "className",
                value: cn,
                id: this.id
            });
        }
    },
    mounted() {
        if (this.styles) {
            this.width = this.styles.width ? this.styles.width : this.width;
            this.height = this.styles.height ? this.styles.height : this.height;
        }
        if (this.properties) {
            this.className = this.properties.className;
            this.classType = this.properties.classType;
            this.variables = this.properties.variables;
            this.functions = this.properties.functions;
        }
    },
    methods: {
        handleClick() {
            this.showClassInput = true;
            this.showContentInput = false;
            this.hoverItem = null;
            this.setEditStateTrue();
        },
        handleContentClick(item, contentType, event) {
            this.hoverItem = item;
            this.initData = item;
            this.initData.contentType = contentType;
            let classContentEditor = this.$refs["classContentEditor" + this.id]
                .$el;
            classContentEditor.style.left = event.clientX + "px";
            classContentEditor.style.top = event.clientY + "px";
            classContentEditor.style.position = "fixed";
            this.showContentInput = true;
            this.showClassInput = false;
            this.setEditStateTrue();
        },
        hideInputAndSave() {
            if (!this.showClassInput && !this.showContentInput) {
                return;
            }
            this.setEditStateFalse();
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
    width: 80%;
    cursor: pointer;
}
.alignLeft {
    text-align: left;
}
.horizontalSplitLine {
    border-bottom: 1px dashed grey;
    height: 1px;
    width: 100%;
    margin-top: 2px;
    margin-bottom: 4px;
}
.hoverSpan {
    background-color: #a6c0db;
    color: white;
}
</style>
