// https://github.com/vuejs/vue-class-component#using-mixins
import { timestampToTime } from "@/utils/utils";

let mixin = {
  methods: {
    formatTime(value: string | Date): string {
      return timestampToTime(value, true);
    },
    showdesc(value: string): string{
      if (value == null || value == '')
        return "\n";
      if (value.length>140){
        return value.substr(0,140)+"...";
      }
      return value;
    }
  }
};
export default mixin;
