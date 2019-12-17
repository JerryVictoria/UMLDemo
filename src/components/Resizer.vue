<template>
    <div :class="{wrapbox : showResizer}" draggable>
        <div v-if="showResizer" class="line line-t" data-type="t" @mousedown="mousedownHanlder" />
        <div v-if="showResizer" class="line line-l" data-type="l" @mousedown="mousedownHanlder" />
        <div v-if="showResizer" class="line line-r" data-type="r" @mousedown="mousedownHanlder" />
        <div v-if="showResizer" class="line line-b" data-type="b" @mousedown="mousedownHanlder" />
        <div
            v-if="showResizer"
            class="block block-tl"
            data-type="tl"
            @mousedown="mousedownHanlder"
        />
        <div
            v-if="showResizer"
            class="block block-tr"
            data-type="tr"
            @mousedown="mousedownHanlder"
        />
        <div
            v-if="showResizer"
            class="block block-bl"
            data-type="bl"
            @mousedown="mousedownHanlder"
        />
        <div
            v-if="showResizer"
            class="block block-br"
            data-type="br"
            @mousedown="mousedownHanlder"
        />
        <slot />
    </div>
</template>
<script>
export default {
    name: "Resizer",
    data() {
        return {
            showResizer: true,
            max: { height: 1000, width: 1000 },
            min: { height: 0, width: 0 },
            speed: 1
        };
    },
    created() {
        document.body.addEventListener("mouseup", this.mouseupHanlder);
    },
    destroyed() {
        document.body.removeEventListener("mouseup", this.mouseupHanlder);
    },
    methods: {
        pauseEvent(e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
            e.cancelBubble = true;
            e.returnValue = false;
            return false;
        },
        getStyle(element) {
            if (element.currentStyle) {
                return element.currentStyle;
            } else {
                return getComputedStyle(element, false);
            }
        },
        mousedownHanlder(event) {
            this.pauseEvent(event);
            let { cursor } = this.getStyle(event.target);
            this.dataType = event.target.getAttribute("data-type");
            this.event = event;
            document.body.addEventListener("mousemove", this.mousemoveHandler);
            document.body.style.cursor = cursor;
        },
        mouseupHanlder() {
            document.body.removeEventListener(
                "mousemove",
                this.mousemoveHandler
            );
            document.body.style.cursor = "default";
            console.log("up");
        },
        mousemoveHandler(event) {
            this.pauseEvent(event);
            let { width, height } = this.getStyle(this.$el);
            width = parseInt(width);
            height = parseInt(height);
            this[this.dataType]({ event, width, height });
            this.event = event;
            this.$slots.default[0].componentInstance.setWidth(
                this.$el.style.width
            );
            this.$slots.default[0].componentInstance.setHeight(
                this.$el.style.height
            );
        },
        t({ event, height }) {
            if (event.y > this.event.y) {
                this.$el.style.height = this.min.height
                    ? `${Math.max(
                          this.min.height,
                          height - (event.y - this.event.y) * this.speed
                      )}px`
                    : `${height - (event.y - this.event.y) * this.speed}px`;
            } else {
                this.$el.style.height = this.max.height
                    ? `${Math.min(
                          this.max.height,
                          height + (this.event.y - event.y) * this.speed
                      )}px`
                    : `${height + (this.event.y - event.y) * this.speed}px`;
            }
        },
        l({ event, width }) {
            if (event.x > this.event.x) {
                this.$el.style.width = this.min.width
                    ? `${Math.max(
                          this.min.width,
                          width - (event.x - this.event.x) * this.speed
                      )}px`
                    : `${width - (event.x - this.event.x) * this.speed}px`;
            } else {
                this.$el.style.width = this.max.width
                    ? `${Math.min(
                          this.max.width,
                          width + (this.event.x - event.x) * this.speed
                      )}px`
                    : `${width + (this.event.x - event.x) * this.speed}px`;
            }
        },
        r({ event, width }) {
            if (event.x > this.event.x) {
                this.$el.style.width = this.max.width
                    ? `${Math.min(
                          this.max.width,
                          width + (event.x - this.event.x) * this.speed
                      )}px`
                    : `${width + (event.x - this.event.x) * this.speed}px`;
            } else {
                this.$el.style.width = this.min.width
                    ? `${Math.max(
                          this.min.width,
                          width - (this.event.x - event.x) * this.speed
                      )}px`
                    : `${width - (this.event.x - event.x) * this.speed}px`;
            }
        },
        b({ event, height }) {
            if (event.y > this.event.y) {
                this.$el.style.height = this.max.height
                    ? `${Math.min(
                          this.max.height,
                          height + (event.y - this.event.y) * this.speed
                      )}px`
                    : `${height + (event.y - this.event.y) * this.speed}px`;
            } else {
                this.$el.style.height = this.min.height
                    ? `${Math.max(
                          this.min.height,
                          height - (this.event.y - event.y) * this.speed
                      )}px`
                    : `${height - (this.event.y - event.y) * this.speed}px`;
            }
        },
        tl({ event, width, height }) {
            this.t({ event, height });
            this.l({ event, width });
        },
        tr({ event, width, height }) {
            this.t({ event, height });
            this.r({ event, width });
        },
        bl({ event, width, height }) {
            this.b({ event, height });
            this.l({ event, width });
        },
        br({ event, width, height }) {
            this.b({ event, height });
            this.r({ event, width });
        }
    }
};
</script>
<style scoped>
.wrapbox {
    position: relative;
    display: table;
    border: 1px solid rgb(187, 187, 187);
    padding: 2px;
}
.line,
.block {
    position: absolute;
    margin: auto;
}
.line-t {
    top: -5px;
    left: 0;
    right: 0;
    width: 100%;
    height: 10px;
    cursor: s-resize;
}
.line-l {
    top: 0;
    left: -5px;
    bottom: 0;
    width: 10px;
    height: 100%;
    cursor: w-resize;
}
.line-r {
    top: 0;
    right: -5px;
    bottom: 0;
    width: 10px;
    height: 100%;
    cursor: w-resize;
}
.line-b {
    left: 0;
    right: 0;
    bottom: -5px;
    width: 100%;
    height: 10px;
    cursor: s-resize;
}
.block {
    width: 5px;
    height: 5px;
    border: 1px solid rgb(187, 187, 187);
}
.block-tl {
    top: -5px;
    left: -5px;
    cursor: se-resize;
}
.block-tr {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
}
.block-bl {
    bottom: -5px;
    left: -5px;
    cursor: ne-resize;
}
.block-br {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
}
</style>