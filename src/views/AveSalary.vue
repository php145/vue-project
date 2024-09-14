<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="year" label="年" width="180" />
    <el-table-column
      prop="averageSalary"
      label="上年的岗平均工资"
      width="180"
    />
    <el-table-column prop="month" label="施行月份" />
  </el-table>
</template>
<style></style>
<script lang="ts">
import IndexedDB from "../storage/IndexedDB.js";
import { ref, reactive } from "vue";
export default {
  setup() {
    let tableData = reactive([
      {
        year: 1998,
        averageSalary: 444,
        month: 9,
      },
      {
        year: 1998,
        averageSalary: 425,
        month: 3,
      },
      {
        year: 1999,
        averageSalary: 456,
        month: 12,
      },
      {
        year: 2000,
        averageSalary: 495,
        month: 12,
      },
      {
        year: 2001,
        averageSalary: 543,
        month: 12,
      },
      {
        year: 2002,
        averageSalary: 641,
        month: 12,
      },
      {
        year: 2003,
        averageSalary: 728,
        month: 12,
      },
      {
        year: 2004,
        averageSalary: 821,
        month: 12,
      },
      {
        year: 2005,
        averageSalary: 955,
        month: 12,
      },
      {
        year: 2006,
        averageSalary: 1305,
        month: 12,
      },
      {
        year: 2007,
        averageSalary: 1487,
        month: 12,
      },
      {
        year: 2008,
        averageSalary: 1795,
        month: 12,
      },
      {
        year: 2009,
        averageSalary: 1940,
        month: 12,
      },
      {
        year: 2010,
        averageSalary: 1930,
        month: 3,
      },
      {
        year: 2010,
        averageSalary: 2270,
        month: 9,
      },
      {
        year: 2011,
        averageSalary: 2540,
        month: 12,
      },
      {
        year: 2012,
        averageSalary: 2960,
        month: 12,
      },
      {
        year: 2013,
        averageSalary: 3336,
        month: 12,
      },
      {
        year: 2014,
        averageSalary: 3658,
        month: 12,
      },
      {
        year: 2015,
        averageSalary: 4044,
        month: 12,
      },
      {
        year: 2016,
        averageSalary: 4491,
        month: 12,
      },
      {
        year: 2017,
        averageSalary: 4491,
        month: 12,
      },
      {
        year: 2018,
        averageSalary: 4491,
        month: 12,
      },
      {
        year: 2019,
        averageSalary: 4764,
        month: 12,
      },
      {
        year: 2020,
        averageSalary: 5054,
        month: 12,
      },
      {
        year: 2021,
        averageSalary: 5460,
        month: 12,
      },
      {
        year: 2022,
        averageSalary: 5977,
        month: 12,
      },
      {
        year: 2023,
        averageSalary: 6284,
        month: 12,
      },
      {
        year: 2024,
        averageSalary: 6755,
        month: 12,
      },
    ]);

    // for (let i = 0; i < storagedata.length; i++) {
    //   console.log(storagedata[i]);
    // }

    openDB("pension", "1").then((db) => {
      console.log();
      // let j = 1;
      let subList = [];

      for (let i = 0; i < tableData.length; i++) {
        subList = [];
        for (let j = 0; j < tableData[i].month; j++) {
          subList.push({
            id: j + 1,
            year: tableData[i].year,
            averageSalary: tableData[i].averageSalary,
            month: j + 1,
          });
        }
        addData(db, "averageSalary", {
          id: i + 1,
          year: tableData[i].year,
          monthList: subList,
          averageSalary: tableData[i].averageSalary,
        });
      }
    });
    return { tableData };
  },
};
</script>
