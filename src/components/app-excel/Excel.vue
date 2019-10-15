<template>
  <el-button
    v-if="data.export"
    type="success"
    icon="el-icon-bottom"
    @click="exportToExcel"
    :loading="loading"
  >导出</el-button>
</template>
<script>
/**
 * form 组件模板.
 * @displayName App-Form
 */
import ExportJsonExcel from "js-export-excel";
import "./filters";
import Vue from "vue";
export default {
  name: "AppExcel",
  props: {
    query: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * 控制显示
     */
    pagination: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    /**
     *  form表单项配置
     */
    data: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      option: {},
      loading: false,
      sheetData: [],
      dataList: [],
      sheetHeader: [],
      page: 1
    };
  },
  created() {
    // this.initParams();
  },
  methods: {
    // initParams() {
    //   const query = {};
    //   this.data.params.map(f => {
    //     const { name, value } = f;
    //     query[name] = value;
    //   });
    //   this.query = query;
    // },
    beforeRequest(options) {
      if (typeof this.data.beforeRequest === "function") {
        return this.data.beforeRequest(options);
      }
      return options;
    },
    searchRequest() {
      const config = this.data;
      const url = config.url;
      const pagination = this.pagination;
      const query = {
        ...this.query,
        page: this.page,
        limit: pagination.pageSize,
        // 兼容老系统
        offset: pagination.offset,
        cnt: pagination.cnt
      };
      const requestOptions = {
        url,
        method: "get",
        params: query
      };
      const decoratedRequestOptions = this.beforeRequest(requestOptions);
      return this.request(decoratedRequestOptions);
    },
    formatData(data) {
      let res = [];
      const columns = this.data.columns;
      for (let i = 0; i < data.length; i++) {
        let temp = [];
        for (let j = 0; j < this.sheetHeader.length; j++) {
          const record = data[i];
          let item = record[this.sheetHeader[j]];
          const filter =
            columns[j] && columns[j].filter ? columns[j].filter : "";
          if (filter && typeof filter === "function") {
            item = filter(item);
          } else if (filter && typeof filter === "string") {
            const filterFunc = Vue.filter(filter);
            item = filterFunc(item, record, columns[j]);
          }
          temp.push(item);
        }
        res.push(temp);
      }
      return res;
    },
    /**
     * 表单提交，触发 submit
     */
    async getDataList(urls) {
      this.loading = true;
      const total = Math.ceil(this.pagination.total / this.pagination.pageSize);
      let res = [];
      for (let i = 1; i <= total; i++) {
        this.page = i;
        try {
          const response = await this.searchRequest();
          const items = await response.data.items;
          this.dataList = this.dataList.concat(items);
        } catch (e) {
          console.log(e);
          this.loading = false;
        }
      }
      const columns = this.data.columns;
      const sheetHeaderName = [];
      for (let i = 0; i < columns.length; i++) {
        if (!columns[i].type) {
          this.sheetHeader.push(columns[i].name);
          sheetHeaderName.push(columns[i].title);
        }
      }
      this.sheetData = this.formatData(this.dataList);
      this.sheetData.unshift(sheetHeaderName);
      this.option.fileName = "excel";
      function processRow(row) {
        let finalVal = "";
        for (let j = 0; j < row.length; j++) {
          let innerValue = row[j] === null ? "" : row[j].toString();
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
          }
          let result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
          if (j > 0) finalVal += ",";
          finalVal += result;
        }
        return finalVal;
      }
      let csvString = this.sheetData
        .map(function(item) {
          return processRow(item);
        })
        .join("\n");
      let blob = new Blob(["\uFEFF" + csvString], {
        type: "text/csv;charset=utf-8;"
      });

      let a = document.createElement("a");
      const fileName = (this.$route.meta && this.$route.meta.title) || '导出表格'
      a.download = fileName + ".csv"; 
      a.href = URL.createObjectURL(blob);
      a.click();
      // this.option.datas = [
      //   {
      //     sheetData: this.sheetData,
      //     sheetName: "sheet",
      //     sheetHeader: sheetHeaderName
      //   }
      // ];
      this.loading = false;
      // var toExcel = new ExportJsonExcel(this.option); //new
      // toExcel.saveExcel(); //保
    },
    exportToExcel() {
      this.dataList = [];
      this.sheetData = [];
      this.sheetHeader = [];
      this.getDataList();
    }
  }
};
</script>
<style lang="scss" scoped>
.x-form {
  display: flex;
  flex-direction: column;
  .form-footer {
    text-align: center;
  }
}
</style>
