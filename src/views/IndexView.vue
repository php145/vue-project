<template>
  <el-form :model="form" label-width="250px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="人员类型">
          <el-cascader
            style="width: 200px"
            v-model="person_type_select_value"
            :options="person_type_select_options"
            @change="person_type_select_handleChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公务员职务和级别">
          <el-cascader
            v-model="position_value"
            :options="position_options"
            @change="position_handleChange"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="工作时间">
          <el-date-picker
            v-model="form.workTime"
            type="monthrange"
            style="width: 230px"
            unlink-panels
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="退休时间"
            :size="size"
            :default-value="[new Date(1995, 0, 1), new Date()]"
            @change="selectTime"
            :editable="true"
            format="YYYYMM"
            @clear="clearData"
            @calendar-change="clearData"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="建档时间">
          <el-date-picker
            v-model="form.archivesDate"
            type="month"
            placeholder="建档时间"
            :size="size"
            @change="selectArchivesDat"
            :disabled-date="disabledDate"
            :disabled="form.workTime == null ? true : false"
            :default-value="
              form.workTime != null ? form.workTime[0] : new Date()
            "
            @clear="clearData"
            @calendar-change="clearData"
            format="YYYYMM"
            :editable="true"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总工作时间">
          <el-input v-model="workTimeSum" style="width: 100px" disabled />
          <p>月</p>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="视同缴费月数">
          <el-input v-model="asTollMonth" style="width: 100px" disabled />
          <p>月</p>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="-6">
        <el-form-item label="实际缴费月数">
          <el-input v-model="actualToll" style="width: 100px" disabled />
          <p>月</p>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-form-item>
        <el-space wrap>
          <el-card
            v-for="(value, index) in jobAvgSalay"
            :key="index"
            class="box-card"
            style="width: 200px"
          >
            <template #header>
              <div class="card-header">
                <span>{{ value.year }}年</span>
              </div>
            </template>
            <div class="text item">
              月均工资：<el-input
                v-model="value.monthAveSal"
                style="width: 90px"
                size="small"
                placeholder=""
              />
              <br />
              <span> 岗平均工资：{{ value.averageSalary }}</span>
              <br />
              <span>
                实缴月数：<el-input
                  v-model="value.month"
                  style="width: 90px"
                  size="small"
                  placeholder=""
                  :defalut="value.month"
                  @change="reviseTollMonth(index)"
                  @focus="focusEvent(value)"
              /></span>
            </div>
          </el-card>
        </el-space>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { ref, reactive, computed } from "vue";
import IndexedDB from "../storage/IndexedDB.js";

export default {
  name: "IndexView",
  setup() {
    const form = reactive({
      name: "",
      person_type_select_value: "",
      position_value: "",
      workTime: null,
      archivesDate: null,
    });

    const size = "default";

    const value1 = ref("");
    const value2 = ref("");

    // do not use same name with ref

    const shortcuts = [
      {
        text: "Today",
        value: new Date(),
      },
      {
        text: "Yesterday",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        },
      },
      {
        text: "A week ago",
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        },
      },
    ];
    const onSubmit = () => {
      console.log("submit!");
    };

    const disabledDate = (time: Date) => {
      if (form.workTime != null) {
        return time.getTime() < form.workTime[0];
      }
      // console.log(time.toLocaleString("zh-cn"));
    };

    //级联选择器

    const person_type_select_value = "";

    const person_type_select_options = [
      {
        value: "Option1",
        label: "机关",
        children: [
          {
            value: "Option1",
            label: "公务员",
          },
          {
            value: "Option1",
            label: "工人",
            children: [
              {
                value: "Option1",
                label: "技术工人",
              },
              {
                value: "Option1",
                label: "普通工人",
              },
            ],
          },
        ],
      },
      {
        value: "Option3",
        label: "事业",
        children: [
          {
            value: "Option1",
            label: "专技",
          },
          {
            value: "Option1",
            label: "管理",
          },
          {
            value: "Option1",
            label: "工人",
          },
        ],
      },
      {
        value: "Option2",
        label: "企业",
      },
    ];

    const person_type_select_handleChange = (value) => {
      console.log("11111");
    };

    //级联选择器
    //机关公务员级联选择器
    const position_value = [];

    const position_props = {
      expandTrigger: "hover" as const,
    };

    const position_handleChange = (value) => {
      console.log(value);
    };

    const position_options = [
      {
        value: "county_division",
        label: "县处级正职",
        children: [
          {
            value: "leadership",
            label: "领导职务",
            children: [],
          },
          {
            value: "non_navigation",
            label: "非领导职务",
            children: [],
          },
        ],
      },
      {
        value: "county_deputy_division",
        label: "县处级副职",
        children: [
          {
            value: "leadership",
            label: "领导职务",
            children: [],
          },
          {
            value: "non_navigation",
            label: "非领导职务",
            children: [],
          },
        ],
      },
      {
        value: "village_Section",
        label: "乡科级正职",
        children: [
          {
            value: "leadership",
            label: "领导职务",
            children: [],
          },
          {
            value: "non_navigation",
            label: "非领导职务",
            children: [],
          },
        ],
      },
      {
        value: "county_deputy_section",
        label: "乡科级副职",
        children: [
          {
            value: "leadership",
            label: "领导职务",
            children: [],
          },
          {
            value: "non_navigation",
            label: "非领导职务",
            children: [],
          },
        ],
      },
      {
        value: "clerk",
        label: "科员",
      },
      {
        value: "officer",
        label: "办事员",
      },
    ];

    let level_children = [];
    for (let i = 0; i < 27; i++) {
      let stalls_children = [];
      let n = 14;

      switch (i + 1) {
        case 1:
        case 26:
        case 27:
          n = 6;
          break;
        case 2:
        case 25:
          n = 7;
          break;
        case 3:
        case 23:
        case 24:
          n = 8;
          break;
        case 4:
        case 22:
          n = 9;
          break;
        case 5:
        case 21:
          n = 10;
          break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 20:
          n = 11;
          break;
        case 11:
        case 19:
          n = 12;
          break;
        case 12:
        case 17:
        case 18:
          n = 13;
          break;
        case 13:
        case 14:
        case 15:
        case 16:
          n = 14;
          break;
      }
      for (let i = 0; i < n; i++) {
        stalls_children[i] = { value: "stalls_" + i + 1, label: i + 1 + "档" };
      }
      level_children[i] = {
        value: "level_" + i + 1,
        label: i + 1 + "级",
        children: stalls_children,
      };
    }

    // console.log(level_children);

    for (let position_option in position_options) {
      if (parseInt(position_option) < 4) {
        // console.log(position_options[position_option].children["0"]);
        position_options[position_option].children["0"]["children"] =
          level_children;
        position_options[position_option].children["1"]["children"] =
          level_children;
      }
      // if (parseInt(position_option) < 5)
      //   position_options[position_option].children = children;
    }

    let workTimeSum = ref(0);
    //工作时间选择器的改变事件
    let selectTime = () => {
      if (form.workTime != null) {
        let millisecond =
          form.workTime[1].getTime() - form.workTime[0].getTime();
        let month = millisecond * 3.8026486208333e-10;
        workTimeSum.value = Math.round(month);
        console.log(month);
      }
    };
    //视同缴费月数
    let asTollMonth = ref(0);

    //实际缴费月数
    let actualToll = ref(0);

    //岗平均工资
    let jobAvgSalay = reactive([]);

    let selectArchivesDat = () => {
      if (form.archivesDate != null && form.workTime != null) {
        asTollMonth.value = Math.round(
          (form.archivesDate.getTime() - form.workTime[0].getTime()) *
            3.8026486208333e-10
        );
        actualToll.value = workTimeSum.value - asTollMonth.value;
        // console.log(asTollMonth);
        openDB("pension", "1").then((db) => {
          let averageSalaryList = [];
          cursorGetData(db, "averageSalary", function (cursor) {
            if (cursor) {
              // 必须要检查
              // while (

              // ) {
              //   cursor.continue();
              // }
              // console.log(
              //   form.workTime[1].getFullYear().toString() +
              //     form.workTime[1].getMonth().toString() >
              //     cursor.value.year
              // );
              if (
                cursor.value.year >
                  form.archivesDate.getFullYear().toString() +
                    form.archivesDate.getMonth().toString().padStart(2, "0") &&
                cursor.value.year <=
                  form.workTime[1].getFullYear().toString() +
                    (form.workTime[1].getMonth() + 1)
                      .toString()
                      .padStart(2, "0")
              ) {
                // console.log(
                //   form.archivesDate.getFullYear().toString() +
                //     (form.workTime[0].getMonth() + 1) !=
                //     cursor.value.year
                // );
                console.log(111);
                cursor.continue(); // 遍历了存储对象中的所有内容
                averageSalaryList.push(cursor.value);
              } else {
                cursor.continue();
              }
            } else {
              // 合并同类;
              let i = 0,
                j = 1;
              for (i = 0, j = 1; i < averageSalaryList.length - 1; i++) {
                if (
                  averageSalaryList[i].year.slice(0, 4) !=
                  averageSalaryList[i + 1].year.slice(0, 4)
                ) {
                  jobAvgSalay.push({
                    year: averageSalaryList[i].year.slice(0, 4),
                    averageSalary: averageSalaryList[i].averageSalary,
                    month: j,
                  });
                  j = 1;
                } else {
                  j++;
                }
              }
              jobAvgSalay.push({
                year: averageSalaryList[i].year.slice(0, 4),
                averageSalary: averageSalaryList[i].averageSalary,
                month: j,
                monthAveSal: 0,
                subItem: 0,
              });
              console.log("游标读取的数据：", jobAvgSalay);
            }
          });
        });
      }
    };

    //修改缴费月数
    let oldMonth = 12;
    let reviseTollMonth = (index) => {
      if (
        jobAvgSalay[index].month >= 1 &&
        jobAvgSalay[index].month <
          (jobAvgSalay[index].subItem == 0
            ? jobAvgSalay[index].month
            : jobAvgSalay[index - 1].month)
      ) {
        jobAvgSalay.splice(index + 1, 0, {
          year: jobAvgSalay[index].year,
          averageSalary: jobAvgSalay[index].averageSalary,
          month: jobAvgSalay[index - 1].month - jobAvgSalay[index].month,
          monthAveSal: 0,
          subItem: jobAvgSalay[index]++,
        });
      } else {
        jobAvgSalay[index].month = jobAvgSalay[index - 1].month;
      }
      console.log(index);
    };
    let focusEvent = (value) => {
      oldMonth = value.month;
    };

    //清除数据
    let clearData = () => {
      workTimeSum.value = 0;
      asTollMonth.value = 0;
      actualToll.value = 0;
      form.archivesDate = {};
    };

    return {
      focusEvent,
      reviseTollMonth,
      jobAvgSalay,
      actualToll,
      clearData,
      asTollMonth,
      selectArchivesDat,
      workTimeSum,
      selectTime,
      form,
      size,
      value1,
      value2,
      shortcuts,
      onSubmit,
      disabledDate,
      person_type_select_value,
      person_type_select_options,
      position_options,
      person_type_select_handleChange,
      position_value,
      position_handleChange,
    };
  },
};
</script>

<style>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
