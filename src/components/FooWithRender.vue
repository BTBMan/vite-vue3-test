<script setup>
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

  // 定义props 参数里和普通的props属性数据一样
  defineProps({
    msg: String,
    isShow: {
      type: Boolean,
      default: () => true,
    },
  });

  // 定义emits
  const emits = defineEmits(['change']);

  // 定义ref变量
  const count = ref(0);

  // 定义指令
  const vMyDirective = {
    beforeMount: (e) => {
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

<script>
  export default {
    // setup() {
    //   return () => { // setup里的render function 在定义了setup script后就没有作用了
    //     return "I'm render dom";
    //   };
    // },
    render() {
      return "I'm render dom";
    },
  };
</script>
