<template>
    <div ref="mainContainer" class="flex flex-row mt-4 h-[488px] md:h-[600px] relative">
        <button @click="toggleFullscreen" class="absolute z-30 bottom-1 right-2 text-black p-2 rounded hidden md:block">
            <IconFullscreen v-if="isFullscreen" />
            <IconExitFullscreen v-else />
        </button>
        <div class="absolute z-20 bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <button v-for="(canvas, index) in canvases" :key="canvas.id" @click="scrollToCanvas(index)"
                class="bg-violet-900 dark:bg-slate-900 px-4 py-2 rounded text-slate-200 hover:bg-violet-950 dark:hover:bg-slate-700">
                {{ index + 1 }}
            </button>
        </div>
        <!-- Toggle Menu Button -->
        <button @click="toggleMenu"
            class="md:hidden bg-violet-900 dark:bg-sky-500 p-2 h-10 w-10 flex items-center justify-center hover:bg-violet-950 dark:hover:bg-sky-600 absolute top-0 right-10 z-50 md:rounded-b">
            <IconMenu />
        </button>
        <!-- Toolbar -->
        <div :class="{ 'hidden': !menuOpen, 'flex': menuOpen }" ref="draggableContainer" id="draggable-container"
            class="absolute z-10 flex-col space-y-1 px-2 pt-6 bg-violet-900 dark:bg-slate-800 pb-2 rounded items-center justify-center text-white text-[8px] md:flex">
            <div class="absolute top-0 left-0 h-6 bg-violet-950 dark:bg-slate-900 w-full rounded-t flex flex-row items-center justify-between px-3 cursor-move"
                id="draggable-header" @mousedown="dragMouseDown">
                <IconDrag />
                <IconDrag />
            </div>
            <!-- Pen - Pen Eraser -->
            <div class="flex flex-row space-x-1">
                <button @click="selectShape('freehand')"
                    class="flex flex-col items-center justify-center rounded h-10 w-10 hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconPen />
                    <span>Kalem</span>
                </button>
                <button @click="selectShape('eraser-brush')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconEraserBrush />
                    <span class="text-nowrap">K. Silgisi</span>
                </button>
            </div>
            <!-- Text - Eraser -->
            <div class="flex flex-row space-x-1">
                <button @click="selectShape('text')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconText />
                    <span>Metin</span>
                </button>
                <button @click="enableEraserMode()"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconEraser />
                    <span>Silgi</span>
                </button>
            </div>
            <!-- Rect. - Rect. Stroke -->
            <div class="flex flex-row space-x-1">
                <button @click="selectShape('rectangle')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconRect />
                    <span>Dikdörtg.</span>
                </button>
                <button @click="selectShape('rectangle-stroke')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconRectStroke />
                    <span class="text-nowrap">Ç. Dikd.</span>
                </button>
            </div>
            <!-- Circle - Circle Stroke -->
            <div class="flex flex-row space-x-1">
                <button @click="selectShape('circle')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconCircle />
                    <span>Daire</span>
                </button>
                <button @click="selectShape('circle-stroke')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconCircleStroke />
                    <span>Çember</span>
                </button>
            </div>
            <!-- Triangle - Triangle Stroke -->
            <div class="flex flex-row space-x-1">
                <button @click="selectShape('triangle')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconTriangle />
                    <span>Üçgen</span>
                </button>
                <button @click="selectShape('triangle-stroke')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconTriangleStroke />
                    <span class="text-nowrap">Ç. Üçgen</span>
                </button>
            </div>
            <!-- Line - Move -->
            <div class="flex flex-row space-x-1">
                <button @click="selectShape('line')"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconLine />
                    <span>Çizgi</span>
                </button>
                <button @click="enableMoveMode()"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconMove />
                    <span>Taşı</span>
                </button>
            </div>
            <!-- Clear - Add -->
            <div class="flex flex-row space-x-1">
                <button @click="clearCanvas()"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconClear />
                    <span>Temizle</span>
                </button>
                <button @click="addCanvas()"
                    class="rounded h-10 w-10 flex items-center flex-col justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconAddCanvas />
                    <span>Ekle</span>
                </button>
            </div>
            <!-- Color Inputs -->
            <div class="flex flex-row space-x-1 items-center">
                <div class="flex flex-col items-center relative">
                    <input type="color" id="fillColor" v-model="fillColor"
                        class="w-10 h-10 rounded text-black p-0.5 bg-violet-900 dark:bg-slate-800 cursor-pointer">
                    <label for="fillColor" class="text-white text-[8px] absolute top-3 cursor-pointer">Dolgu</label>
                </div>
                <div class="flex flex-col items-center relative">
                    <input type="color" id="strokeColor" v-model="strokeColor"
                        class="w-10 h-10 rounded text-black p-0.5 bg-violet-900 dark:bg-slate-800 cursor-pointer">
                    <label for="strokeColor" class="text-white text-[8px] absolute top-3 cursor-pointer">Çizgi</label>
                </div>
            </div>
            <!-- Brush Size Input -->
            <div class="flex flex-col items-center rounded text-[10px]">
                <label for="freehandWidth" class="text-white text-[8px]">Kalınlık</label>
                <input type="range" min="1" max="20" v-model="freehandWidth"
                    class="rounded text-black w-20 accent-blue-600 mb-2 cursor-pointer">
            </div>
            <!-- Undo - Redo -->
            <div class="flex flex-row space-x-1">
                <button @click="undo()"
                    class="rounded h-10 w-10 flex flex-col items-center justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconUndo />
                    <span class="text-nowrap">Geri al</span>
                </button>
                <button @click="redo()"
                    class="rounded h-10 w-10 flex flex-col items-center justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconRedo />
                    <span class="text-nowrap">İleri al</span>
                </button>
            </div>
            <!-- Video Record -->
            <div class="flex flex-col space-y-2 text-[12px]">
                <button @click="toggleRecording" :class="{ ' text-white': !isRecording, '': isRecording }"
                    class="py-4 px-2 rounded h-10 w-20 flex items-center flex-row justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <div class="flex flex-col">
                        <div class="flex flex-row items-center justify-center w-full">
                            <IconRecord v-if="!isRecording" />
                            <IconStop v-else />
                            <span v-if="!isRecording">Kayıt</span>
                            <span v-else class="text-nowrap">Durdur</span>
                        </div>
                        <span v-if="isRecording" class="text-[10px]">{{ formattedTime }}</span>
                    </div>
                </button>
                <button v-if="isRecording" @click="pauseRecording"
                    class="py-4 px-2 rounded h-10 w-20 flex items-center flex-row justify-center hover:bg-violet-950 dark:hover:bg-slate-700">
                    <IconPause v-if="isPaused" />
                    <IconPlay v-else />
                    <span v-if="isPaused">Devam et</span>
                    <span v-else class="text-nowrap">Duraklat</span>
                </button>
            </div>
        </div>
        <div class="canvas-container flex flex-1 overflow-hidden h-full" ref="canvasContainer">
            <div v-for="(canvas, index) in canvases" :key="canvas.id" class="relative flex-none w-full h-full">
                <button v-if="index !== 0" @click="removeCanvas(index)"
                    class="group icon-container absolute top-0 right-0 text-black z-10 p-1 rounded-bl md:h-auto md:w-auto w-10 h-10 flex items-center justify-center">
                    <IconRemoveCanvas />
                </button>
                <canvas :id="canvas.id" class="border border-black w-full h-full"></canvas>
            </div>
        </div>
    </div>
    <BottomToolbar />
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import BottomToolbar from '@/components/BottomToolbar.vue';
import { fabric } from 'fabric';
import { eventBus } from '@/eventBus';
import IconFullscreen from './IconFullscreen.vue';
import IconExitFullscreen from './IconExitFullscreen.vue';
import IconMenu from './IconMenu.vue';
import IconDrag from './IconDrag.vue';
import IconPen from './IconPen.vue';
import IconRemoveCanvas from './IconRemoveCanvas.vue';
import IconAddCanvas from './IconAddCanvas.vue';
import IconText from './IconText.vue';
import IconEraser from './IconEraser.vue';
import IconRect from './IconRect.vue';
import IconRectStroke from './IconRectStroke.vue';
import IconCircle from './IconCircle.vue';
import IconCircleStroke from './IconCircleStroke.vue';
import IconTriangle from './IconTriangle.vue';
import IconTriangleStroke from './IconTriangleStroke.vue';
import IconLine from './IconLine.vue';
import IconUndo from './IconUndo.vue';
import IconRedo from './IconRedo.vue';
import IconRecord from './IconRecord.vue';
import IconStop from './IconStop.vue';
import IconPause from './IconPause.vue';
import IconPlay from './IconPlay.vue';
import IconClear from './IconClear.vue';
import IconMove from './IconMove.vue';
import IconEraserBrush from './IconEraserBrush.vue';

const route = useRoute();
const store = useStore();

const MAX_CANVASES = 5;
const DEFAULT_BACKGROUND_IMAGE_URL = store.state.backgroundImageUrl;

const backgroundImageUrl = computed(() => {
    const id = route.params.id;
    const questionData = store.state.questionData;
    if (questionData && questionData.connected_questions) {
        const question = questionData.connected_questions.find(q => q.id === id);
        return question ? question.url : store.state.backgroundImageUrl;
    }
    return store.state.backgroundImageUrl;
});

watch(backgroundImageUrl, (newUrl) => {
    if (newUrl) {
        const canvas = getCurrentCanvas();
        if (canvas) {
            setCanvasBackground(canvas, newUrl);
        }
    }
});

const router = useRouter();
const mainContainer = ref(null);
const canvases = reactive([{ id: 'fabricCanvas0' }]);
const activeCanvasIndex = ref(0);
const canvasContainer = ref(null);
const canvasRefs = ref([]);
const selectedShape = ref(null);
const isDrawing = ref(false);
const isFreehandDrawing = ref(false);
const startPoint = ref({ x: 0, y: 0 });
const currentShape = ref(null);
const eraserCircle = ref(null);
const isFullscreen = ref(false);
const undoStack = ref([]);
const redoStack = ref([]);
const menuOpen = ref(false);
const freehandWidth = ref(1);
const fillColor = ref('#000000');
const strokeColor = ref('#000000');
const isRecording = ref(false);
const isPaused = ref(false);
const recordingDuration = 10 * 60;
let recordingTimeout = null;

const positions = ref({
    clientX: 0,
    clientY: 0,
    offsetX: 0,
    offsetY: 0
});

const draggableContainer = ref(null);

const updateToolbarPosition = () => {
    const mainRect = mainContainer.value.getBoundingClientRect();
    const draggableRect = draggableContainer.value.getBoundingClientRect();
    draggableContainer.value.style.left = (mainRect.width - draggableRect.width) + 'px';
    draggableContainer.value.style.top = '0px';
};

const dragMouseDown = (event) => {
    event.preventDefault();
    positions.value.clientX = event.clientX;
    positions.value.clientY = event.clientY;
    positions.value.offsetX = draggableContainer.value.offsetLeft;
    positions.value.offsetY = draggableContainer.value.offsetTop;
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
}

const elementDrag = (event) => {
    event.preventDefault();
    const deltaX = event.clientX - positions.value.clientX;
    const deltaY = event.clientY - positions.value.clientY;
    const newLeft = positions.value.offsetX + deltaX;
    const newTop = positions.value.offsetY + deltaY;

    const mainRect = mainContainer.value.getBoundingClientRect();
    const draggableRect = draggableContainer.value.getBoundingClientRect();

    if (newLeft < 0) {
        draggableContainer.value.style.left = '0px';
    } else if (newLeft + draggableRect.width > mainRect.width) {
        draggableContainer.value.style.left = mainRect.width - draggableRect.width + 'px';
    } else {
        draggableContainer.value.style.left = newLeft + 'px';
    }

    if (newTop < 0) {
        draggableContainer.value.style.top = '0px';
    } else if (newTop + draggableRect.height > mainRect.height) {
        draggableContainer.value.style.top = mainRect.height - draggableRect.height + 'px';
    } else {
        draggableContainer.value.style.top = newTop + 'px';
    }
}

const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
}

const freehandWidthInt = computed({
    get() {
        return parseInt(freehandWidth.value);
    },
    set(value) {
        freehandWidth.value = value;
    }
});

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
};

const captureAndOpenCanvas = async () => {
    const canvas = getCurrentCanvas();
    if (canvas) {
        const dataURL = canvas.toDataURL();
        eventBus.value.base64Image = dataURL;
    }
};

function renderIcon(iconSvg) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        var img = new Image();
        var svgBlob = new Blob([iconSvg], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(svgBlob);
        img.onload = function () {
            ctx.save();
            ctx.translate(left, top);
            ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
            ctx.drawImage(img, -size / 2, -size / 2, size, size);
            ctx.restore();
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };
}

function deleteObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
}

function cloneObject(eventData, transform) {
    var target = transform.target;
    var canvas = target.canvas;
    target.clone(function (cloned) {
        cloned.left += 10;
        cloned.top += 10;
        canvas.add(cloned);
    });
}

function addCustomControls() {
    const deleteIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.47625 2 2 6.4775 2 12C2 17.5225 6.47625 22 12 22C17.5238 22 22 17.5225 22 12C22 6.4775 17.5238 2 12 2ZM16.6337 14.8663C16.8681 15.1006 16.9998 15.4185 16.9998 15.75C16.9998 16.0815 16.8681 16.3994 16.6337 16.6337C16.3994 16.8681 16.0815 16.9998 15.75 16.9998C15.4185 16.9998 15.1006 16.8681 14.8663 16.6337L12 13.7675L9.13375 16.6337C9.01793 16.7502 8.88023 16.8427 8.72857 16.9057C8.5769 16.9688 8.41426 17.0013 8.25 17.0013C8.08574 17.0013 7.9231 16.9688 7.77143 16.9057C7.61977 16.8427 7.48207 16.7502 7.36625 16.6337C7.25007 16.5178 7.1579 16.38 7.09501 16.2284C7.03212 16.0767 6.99975 15.9142 6.99975 15.75C6.99975 15.5858 7.03212 15.4233 7.09501 15.2716C7.1579 15.12 7.25007 14.9822 7.36625 14.8663L10.2325 12L7.36625 9.13375C7.13187 8.89936 7.00019 8.58147 7.00019 8.25C7.00019 7.91853 7.13187 7.60064 7.36625 7.36625C7.60064 7.13187 7.91853 7.00019 8.25 7.00019C8.58147 7.00019 8.89936 7.13187 9.13375 7.36625L12 10.2325L14.8663 7.36625C15.1006 7.13187 15.4185 7.00019 15.75 7.00019C16.0815 7.00019 16.3994 7.13187 16.6337 7.36625C16.8681 7.60064 16.9998 7.91853 16.9998 8.25C16.9998 8.58147 16.8681 8.89936 16.6337 9.13375L13.7675 12L16.6337 14.8663Z" fill="#EF4444"/>
    </svg>`;

    const cloneIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.125 5.25H8.625C7.72989 5.25 6.87145 5.60558 6.23851 6.23851C5.60558 6.87145 5.25 7.72989 5.25 8.625V19.125C5.25 20.0201 5.60558 20.8785 6.23851 21.5115C6.87145 22.1444 7.72989 22.5 8.625 22.5H19.125C20.0201 22.5 20.8785 22.1444 21.5115 21.5115C22.1444 20.8785 22.5 20.0201 22.5 19.125V8.625C22.5 7.72989 22.1444 6.87145 21.5115 6.23851C20.8785 5.60558 20.0201 5.25 19.125 5.25ZM17.6039 14.625H14.625V17.6039C14.625 18.0075 14.3147 18.3539 13.9111 18.3741C13.8097 18.3789 13.7083 18.3632 13.6132 18.3278C13.5181 18.2923 13.4311 18.2379 13.3576 18.1679C13.2841 18.0979 13.2256 18.0136 13.1856 17.9203C13.1456 17.827 13.125 17.7265 13.125 17.625V14.625H10.1461C9.7425 14.625 9.39609 14.3147 9.37594 13.9111C9.37105 13.8097 9.38681 13.7083 9.42224 13.6132C9.45768 13.5181 9.51207 13.4311 9.5821 13.3576C9.65214 13.2841 9.73637 13.2256 9.82969 13.1856C9.92301 13.1456 10.0235 13.125 10.125 13.125H13.125V10.1461C13.125 9.7425 13.4353 9.39609 13.8389 9.37594C13.9403 9.37105 14.0417 9.38681 14.1368 9.42224C14.2319 9.45768 14.3189 9.51207 14.3924 9.5821C14.4659 9.65214 14.5244 9.73637 14.5644 9.82969C14.6044 9.92301 14.625 10.0235 14.625 10.125V13.125H17.625C17.7266 13.1249 17.8272 13.1454 17.9206 13.1853C18.014 13.2253 18.0984 13.2838 18.1685 13.3573C18.2386 13.4308 18.2931 13.5178 18.3286 13.613C18.3641 13.7082 18.3799 13.8096 18.375 13.9111C18.3553 14.3147 18.0075 14.625 17.6039 14.625Z" fill="#3B82F6"/>
        <path d="M18.5569 3.75C18.3235 3.09246 17.8924 2.52322 17.3228 2.12038C16.7531 1.71755 16.0727 1.50084 15.375 1.5H4.875C3.97989 1.5 3.12145 1.85558 2.48851 2.48851C1.85558 3.12145 1.5 3.97989 1.5 4.875V15.375C1.5 16.0727 1.71755 16.7531 2.12038 17.3228C2.52322 17.8924 3.09246 18.3235 3.75 18.5569V7.5C3.75 6.50544 4.14509 5.55161 4.84835 4.84835C5.55161 4.14509 6.50544 3.75 7.5 3.75H18.5569Z" fill="#818CF8"/>
    </svg>`;

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: 16,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon(deleteIconSvg),
        cornerSize: 24
    });

    fabric.Object.prototype.controls.cloneControl = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: -16,
        cursorStyle: 'pointer',
        mouseUpHandler: cloneObject,
        render: renderIcon(cloneIconSvg),
        cornerSize: 24
    });
}

function setCanvasBackground(canvas, backgroundImageUrl) {
    fabric.Image.fromURL(backgroundImageUrl, (img) => {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const targetWidth = canvasWidth * .7;
        const targetHeight = canvasHeight * .9;
        const widthScaleFactor = targetWidth / img.width;
        const heightScaleFactor = targetHeight / img.height;
        const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);
        img.scale(scaleFactor);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top',
            left: 14,
            top: 20,
            erasable: false,
            crossOrigin: 'anonymous',
        });
        canvas.renderAll();
    }, { crossOrigin: 'anonymous' });
}

onMounted(() => {
    const mainRect = mainContainer.value.getBoundingClientRect();
    const draggableRect = draggableContainer.value.getBoundingClientRect();
    draggableContainer.value.style.left = (mainRect.width - draggableRect.width) + 'px';
    draggableContainer.value.style.top = '0px';
    addCustomControls();
    initCanvas(canvases[0].id, DEFAULT_BACKGROUND_IMAGE_URL);
    window.addEventListener('resize', updateCanvasSize);
    window.addEventListener('keydown', handleKeyDown);
    updateCanvasSize();
    enableMoveMode();

    if (!eventBus.value.captureAndOpenCanvas) {
        eventBus.value.captureAndOpenCanvas = captureAndOpenCanvas;
    }

    updateToolbarPosition();
    window.addEventListener('resize', updateToolbarPosition);
    document.addEventListener('fullscreenchange', updateToolbarPosition);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCanvasSize);
    window.removeEventListener('keydown', handleKeyDown);

    if (eventBus.value.captureAndOpenCanvas) {
        delete eventBus.value.captureAndOpenCanvas;
    }
    window.removeEventListener('resize', updateToolbarPosition);
    document.removeEventListener('fullscreenchange', updateToolbarPosition);
});

const handleKeyDown = (event) => {
    if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z' || event.key === 'Z') {
            event.preventDefault();
            undo();
        } else if (event.key === 'y' || event.key === 'Y') {
            event.preventDefault();
            redo();
        } else if (event.key === '' || event.key === '') {
            event.preventDefault();
            const canvas = getCurrentCanvas();
            if (canvas) {
                canvas.getActiveObject().clone(function (cloned) {
                    cloned.left += 10;
                    cloned.top += 10;
                    canvas.add(cloned);
                });
            }
        } else if (event.key === 'r' || event.key === 'R') {
            event.preventDefault();
            const canvas = getCurrentCanvas();
            if (canvas) {
                clearCanvas();
            }
        }
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
        const canvas = getCurrentCanvas();
        if (canvas) {
            const activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
                saveState();
            }
        }
    } else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        toggleFullscreen();
    } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        const canvas = getCurrentCanvas();
        if (canvas) {
            clearCanvas();
        }
    }
};

const addCanvas = async () => {
    if (canvases.length >= MAX_CANVASES) {
        alert('Maximum number of canvases reached.');
        return;
    }

    const newId = `fabricCanvas${canvases.length}`;
    canvases.push({ id: newId });

    await nextTick();

    initCanvas(newId, DEFAULT_BACKGROUND_IMAGE_URL);

    activeCanvasIndex.value = canvases.length - 1;
    scrollToCanvas(activeCanvasIndex.value);
};

const initCanvas = (canvasId, backgroundImageUrl) => {
    const newCanvas = new fabric.Canvas(canvasId, {
        backgroundColor: 'white',
    });

    newCanvas.on('mouse:down', handleMouseDown);
    newCanvas.on('mouse:move', handleMouseMove);
    newCanvas.on('mouse:up', handleMouseUp);
    newCanvas.on('mouse:dblclick', handleDoubleClick);

    canvasRefs.value.push(newCanvas);
    addCustomControls(newCanvas);
    updateCanvasSize();

    setCanvasBackground(newCanvas, backgroundImageUrl);
};

const getCurrentCanvas = () => canvasRefs.value[activeCanvasIndex.value];

const clearCanvas = () => {
    const canvas = getCurrentCanvas();
    if (canvas) {
        canvas.clear();
        canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
        setCanvasBackground(canvas, DEFAULT_BACKGROUND_IMAGE_URL);
        saveState();
    }
};

const removeCanvas = (index) => {
    if (index !== 0) {
        canvases.splice(index, 1);
        canvasRefs.value.splice(index, 1);
        if (activeCanvasIndex.value >= canvases.length) {
            activeCanvasIndex.value = canvases.length - 1;
        }
        nextTick(() => {
            scrollToCanvas(activeCanvasIndex.value);
        });
    }
};

const scrollToCanvas = (index) => {
    const canvasWrapper = canvasContainer.value;
    const canvasElement = document.getElementById(canvases[index].id);
    if (canvasWrapper && canvasElement) {
        const canvasWrapperRect = canvasWrapper.getBoundingClientRect();
        const canvasElementRect = canvasElement.getBoundingClientRect();
        const offset = canvasElementRect.left - canvasWrapperRect.left - (canvasWrapperRect.width - canvasElementRect.width) / 2;
        canvasWrapper.scrollBy({ left: offset, behavior: 'smooth' });
        activeCanvasIndex.value = index;
    }
};

const selectShape = (shape) => {
    const canvas = getCurrentCanvas();
    selectedShape.value = shape;
    canvas.isDrawingMode = false;
    isFreehandDrawing.value = false;
    disableEraserMode();
    switch (shape) {
        case 'freehand':
            resetFreeDrawingBrush(canvas);
            canvas.isDrawingMode = true;
            isFreehandDrawing.value = true;
            if (!canvas.freeDrawingBrush || !(canvas.freeDrawingBrush instanceof fabric.PencilBrush)) {
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
            }
            canvas.freeDrawingBrush.width = freehandWidthInt.value;
            canvas.freeDrawingBrush.color = strokeColor.value;
            canvas.selection = false;
            createEraserCircle();
            break;
        case 'eraser-brush':
            enableEraserBrushMode();
            break;
        case 'text':
            addTextToCanvas();
            break;
        default:
            disableEraserBrushMode();
            canvas.selection = true;
            break;
    }
};

const enableMoveMode = () => {
    const canvas = getCurrentCanvas();
    if (canvas) {
        selectedShape.value = null;
        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.forEachObject((obj) => {
            obj.selectable = true;
            obj.evented = true;
        });
    }
};

const enableEraserBrushMode = () => {
    const canvas = getCurrentCanvas();
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = freehandWidthInt.value;
    canvas.selection = false;
    createEraserCircle();
    canvas.on('mouse:move', showEraserCursor);
};

const disableEraserBrushMode = () => {
    const canvas = getCurrentCanvas();
    if (canvas.freeDrawingBrush && canvas.freeDrawingBrush instanceof fabric.EraserBrush) {
        canvas.isDrawingMode = false;
        canvas.freeDrawingBrush = null;
    }
    resetFreeDrawingBrush(canvas);
    removeEraserCircle();
    canvas.off('mouse:move', showEraserCursor);
};

const resetFreeDrawingBrush = (canvas) => {
    canvas.freeDrawingBrush = null;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = freehandWidthInt.value;
    canvas.freeDrawingBrush.color = strokeColor.value;
};

const handleMouseDown = (event) => {
    if (!selectedShape.value) return;

    isDrawing.value = true;
    const canvas = getCurrentCanvas();
    const pointer = canvas.getPointer(event.e);
    startPoint.value = { x: pointer.x, y: pointer.y };
    canvas.selection = false;

    switch (selectedShape.value) {
        case 'rectangle':
            currentShape.value = new fabric.Rect({
                left: pointer.x,
                top: pointer.y,
                fill: fillColor.value,
                width: 1,
                height: 1,
                selectable: false,
            });
            break;
        case 'rectangle-stroke':
            currentShape.value = new fabric.Rect({
                left: pointer.x,
                top: pointer.y,
                stroke: strokeColor.value,
                strokeWidth: 2,
                fill: 'transparent',
                width: 1,
                height: 1,
                selectable: false,
            });
            break;
        case 'circle':
            currentShape.value = new fabric.Circle({
                left: pointer.x,
                top: pointer.y,
                fill: fillColor.value,
                radius: 1,
                selectable: false,
            });
            break;
        case 'circle-stroke':
            currentShape.value = new fabric.Circle({
                left: pointer.x,
                top: pointer.y,
                stroke: strokeColor.value,
                strokeWidth: 2,
                fill: 'transparent',
                radius: 1,
                selectable: false,
            });
            break;
        case 'triangle':
            currentShape.value = new fabric.Triangle({
                left: pointer.x,
                top: pointer.y,
                fill: fillColor.value,
                width: 1,
                height: 1,
                selectable: false,
            });
            break;
        case 'triangle-stroke':
            currentShape.value = new fabric.Triangle({
                left: pointer.x,
                top: pointer.y,
                stroke: strokeColor.value,
                strokeWidth: 2,
                fill: 'transparent',
                width: 1,
                height: 1,
                selectable: false,
            });
            break;
        case 'line':
            currentShape.value = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
                stroke: strokeColor.value,
                strokeWidth: 2,
                selectable: false,
                originX: 'center',
                originY: 'center'
            });
            break;
        default:
            currentShape.value = null;
            break;
    }

    if (currentShape.value) {
        canvas.add(currentShape.value);
        canvas.setActiveObject(currentShape.value);
        saveState();
    }
};

const handleMouseMove = (event) => {
    if (!isDrawing.value && !eraserCircle.value) return;

    const canvas = getCurrentCanvas();
    const pointer = canvas.getPointer(event.e);

    if (isDrawing.value && currentShape.value) {
        switch (selectedShape.value) {
            case 'freehand':
                break;
            case 'rectangle': {
                const width = pointer.x - startPoint.value.x;
                const height = pointer.y - startPoint.value.y;
                currentShape.value.set({
                    width: Math.abs(width),
                    height: Math.abs(height),
                    left: width < 0 ? pointer.x : startPoint.value.x,
                    top: height < 0 ? pointer.y : startPoint.value.y,
                });
                break;
            }
            case 'rectangle-stroke': {
                const width = pointer.x - startPoint.value.x;
                const height = pointer.y - startPoint.value.y;
                currentShape.value.set({
                    width: Math.abs(width),
                    height: Math.abs(height),
                    left: width < 0 ? pointer.x : startPoint.value.x,
                    top: height < 0 ? pointer.y : startPoint.value.y,
                });
                break;
            }
            case 'circle': {
                const radius = Math.sqrt(Math.pow(pointer.x - startPoint.value.x, 2) + Math.pow(pointer.y - startPoint.value.y, 2)) / 2;
                currentShape.value.set({
                    radius: Math.abs(radius),
                    left: startPoint.value.x - radius,
                    top: startPoint.value.y - radius,
                });
                break;
            }
            case 'circle-stroke': {
                const radius = Math.sqrt(Math.pow(pointer.x - startPoint.value.x, 2) + Math.pow(pointer.y - startPoint.value.y, 2)) / 2;
                currentShape.value.set({
                    radius: Math.abs(radius),
                    left: startPoint.value.x - radius,
                    top: startPoint.value.y - radius,
                });
                break;
            }
            case 'triangle': {
                const triWidth = pointer.x - startPoint.value.x;
                const triHeight = pointer.y - startPoint.value.y;
                currentShape.value.set({
                    width: Math.abs(triWidth),
                    height: Math.abs(triHeight),
                    left: triWidth < 0 ? pointer.x : startPoint.value.x,
                    top: triHeight < 0 ? pointer.y : startPoint.value.y,
                });
                break;
            }
            case 'triangle-stroke': {
                const triWidth = pointer.x - startPoint.value.x;
                const triHeight = pointer.y - startPoint.value.y;
                currentShape.value.set({
                    width: Math.abs(triWidth),
                    height: Math.abs(triHeight),
                    left: triWidth < 0 ? pointer.x : startPoint.value.x,
                    top: triHeight < 0 ? pointer.y : startPoint.value.y,
                });
                break;
            }
            case 'line':
                currentShape.value.set({
                    x2: pointer.x,
                    y2: pointer.y,
                });
                break;
            default:
                break;
        }
        canvas.renderAll();
    }

    if (eraserCircle.value) {
        updateEraserCircle(pointer);
    }

    canvas.renderAll();
};

const handleMouseUp = () => {
    if (isDrawing.value || isFreehandDrawing.value) {
        isDrawing.value = false;
        if (isFreehandDrawing.value) {
            isFreehandDrawing.value = false;
        }
        if (currentShape.value) {
            currentShape.value.set({ selectable: true });
            currentShape.value = null;
        }
        const canvas = getCurrentCanvas();
        canvas.selection = true;
        saveState();
        if (selectedShape.value !== 'freehand' && selectedShape.value !== 'eraser-brush') {
            enableMoveMode();
        }
    }
};

const saveState = () => {
    const canvas = getCurrentCanvas();
    if (canvas) {
        const state = JSON.stringify(canvas);
        undoStack.value.push(state);
        redoStack.value = [];
    }
};

const undo = () => {
    const canvas = getCurrentCanvas();
    if (canvas && undoStack.value.length > 0) {
        const state = undoStack.value.pop();
        redoStack.value.push(JSON.stringify(canvas));
        canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
    }
};

const redo = () => {
    const canvas = getCurrentCanvas();
    if (canvas && redoStack.value.length > 0) {
        const state = redoStack.value.pop();
        undoStack.value.push(JSON.stringify(canvas));
        canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
    }
};

const updateCanvasSize = () => {
    canvasRefs.value.forEach(canvas => {
        if (canvas && canvasContainer.value) {
            const container = canvasContainer.value;
            canvas.setWidth(container.clientWidth);
            canvas.setHeight(container.clientHeight);
            canvas.renderAll();
            setCanvasBackground(canvas, DEFAULT_BACKGROUND_IMAGE_URL);

        } else {
            console.error("canvasContainer is null or canvas is null");
        }
    });
};

watch(freehandWidth, (newWidth) => {
    newWidth = parseInt(newWidth);
    const canvas = getCurrentCanvas();
    if (canvas && canvas.isDrawingMode && canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = newWidth;
    }
    updateEraserCircle();
});

const enableEraserMode = () => {
    const canvas = getCurrentCanvas();
    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.on('mouse:down', startErasing);
    canvas.on('mouse:move', erase);
    canvas.on('mouse:up', stopErasing);
    canvas.on('mouse:move', showEraserCursor);
    createEraserCircle();
};

const disableEraserMode = () => {
    const canvas = getCurrentCanvas();
    canvas.selection = true;
    canvas.off('mouse:down', startErasing);
    canvas.off('mouse:move', erase);
    canvas.off('mouse:up', stopErasing);
    canvas.off('mouse:move', showEraserCursor);
    removeEraserCircle();
};

const startErasing = (event) => {
    isDrawing.value = true;
    erase(event);
};

const erase = (event) => {
    if (!isDrawing.value) return;

    const canvas = getCurrentCanvas();
    const pointer = canvas.getPointer(event.e);
    const eraserSize = freehandWidthInt.value;

    const objectsToRemove = [];
    const objects = canvas.getObjects();
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].erasable !== false && isPointInEraseArea(pointer, objects[i], eraserSize)) {
            objectsToRemove.push(objects[i]);
        }
    }

    if (objectsToRemove.length > 0) {
        canvas.remove(...objectsToRemove);
    }

    updateEraserCircle(pointer);

    canvas.renderAll();
};

const stopErasing = () => {
    isDrawing.value = false;
    saveState();
};

const isPointInEraseArea = (point, obj, size) => {
    const boundingRect = obj.getBoundingRect();
    return (
        point.x >= boundingRect.left - size &&
        point.x <= boundingRect.left + boundingRect.width + size &&
        point.y >= boundingRect.top - size &&
        point.y <= boundingRect.top + boundingRect.height + size
    );
};

const createEraserCircle = (pointer = null) => {
    const canvas = getCurrentCanvas();
    if (!eraserCircle.value) {
        eraserCircle.value = new fabric.Circle({
            radius: freehandWidthInt.value,
            fill: 'rgba(255,255,0,0.3)',
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
            erasable: false,
        });
        canvas.add(eraserCircle.value);
    } else {
        eraserCircle.value.set({
            radius: freehandWidthInt.value,
            fill: 'rgba(0,0,0,0.2)',
            originX: 'center',
            originY: 'center',
            selectable: false,
            evented: false,
            erasable: false,
        });
    }
    updateEraserCircle(pointer);
};

const updateEraserCircle = (pointer = null) => {
    if (!eraserCircle.value) return;

    const canvas = getCurrentCanvas();
    const radius = freehandWidthInt.value;
    eraserCircle.value.set({ radius });

    if (pointer) {
        eraserCircle.value.set({
            left: pointer.x,
            top: pointer.y,
        });
    }

    canvas.renderAll();
};

const removeEraserCircle = () => {
    if (!eraserCircle.value) return;

    const canvas = getCurrentCanvas();
    canvas.remove(eraserCircle.value);
    eraserCircle.value = null;
};

const showEraserCursor = (event) => {
    if (eraserCircle.value) {
        const canvas = getCurrentCanvas();
        const pointer = canvas.getPointer(event.e);
        updateEraserCircle(pointer);
    }
};

const handleDoubleClick = () => {
    if (selectedShape.value === 'freehand') {
        selectShape('eraser-brush');
    } else if (selectedShape.value === 'eraser-brush') {
        selectShape('freehand');
    }
};

const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
    if (!document.fullscreenElement) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
};

const enterFullscreen = () => {
    const element = mainContainer.value;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};

const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

const addTextToCanvas = () => {
    const canvas = getCurrentCanvas();
    const text = new fabric.IText('Yeni Metin', {
        left: 50,
        top: 50,
        fontFamily: 'Arial',
        fill: 'black',
        fontSize: 20,
        editable: true,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing();
    canvas.renderAll();
    saveState();
    text.on('selected', () => {
        text.enterEditing();
    });
};

const mediaRecorder = ref(null);
const recordedChunks = ref([]);
let animationFrameId = null;
let timerInterval = null;
let elapsedTime = ref(0);
let audioStream = null;

const formattedTime = computed(() => {
    const minutes = Math.floor(elapsedTime.value / 60);
    const seconds = elapsedTime.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const toggleRecording = async () => {
    if (isRecording.value) {
        stopRecording();
        stopTimer();
    } else {
        await startRecording();
        startTimer();
    }
    isRecording.value = !isRecording.value;
};

const pauseRecording = () => {
    if (mediaRecorder.value) {
        if (mediaRecorder.value.state === 'recording') {
            mediaRecorder.value.pause();
            stopTimer();
            isPaused.value = true;
            stopAudioStream();
        } else if (mediaRecorder.value.state === 'paused') {
            mediaRecorder.value.resume();
            startTimer();
            isPaused.value = false;
            startAudioStream();
        }
    }
};

const startRecording = async () => {
    const canvas = getCurrentCanvas();
    if (!canvas) {
        console.error('Current canvas not found');
        return;
    }

    const upperCanvasElement = canvas.upperCanvasEl;
    const lowerCanvasElement = canvas.lowerCanvasEl;

    if (!upperCanvasElement || !lowerCanvasElement) {
        console.error('Upper or lower canvas element not found');
        return;
    }

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = lowerCanvasElement.width;
    offscreenCanvas.height = lowerCanvasElement.height;
    const offscreenCtx = offscreenCanvas.getContext('2d');

    const mergeCanvases = () => {
        offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
        offscreenCtx.drawImage(lowerCanvasElement, 0, 0);
        offscreenCtx.drawImage(upperCanvasElement, 0, 0);
    };

    const updateMergedStream = () => {
        mergeCanvases();
        requestAnimationFrame(updateMergedStream);
    };

    mergeCanvases();
    updateMergedStream();

    const canvasStream = offscreenCanvas.captureStream(30); // 30 FPS

    try {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const combinedStream = new MediaStream([...canvasStream.getTracks(), ...audioStream.getTracks()]);

        mediaRecorder.value = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });
        mediaRecorder.value.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.value.push(event.data);
            }
        };

        mediaRecorder.value.start();
        renderLoop();


        recordingTimeout = setTimeout(() => {
            stopRecording();
            stopTimer();
            isRecording.value = false;
        }, recordingDuration * 1000);
    } catch (err) {
        console.error('Error accessing microphone:', err);
    }
};

updateCanvasSize();

const stopRecording = () => {
    if (mediaRecorder.value) {
        cancelAnimationFrame(animationFrameId);
        mediaRecorder.value.stop();
        mediaRecorder.value.onstop = () => {
            const blob = new Blob(recordedChunks.value, {
                type: 'video/webm',
            });
            const videoURL = URL.createObjectURL(blob);
            router.push({ name: 'record', query: { videoURL } });
        };
        clearTimeout(recordingTimeout);
        stopAudioStream();
    }
};

const stopAudioStream = () => {
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
    }
};

const startAudioStream = async () => {
    if (!audioStream) {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        elapsedTime.value++;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timerInterval);
};

const renderLoop = () => {
    const canvas = getCurrentCanvas();
    if (canvas) {
        canvas.renderAll();
        animationFrameId = requestAnimationFrame(renderLoop);
    }
};

</script>

<style></style>