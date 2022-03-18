<script setup lang="ts">
  import { ref } from 'vue';
  import FooTs from './components/FooTs.vue';
  import Foo from './components/Foo.vue';
  // import RefSugar from './components/RefSugar.vue';
  import FooWithRender from './components/FooWithRender.vue';
  import FooTsWithRender from './components/FooTsWithRender.vue';
  import PiniaTest from './components/PiniaTest.vue';

  const fooTsRef = ref();
  const fooRef = ref();
  const refSugarMsg = ref("I'm RefSugar Component");

  setTimeout(() => {
    refSugarMsg.value = `${refSugarMsg.value} Change!`;
  }, 5000);

  const change = (data: number) => {
    console.log('emit change:', data);

    console.log('fooRef:', fooRef.value.count);
    console.log('fooTsRef:', fooTsRef.value.count);
  };
</script>

<template>
  <PiniaTest />
  <FooTsWithRender msg="I'm FooTsWithRender Component"></FooTsWithRender>
  <FooWithRender msg="I'm FooWithRender Component"></FooWithRender>
  <!-- <RefSugar :msg="refSugarMsg"></RefSugar> -->
  <Foo ref="fooRef" msg="I'm Foo Component" cusAttr="I'm Custom Attrs" @change="change">
    <div class="slot-default">我是默认的插槽</div>
    <template class="slot-body" v-slot:body>我是body插槽</template>
  </Foo>
  <FooTs ref="fooTsRef" msg="I'm FooTs Component" cusAttr="I'm Custom Attrs" @change="change">
    <div class="slot-default">我是默认的插槽</div>
    <template class="slot-body" v-slot:body>我是body插槽</template>
  </FooTs>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
