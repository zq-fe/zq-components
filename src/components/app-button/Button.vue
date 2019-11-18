
<script>
import { Button } from 'element-ui';

export default {
  name: 'AppButton',
  extends: Button,
  props: {
    confirm: {
      type: Boolean,
      default() {
        return false;
      }
    },
    tip: {
      type: String,
      default() {
        return '您确认执行此操作吗？';
      }
    }
  },
  methods: {
    /**
     * 重写 el-button click 操作
     * @param evt
     */
    handleClick(evt) {
      if (this.confirm) {
        this.$confirm(this.tip, '确认提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('click', evt);
        }).catch(() => {
          console.log('cancel');
        });
      } else {
        this.$emit('click', evt);
      }
    }
  }
}
</script>
