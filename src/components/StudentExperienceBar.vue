<template>
    <div class="flex justify-center items-center gap-1 mt-4">
        <span class="text-slate-400">Seviye:</span>
        <span class="text-sky-500 text-3xl font-bold">23</span>
    </div>
    <div class="flex justify-center gap-2 mt-2 text-slate-400">
        <span class="font-semibold">%0</span>
        <div class="progress">
            <div class="track">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </div>
        <span class="font-semibold">%100</span>
    </div>

</template>

<script setup>

</script>

<style scoped>
div.track,
div.bar {
    box-sizing: border-box;
    position: relative;
}

div.progress {
    width: 408px;
    padding-left: 2px;
    padding-right: 2px;
    height: 24px;
    border-radius: 0px;
    border: solid 2px #0ea5e9;
    background-color: #0f172a;
}

div.track {
    position: relative;
    width: 100%;
    height: 21px;
    overflow: hidden;
    -webkit-animation: prgBar 10s linear 0s infinite alternate;
    animation: prgBar 10s linear 0s infinite alternate;
}

div.bar {
    height: 15px;
    width: 4px;
    background-color: #00ff00;
    position: relative;
    border-radius: 0px;
    box-shadow: 0px 0px 5px #00ff00;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 100px;
    top: 3px;
    float: left;
    clear: top;
}


@-webkit-keyframes prgBar {
    0% {
        width: 0%
    }

    9.99% {
        width: 0%
    }

    10% {
        width: 10%
    }

    95% {
        width: 100%
    }
}

@keyframes prgBar {
    0% {
        width: 0%
    }

    9.99% {
        width: 0%
    }

    10% {
        width: 10%
    }

    95% {
        width: 100%
    }
}
</style>