<template>
    <div id="app">
        <ResizeBox>
            <img alt="Vue logo" src="./assets/logo.png" draggable="true" />
        </ResizeBox>
        <br />
        <Resizer>
            <component :is="'Class'"></component>
        </Resizer>
    </div>
</template>

<script>
import Class from "./components/Class/Class.vue";
import ResizeBox from "./components/index.vue";
import Resizer from "./components/Resizer.vue";
export default {
    name: "app",
    components: {
        ResizeBox,
        Class,
        Resizer
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
    margin-top: 60px;
}
</style>
