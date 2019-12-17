<template>
    <div style="display: flex; padding: 3px">
        <div class="left"></div>
        <div class="contentEditor">
            <el-select v-model="contentType" placeholder="类型" class="selectorStyle" size="mini">
                <el-option
                    v-for="item in contentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-select v-model="modifier" placeholder="修饰符" class="selectorStyle" size="mini">
                <el-option
                    v-for="item in modifierOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-select v-model="dataType" placeholder="数据类型" class="selectorStyle" size="mini">
                <el-option
                    v-for="item in dataTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-input style="width:100px; margin: 4px" size="mini" v-model="name" placeholder="名称"></el-input>
            <el-input
                style="width:100px; margin: 4px"
                v-show="contentType === 'function'"
                size="mini"
                v-model="params"
                placeholder="方法参数"
            ></el-input>
            <el-button type="success" round icon="el-icon-check" size="mini"></el-button>
            <el-button type="danger" round icon="el-icon-close" size="mini"></el-button>
        </div>
    </div>
</template>
<script>
import { contentOptions, modifierOptions, dataTypeOptions } from "../const.js";
export default {
    name: "ClassContentEditor",
    props: {
        initData: {
            type: Object
        }
    },
    data() {
        return {
            contentOptions: contentOptions,
            modifierOptions: modifierOptions,
            dataTypeOptions: dataTypeOptions,
            contentType: "",
            modifier: "",
            dataType: "",
            name: "",
            params: ""
        };
    },
    watch: {
        initData: {
            deep: true,
            handler(data) {
                this.contentType = data.contentType;
                this.modifier = data.modifier;
                this.dataType = data.dataType;
                this.name = data.name;
                this.params = data.params;
            }
        }
    }
};
</script>
<style scoped>
.selectorStyle {
    width: 80px;
    padding: 1px;
}
.left {
    width: 0px;
    height: 0px;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid #ebeef5;
    border-top: 10px solid transparent;
}
.contentEditor {
    padding: 2px;
    min-width: 455px;
    height: 35px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    border-radius: 1%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>