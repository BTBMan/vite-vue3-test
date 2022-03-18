<script setup>
  import { reactive, ref, watch, watchEffect } from 'vue';

  // $宏只能初始化于变量的声明 不可以不赋值使用
  // 比如直接使用是会报错的 $ref(0) error! $ref can only be used as the initializer of a variable declaration.
  // 声明变量使用 const count = $ref(0); ok

  // 使用$ref()语法糖声明一个可响应的值 使用的时候不需要.value
  const count = $ref(0);

  const t1 = $ref({ __v_isRef: true, value: 0 }); // 0 这样也可以使用
  const t2 = $ref({ a: 'a' }); // { a: 'a' } 如果不是一个ref的话 则返回传输的数据

  // $()
  // 1. 用来包裹一些可能编译器不确定的ref数据 比如用函数包裹
  // 2. 用来解构reactive对象和普通的对象
  // 3. 解构props而不丢失响应性 并且解构中的默认值可以作为prop的默认值 配合ts非常合适 这样就不需要withDefault()了

  // 1. ==============
  const fnRef = () => {
    return ref(0);
  };

  const fnRefMacro = $(fnRef());

  const t3 = $({ __v_isRef: true, value: 0 }); // 0 可以使用
  const t4 = $({ a: 'a' }); // undefined 与$ref()不同的是 如果不是一个ref的话 则会返回undefined

  // 2. ==============
  const refObj = reactive({ a: 'a', b: 'b' });
  const { a, b } = $(refObj); // 结构出来的数据依然具有响应性
  const { c, d } = $({ c: 'c', d: 'd' }); // 虽然直接赋值不可以 但是解构是可以拿到内部的值的

  // 让我们看一下嵌套
  const { f } = $({
    e: 'e',
    f: {
      g: ref('g'),
      h: count,
    },
  });

  console.log('nested:', f);

  const inc = () => {
    count++;
    fnRefMacro++;
    a = 'aa';
    b = 'bb';
  };

  // 3. ==============
  const { msg = 'aa' } = defineProps({
    msg: String,
  });

  // $$()
  // 1. 用来函数传值的时候使用 避免丢失响应性
  // 2. 在函数内部返回具有响应性的数据的时候
  // 3. 用来传递结构出来的prop的参数

  // 1. ==============
  const trackChange = (count, name) => {
    watch(count, () => {
      console.log(name, 'count changed', count); // 通过$$传递的数据 内部接收的count就是一个ref数据了
    });
  };

  const count1 = $ref(0);
  trackChange(count1, 'usual:'); // 如果这样传值的话 内部的变量并不会被watch监听到
  trackChange($$(count1), 'with $$():'); // It works

  count1++;

  // 2. ==============
  const useSomething = () => {
    const ua = $ref(0);
    const ub = $ref(0);

    // watch([ua, ub], () => {
    //   console.log('a and b are changed');
    // });

    setTimeout(() => {
      console.log('ua++');
      ua++;
    }, 1000);

    // 以这种方式返回的话 外面会丢失响应性的
    // return {
    //   ua,
    //   ub,
    // };
    // 如果返回的对象内的属性不具备ref的属性的话 则还是按照原有的数据数据进行返回
    // return $$({
    //   ua: 0,
    //   ub: 0,
    // });
    // 以这种方式返回的话 外面得到的是ua和ub的ref类型数据 所以进行操作的时候 响应式不会丢失
    return $$({
      ua,
      ub,
    });
  };

  const { ua } = useSomething(); // ref数据结构
  const $ua = $ref(ua);
  const us = useSomething();

  console.log('us:', us);

  setTimeout(() => {
    console.log('$ua++');
    $ua++;
  }, 2000);

  // 3. ==============
  const propChange = (msg, name) => {
    watch(msg, () => {
      console.log(name, 'propChange msg:', msg); // 通过$$传递的数据 内部接收的msg就是一个ref数据了
    });
  };

  propChange(msg, 'prop msg================='); // 以这种方式传递的话 如果父组件改变了prop的值 则不会被监听到
  propChange($$(msg), 'prop msg with $$================='); // 用$$包裹的prop传递函数内部 就可以被监听到

  console.log('=============', msg);
  console.log('=============', $$(msg));

  watchEffect(() => {
    console.log('count:', count);
    console.log('fnRefMacro:', fnRefMacro);
    console.log('refObj:', a, b);
    console.log('plainObj:', c, d);
    console.log('msg:', msg);
    console.log('useSomething:', ua.value);
    console.log('$ua:', $ua);
  });
</script>

<template>
  <h1>Ref Sugar</h1>
  <button @click="inc">Inc</button>
</template>
