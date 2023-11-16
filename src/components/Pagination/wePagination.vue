<!-- eslint-disable vue/prop-name-casing -->
<template>
  <div class="pag-con">
    <el-pagination
      background
      :current-page="page_offset"
      :page-sizes="pageSizesOption"
      :page-size="page_size"
      :layout="layout"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'WePagination',
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    page_offset: {
      type: Number,
      default: 1
    },
    pageSizesOption: {
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    // eslint-disable-next-line vue/prop-name-casing
    page_size: {
      type: Number,
      default: 10
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    sizeChange(page_size) {
      const { page_offset } = this
      this.$emit('paginationChange', { page_size, page_offset })
    },
    currentChange(page_offset) {
      const { page_size } = this
      this.$emit('paginationChange', { page_size, page_offset })
    }
  }
}
</script>

<style scoped lang="scss">
div.pag-con {
  width: 100%;
  text-align: right;
  padding: 12px;
  padding-right: 0;
}
</style>
