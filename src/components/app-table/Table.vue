<template>
  <div class="app-table">
    <!-- 搜索条件 -->
    <search :fields="data.params" v-model="query" v-if="data.params.length!==0" @selectChange="selectChange" @dateChange="dateChange">
      <template slot="button">
        <!-- 默认查询按钮 -->
        <el-button type="primary" icon="el-icon-search" :disabled="disabled" @click="search">查询</el-button>
        <!-- @slot 按钮扩展插槽 -->
        <slot name="search">
        </slot>
        <!-- @slot 导出 -->
        <AppExcel :query="query" :data="data" :pagination="pagination" />
      </template>
    </search>
    <!-- 列表 -->
    <el-table
        :data="dataList"
        stripe
        border
        style="width: 100%;margin-top: 9px"
        v-loading="loading"
        ref="table"
        @selection-change="selectionChange"
    >
      <el-table-column
          v-if="selected"
          type="selection"
          width="55"
      />
      
      <el-table-column
          v-for="column in columns"
          :key="column.title"
          :label="column.title"
      >
        <template slot-scope="scope">
          <!-- 列占位插槽 -->
          <slot v-if="column.type === 'slot'" :name="column.name" :row="scope.row" />
          <column-cell v-else :column="column" :record="scope.row" />
        </template>
      </el-table-column>
      <!-- @slot 列扩展插槽, 配合actions： preview、update、delete、confirm，对应配置项为 { url: 'url', method, 'id', disabled: () => {} } -->
      <slot name="column" />
      <el-table-column label="操作" v-if="showOptions">
        <template slot-scope="scope">
          <el-link
              type="primary"
              v-if="actions['preview']"
              @click="previewHandler(scope.row)"
          >
            查看
          </el-link>
          <el-link
              type="primary"
              v-if="actions['update']"
              @click="updateHandler(scope.row)"
          >
            编辑
          </el-link>
          <el-link
              type="primary"
              v-if="actions['delete']"
              :disabled="actions.delete.disabled ? actions.delete.disabled(scope.row) : false"
              @click="deleteHandler(scope.row)"
          >
            删除
          </el-link>
          <el-link
              type="primary"
              v-if="actions['confirm']"
              :disabled="actions.confirm.disabled ? actions.confirm.disabled(scope.row) : false"
              @click="confirmHandler(scope.row)"
          >
            {{actions.confirm.text}}
          </el-link>
          <!-- @slot 列操作项扩展插槽 -->
          <slot name="options" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-if="pagination && !data.noSearch" class="page-pagination">
      <el-pagination
          :page-sizes="pagination.pageSizes"
          :page-size.sync="pagination.pageSize"
          :current-page="pagination.page"
          :total="pagination.total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
      />
    </div>
     <div v-if="pagination && data.required" class="page-pagination">
      <el-pagination
          :page-sizes="pagination.pageSizes"
          :page-size.sync="pagination.pageSize"
          :current-page="pagination.page"
          :total="pagination.total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Search from './search/Index';
import ColumnCell from './column-cell';
import AppExcel from '../app-excel';
import './filters';
/**
 * table 组件模板.
 * @displayName App-Table
 */
export default {
  name: 'AppTable',
  components: {
    Search,
    ColumnCell,
    AppExcel
  },
  props: {
    /**
     * 表格数据项配置，主要包含 url params  columns
     */
    data: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    height: {
      type: [String, Number],
      default() {
        return '';
      }
    },
    /**
     * 是否显示操作项
     * `actions: {update: true, preview: true, delete: true}`
     */
    showOptions: {
      type: Boolean,
      default() {
        return true;
      }
    },
    /**
     *  是否支持选择列
     */
    selected: {
      type: Boolean,
      default() {
        return false
      }
    },
    /**
     * 是否单选, 默认多选
     */
    single: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    // 列表数据
    columns() {
      return this.data.columns.filter(v => typeof v.display === 'undefined' ? true : v.display);
    },
    // 操作 actions： update、delete
    actions() {
      return this.data.actions || {};
    },
    disabled() {
      return this.data.params.some(item => {
        return item.required && !this.query[item.name]
      })
    }
  },
  data() {
    return {
      loading: false,
      selection: [],
      query: {},
      dataList: [],
      searchTimer: 0,
      pagination: {
        pageSize: 20,
        page: 1,
        pageSizes: [10, 20, 50],
        total: 0,
        // 兼容老板系统
        offset: 0,
        cnt: 20
      }
    }
  },
  created() {
    this.initParams();
  },
  mounted() {
    if(!this.data.noSearch) {
      this.doSearch(0)
    }
  },
  methods: {
    selectionChange(selection, row){
      if (selection && selection.length) {
        this.single && this.$refs.table.clearSelection();
        this.single && this.$refs.table.toggleRowSelection(row);
      } else {
        this.single && this.$refs.table.toggleRowSelection(row, false);
      }
      
      this.selection = selection;
      /**
       * 选择列时，触发selected事件，参数为选择的列
       * @type object
       */
      this.$emit('selected', selection);
    },
    initParams() {
      const query = {};
      this.data.params.map(f => {
        const { name, value } = f;
        query[name] = value;
      });
      this.query = query;
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.pagination.cnt = size;
      this.doSearch(0);
    },
    handlePageChange(page) {
      this.pagination.page = page;
      this.pagination.offset = (page - 1) * this.pagination.pageSize;
      this.doSearch(0);
    },
    beforeRequest(options) {
      if (typeof this.data.beforeRequest === 'function') {
        return this.data.beforeRequest(options);
      }
      return options;
    },
    search () {
      this.pagination.page = 1
      this.pagination.limit = 20
      this.doSearch(0);
      this.$emit('selected', []);
    },
    selectChange(val) {
      this.search()
    },
    dateChange(val) {
      this.search()
    },
    doSearch(delay = 1000) {
      const config = this.data;
      const url = config.url;
      const pagination = this.pagination;
      const query = {
        ...this.query,
        page: pagination.page,
        limit: pagination.pageSize,
        // 兼容老系统
        offset: pagination.offset,
        cnt: pagination.cnt
      };
      this.loading = true;
      const searchTimer = this.searchTimer;
      searchTimer && window.clearTimeout(searchTimer);
      // 解决 ES 数据同步问题 （间隔1秒）
      this.searchTimer = window.setTimeout(() => {
        this.searchRequest({
          url,
          query
        });
      }, delay);
    },
    /**
     * 发起搜索查询
     * @param options
     */
    searchRequest(options) {
      const { url, query } = options;
      const requestOptions = {
        url,
        method: 'get',
        params: query
      };
      const decoratedRequestOptions = this.beforeRequest(requestOptions);
      this.request(decoratedRequestOptions).then((res) => {
        this.loading = false;
        const data = res.data;
        if(this.data.noSearch) {
          this.dataList = [data]
        } else {
          this.dataList = data.items || data.Items;
          this.pagination.total = data.total || data.Total || 0;
        }
        if(this.data.required){
          this.dataList = data.items || data.Items;
          this.pagination.total = data.total || data.Total || 0;
        }
      }).catch(res => {
        this.loading = false;
      });
    },
    updateHandler(row) {
      /**
       * 点击修改按钮，触发 update 时间，参数 row
       * @type object
       */
      this.$emit('update', row);
    },
    deleteHandler(row) {
      this.$confirm('是否继续该操作', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '继续',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.deleteRequest(row);
        })
        .catch(action => {
          console.log();
        });
    },
    /**
     * 自定义弹出确认按钮，触发 confirm 事件，参数 row和是确认还是取消操作
     * @type object
     */
    confirmHandler(row) {
      this.$confirm('是否继续该操作', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '继续',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$emit('confirm', 1, row)
        })
        .catch(action => {
          this.$emit('confirm', action === 'cancel' ? 2 : 3, row);
        });
    },
    /**
     * 预览
     * @param row
     */
    previewHandler(row) {
      this.$emit('preview', row);
    },
    deleteRequest(row) {
      const action = this.actions['delete'];
      const config = this.data;
      // 删除 url, 默认
      const url = action['url'] || config.url;
      const method = action['method'] || 'delete';
      const ID = action['ID'] || 'ID';
      const params = {
        [ ID ]: row[ID]
      };
      this.request({
        url,
        method,
        params
      }).then((res) => {
        this.doSearch();
      });
    },
    filter(record, column) {
      const { filter: filterKey, name } = column;
      const text = record[name];
      if (filterKey) {
        if (typeof (filterKey) === 'string') {
          const filter = Vue.filter(filterKey)
          return filter ? filter(text, record, column) : text;
        } else {
          return filterKey(text, record);
        }
      }
      return text;
    }
  },
  addFilter(filter) {
    /*
     * 通过Vue的全局过滤器实现即可
     * {
     *  filterName: () => {}
     * }
     */
    Object.assign(this.filter, filter)
  },
  /**
   * 兼容之前老页面，新页面都放到 cell 组件去处理
   * @param text
   * @param record
   * @param column
   * @param options
   * @return {string|*}
   */
  filter(text, record, column, options) {
    const { filter: filterKey } = column;
    if (filterKey) {
      if (typeof (filterKey) === 'string') {
        const filter = Vue.filter(filterKey)
        return filter ? filter(text, record, column, options) : text;
      } else {
        return filterKey(text, record);
      }
    }
    return text;
  }
}
</script>
<style lang="scss" scoped>
  .app-table {
  }
</style>
