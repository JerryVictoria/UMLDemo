import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    //store对象
    state: {
        editing: false, //是否正在处于编辑状态（禁用其他功能）
        editingId: "", //当前编辑组件（显示功能）
        UML: {
            //mock data
            UMLType: "CLASS_DIAGRAM",
            UMLId: "",
            userId: "",
            groupId: "",
            nodes: [
                {
                    id: "1", //唯一
                    type: "Class",
                    styles: {
                        width: 200,
                        height: 200,
                        left: 100,
                        top: 200
                    },
                    properties: {
                        className: "someClass1",
                        classType: "abstract", // e.g. abstract
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
                        ]
                    }
                },
                {
                    id: "2", //唯一
                    type: "Class",
                    styles: {
                        width: 200,
                        height: 200,
                        left: 500,
                        top: 200
                    },
                    properties: {
                        className: "someClass2",
                        classType: "abstract", // e.g. abstract
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
                        ]
                    }
                }
            ],
            lines: [
                {
                    id: "",
                    relationType: "",
                    fromId: "",
                    toId: "",
                    styles: {
                        color: "",
                        lineType: "", //虚线之类的
                        lineThickness: "" //固定几种
                    }
                }
            ]
        },
        histories: [] //循环队列实现
    },
    mutations: {
        //初始化图数据/多人协作同步图数据
        setUML(state, params) {},
        //增加节点数据
        addNode(state, params) {},
        //增加线条数据
        addLine(state, params) {},
        //删除节点数据
        removeNode(state, params) {},
        //删除线条数据
        removeLine(state, params) {},
        //修改节点数据
        modifyNode(state, params) {
            console.log("modifyNode", params);
            for (var i = 0, l = state.UML.nodes.length; i < l; i++) {
                if (state.UML.nodes[i].id == params.id) {
                    state.UML.nodes[i][params.nodeKey][params.key] = params.value;
                    return;
                }
            }
            //TODO历史记录
        },
        //修改线条数据
        modifyLine(state, params) {},
        //修改历史数组
        changeHistories(state, params) {},
        //后退
        backward(state) {},
        //前进
        forward(state) {},
        setEditState(state, params) {
            console.log("setEditState");
            state.editing = params.editing;
        },
        setEditId(state, params) {
            console.log("setEditId", params);
            state.editingId = params.id;
        }
    },
    actions: {}
});
