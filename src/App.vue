<script setup>
import { reactive } from "vue";
import { Howl } from "howler";
import audioChickenBuck from "@/assets/chicken-buk.wav";
import audioChickenLayEgg from "@/assets/chicken-lay-egg.wav";
import helpers from "@/helpers";

const state = reactive({
  mrsChickenAnimStep: 1,
  eggs: [{ x: 100, y: 100 }],
  mrsChickenPosition: {
    x: window.screen.availWidth / 2,
    y: window.screen.availHeight / 4,
  },
});

var soundChickenBuck = new Howl({
  src: [audioChickenBuck],
  volume: 0.5,
});
var soundChickenLayEgg = new Howl({
  src: [audioChickenLayEgg],
});

function handleMoveChicken(event) {
  state.mrsChickenPosition = { x: event.clientX, y: event.clientY };
}

function handleLayEgg(event) {
  state.eggs.push({
    x: event.clientX,
    y: event.clientY,
  });
  soundChickenLayEgg.play();
}

setInterval(() => {
  if (state.mrsChickenAnimStep < 10) {
    state.mrsChickenAnimStep++;
  } else {
    state.mrsChickenAnimStep = 1;
  }

  if (state.mrsChickenAnimStep === 10) {
    soundChickenBuck.play();
    if (helpers.randomBoolean()) {
      setTimeout(() => {
        soundChickenBuck.play();
      }, 500);
    }
  }
}, 300);
</script>

<template>
  <div class="score">{{ state.eggs.length }}</div>
  <div class="farm" @mousemove="handleMoveChicken" @click="handleLayEgg">
    <template v-for="egg in state.eggs">
      <div
        class="egg"
        :style="{
          left: egg.x + 'px',
          top: egg.y + 'px',
        }"
      ></div>
    </template>

    <div
      class="mrs-chicken"
      :class="`mrs-chicken-anim-step-${state.mrsChickenAnimStep}`"
      :style="{
        left: state.mrsChickenPosition.x + 'px',
        top: state.mrsChickenPosition.y + 'px',
      }"
    ></div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*:before,
*:after {
  box-sizing: border-box;
}

html {
  // cursor: none;
}
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  background-color: #38b7fc;
}

.score {
  position: fixed;
  top: 20px;
  right: 40px;
  font-family: "comic sans", sans-serif;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  padding-left: 40px;
  background: transparent url(./assets/egg.png) 0 0 / auto 100% no-repeat;
}

.farm {
  width: 100%;
  height: 100%;
}

.mrs-chicken {
  width: 100px;
  height: 100px;
  background-color: transparent;
  background-image: url(./assets/chicken.png);
  background-size: 100px 100px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  &.mrs-chicken-anim-step-1 {
    background-image: url(./assets/chicken-anim-step-1.png);
  }
  &.mrs-chicken-anim-step-2 {
    background-image: url(./assets/chicken-anim-step-2.png);
  }
  &.mrs-chicken-anim-step-3 {
    background-image: url(./assets/chicken-anim-step-4.png);
  }
  &.mrs-chicken-anim-step-4 {
    background-image: url(./assets/chicken-anim-step-1.png);
  }
  &.mrs-chicken-anim-step-5 {
    background-image: url(./assets/chicken-anim-step-2.png);
  }
  &.mrs-chicken-anim-step-6 {
    background-image: url(./assets/chicken-anim-step-4.png);
  }
  &.mrs-chicken-anim-step-7 {
    background-image: url(./assets/chicken-anim-step-1.png);
  }
  &.mrs-chicken-anim-step-8 {
    background-image: url(./assets/chicken-anim-step-2.png);
  }
  &.mrs-chicken-anim-step-9 {
    background-image: url(./assets/chicken-anim-step-4.png);
  }
  &.mrs-chicken-anim-step-10 {
    background-image: url(./assets/chicken-anim-step-3.png);
  }
}

.egg {
  width: 60px;
  height: 75px;
  background: transparent url(./assets/egg.png) 0 0/100% auto no-repeat;
  position: absolute;
  transform-origin: 50% 100%;
  transform: translate(-50%, -10%);
  animation: shaking-egg 5s infinite;
}

@keyframes shaking-egg {
  80% {
    transform: translate(-50%, -10%) rotate(10deg);
  }
  85% {
    transform: translate(-50%, -10%) rotate(-10deg);
  }
  90% {
    transform: translate(-50%, -10%) rotate(10deg);
  }
  95% {
    transform: translate(-50%, -10%) rotate(0deg);
  }
}
</style>
