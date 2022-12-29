import { LearningObject } from "@/api/learningObjects/search";
import { reactive } from "vue";

export interface CartProps {
  value: Array<LearningObject>;
  add: (item: LearningObject) => void;
  remove: (item: LearningObject) => void;
  clear: () => void;
  save: () => void;
  init: () => void;
}

const cart = reactive<CartProps>({
  value: [],
  add(item) {
    this.value.push(item);
    this.save();
  },
  remove(item) {
    const objectInCart = this.value.find((object) => object.id === item.id);
    if (objectInCart) {
      const index = this.value.indexOf(objectInCart);
      this.value.splice(index, 1);
      this.save();
    } else localStorage.removeItem("cart");
  },
  clear() {
    localStorage.removeItem("cart");
    this.value = [];
  },
  save() {
    localStorage.setItem("cart", JSON.stringify(this.value));
  },
  init() {
    this.value = JSON.parse(localStorage.getItem("cart") ?? "[]");
  },
});

export default cart;
