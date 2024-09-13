<template>
  <el-form :model="form" label-width="180px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="姓名" prop="customName">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="人员类型" prop="customName">
          <el-cascader
            v-model="person_type_select_value"
            :options="person_type_select_options"
            @change="person_type_select_handleChange"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公务员职务和级别" prop="customName">
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
        <el-form-item label="工作时间" prop="phoneNumb">
          <el-date-picker
            v-model="value1"
            type="daterange"
            unlink-panels="true"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="退休时间"
            :size="size"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="建档时间" prop="phoneNumb">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="建档时间"
            :size="size"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="退休时间" prop="phoneNumb"> </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
// export default {
//   name: "HomeView",
// };
import { ref } from "vue";

// do not use same name with ref
const form = ref({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
};
const size = "default";

const value1 = ref("");
const value2 = ref("");

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

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};

//级联选择器

const person_type_select_value = ref("");

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
  console.log(value);
};
//级联选择器
//机关公务员级联选择器
const position_value = ref([]);

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
</script>

<style></style>
