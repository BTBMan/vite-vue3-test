<script setup lang="ts">
  import { ref, useAttrs, useSlots } from 'vue';

  // 异步
  const delay = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 1000);
    });
  };

  // error!!! el is null
  // 异步最好配合suspend使用 根据官网说明 suspend目前处于实验性阶段
  // await delay();

  // console.log('begin');

  // 获取slots
  const slots = useSlots();

  // console.log('slots:', slots);

  // 获取attrs
  const attrs = useAttrs();

  // console.log('attrs:', attrs);

  // 定义props
  // defineProps<{ msg: string }>();

  // 定义带有默认值的props 这里的第一个参数 一定是一个defineProps 并且不可以使用其他的变量代替
  withDefaults(defineProps<{ msg: string }>(), {
    msg: "I'm default value",
  });

  // 定义emits
  const emits =
    defineEmits<{ (e: 'change', data: number): void; (e: 'update', id: number): void }>();

  // 定义ref变量
  const count = ref(0);

  // 定义指令
  const vMyDirective: any = {
    beforeMount: (e: any) => {
      // console.log('我的自定义指令', e);
    },
  };

  // 定义函数
  const inc = () => {
    count.value++;
    emits('change', count.value);
  };

  // 定义公开的数据
  defineExpose({
    count,
  });
</script>

<template>
  <h1>Foo Component</h1>

  <h1>Props:</h1>
  <p>{{ msg }}</p>

  <h1>Varible:</h1>
  <p>{{ count }}</p>
  <p><button @click="inc">Inc</button></p>

  <h1>Directive:</h1>
  <p v-my-directive></p>

  <h1>Slots:</h1>
  <slot name="default" />
  <slot name="body" />
</template>
