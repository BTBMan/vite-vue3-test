<script setup lang="ts">
  import { usePiniaTest } from '../stores/piniaTest';

  const piniaTest = usePiniaTest();

  const piniaTestClick = () => {
    // subscribe state, execute after reset and before change
    // piniaTest.$subscribe((mutation, state) => {
    //   console.log(mutation, state);
    // });

    // subscribe actions
    piniaTest.$onAction((pinia) => {
      const { after, onError } = pinia;
      console.log(pinia);

      after((res) => {
        console.log('after--------', res);
      });

      onError((err) => {
        console.log('error--------', err);
      });
    });

    // 1.
    // name.value = 'change name';

    // 2.
    // piniaTest.$patch({
    //   name: 'patch name',
    // });

    // 3. 这种方式适用于可能代价比较大的数据 比如数组push数据等 如果重新赋值 那么对于性能消耗是非常昂贵的
    // piniaTest.$patch((state) => {
    //   console.log(state.name);
    // });

    // 4. 替换整个state
    // piniaTest.$state = {
    //   name: 'replace',
    // };

    // 5. action改变
    piniaTest.changeName();

    setTimeout(() => {
      piniaTest.$reset();
    }, 2000);
  };
</script>

<template>
  <button @click="piniaTestClick">click me</button>
  {{ piniaTest.name }} - {{ piniaTest.sayName }} -
  {{ piniaTest.cusSayName('-cus') }}
</template>
