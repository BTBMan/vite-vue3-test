<script setup lang="ts">
  import { defineComponent, ref, useAttrs, useSlots } from 'vue';
  // import { $ref } from 'vue/macros'; // 当然可以显式的引入 不引入的话 也不会报错 只是会有编辑器的语法提示错误 另一种方式就是可以在.d.ts文件当中引入类型

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

  // 使用macro
  const mRef = $ref(0);

  console.log('use macro with ts', mRef);
</script>

<script lang="ts">
  export default defineComponent({
    // setup() {
    //   return () => { // setup里的render function 在定义了setup script后就没有作用了
    //     return 'skdljfkl';
    //   };
    // },
    render() {
      return "I'm render dom ts";
    },
  });
</script>
