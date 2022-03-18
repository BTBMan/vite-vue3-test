import { defineStore } from 'pinia';

export const usePiniaTest = defineStore({
  id: 'usePiniaTest',
  state: () => ({
    name: 'test',
  }),
  getters: {
    sayName: (state) => {
      return `hello ${state.name}`;
    },
    // 这里可以传递参数
    cusSayName: (state) => {
      return (extra: string) => `hello ${state.name} ${extra}`;
    },
  },
  actions: {
    changeName() {
      this.name = 'action change name';
    },
  },
});
