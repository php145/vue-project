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
        <el-form-item
          label="公务员职务和级别"
          v-if="person_type_select_value_sum == '00'"
        >
          <el-cascader
            v-model="position_value"
            :options="position_options"
            @change="position_handleChange"
          />
        </el-form-item>
        <el-form-item
          label="机关工人技术等级"
          v-if="person_type_select_value_sum == '010'"
        >
          <el-cascader
            v-model="position_value"
            :options="agencyWorkerSkillLevelTabOpt"
            @change="position_handleChange"
          />
        </el-form-item>

        <el-form-item
          label="普通工人岗位等级"
          v-if="person_type_select_value_sum == '011'"
        >
          <el-cascader
            v-model="position_value"
            :options="agencyOrdinarySkillLevelTabOpt"
            @change="position_handleChange"
          />
        </el-form-item>
        <el-form-item
          label="事业单位专技人员岗位等级和薪级"
          v-if="person_type_select_value_sum == '10'"
        >
          <el-cascader
            v-model="position_value"
            :options="causeWorkmanLevAndSalSc"
            @change="position_handleChange"
          />
        </el-form-item>

        <el-form-item
          label="事业单位管理人员岗位等级和薪级"
          v-if="person_type_select_value_sum == '11'"
        >
          <el-cascader
            v-model="position_value"
            :options="causeWorkmanLevAndSalSc"
            @change="position_handleChange"
          />
        </el-form-item>

        <el-form-item
          label="事业单位工人岗位等级和薪级"
          v-if="person_type_select_value_sum == '12'"
        >
          <el-cascader
            v-model="position_value"
            :options="causeWorkmanLevAndSalSc"
            @change="position_handleChange"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="退休补贴指数">
          <el-select
            v-model="retireSubsidyExp"
            placeholder="档位/标准/指数"
            style="width: 240px"
            :disabled="
              (position_value != null && position_value.length != 0) ||
              person_type_select_value_sum == '2'
                ? false
                : true
            "
            @change="retireSubsidyExpHandleChange"
          >
            <el-option
              v-for="item in retireSubsidyExpOpt"
              :key="item.value"
              :label="item.exp"
              :value="item.exp"
            >
              <el-row>
                <el-col :span="8"
                  ><span>{{ item.value }}</span>
                </el-col>
                <el-col :span="8">
                  <span>{{ item.SubsidyStd }}</span>
                </el-col>
                <el-col :span="8">
                  <span>{{ item.exp }}</span>
                </el-col>
              </el-row>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
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
            size="default"
            :default-value="[new Date(1995, 0, 1), new Date()]"
            @change="selectTime"
            :disabled="
              person_type_select_value != null &&
              person_type_select_value.length != 0
                ? false
                : true
            "
            @clear="clearData"
            :editable="true"
            format="YYYYMM"
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
            @clear="clearData"
            :disabled-date="disabledDate"
            :disabled="
              form.workTime != null && form.workTime.length != 0 ? false : true
            "
            :default-value="
              form.workTime != null && form.workTime.length != 0
                ? new Date()
                : form.workTime[0]
            "
            format="YYYYMM"
            :editable="true"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="视同缴费月数">
          <el-input v-model="form.asTollMonth" style="width: 100px" disabled />
          <p>月</p>
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="-6">
        <el-form-item label="实际缴费月数">
          <el-input v-model="form.actualToll" style="width: 100px" disabled />
          <p>月</p>
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
        <el-form-item label="视同缴费指数">
          <el-input v-model="form.asTollexp" style="width: 240px" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="-6">
        <el-form-item label="实际缴费指数">
          <el-input
            v-model="form.actualTollexp"
            style="width: 240px"
            disabled
          />
        </el-form-item>
      </el-col>
      <el-col :span="8" :offset="-6">
        <el-form-item label="平均缴费指数">
          <el-input v-model="form.avgTollexp" style="width: 240px" disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="个人帐户养老金">
          <el-input v-model="form.PersonalAccPension" style="width: 240px"
        /></el-form-item>
      </el-col>
      <el-col :span="8" :offset="-6">
        <el-form-item label="基础养老金">
          <el-input v-model="form.BasePension" style="width: 240px" disabled
        /></el-form-item>
      </el-col>
      <el-col :span="8" :offset="-6">
        <el-form-item label="过渡性养老金"
          ><el-input
            v-model="form.TransitionPension"
            style="width: 240px"
            disabled
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="月应发基本养老金合计："> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item>
        <el-space wrap>
          <el-card
            v-for="(value, index) in form.jobAvgSalay"
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
                @change="avgSalayInptEvn"
              />
              <br />
              <span> 岗平均工资：{{ value.averageSalary }}</span>
              <br />
              <span>
                实缴月数：<el-input-number
                  v-model="value.month"
                  style="width: 90px"
                  size="small"
                  placeholder=""
                  :min="value.monthMin"
                  :max="value.monthMax"
                  :defalut="value.month"
                  :controls="false"
                  @blur="reviseTollMonth(index, value)"
                  @focus="focusEvent(value)"
              /></span>
            </div>
            <template #footer>
              <div class="card-footer" style="text-align: right">
                <el-button
                  type="danger"
                  :disabled="value.subItem == 0 ? true : false"
                  @click="delSubReviseTollMonth(index, value)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-card>
        </el-space>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { openDB, cursorGetData } from "../storage/IndexedDB.js";

export default {
  name: "IndexView",
  setup() {
    const form = reactive({
      name: "",
      person_type_select_value: "",
      workTime: [],
      archivesDate: "",
      asTollexp: null,
      asTollMonth: null,
      actualToll: null,
      actualTollexp: 0,
      avgTollexp: 0,
      jobAvgSalay: [],
      TransitionPension: 0,
      BasePension: 0,
      PersonalAccPension: null,
    });

    const size = "default";

    const value1 = ref("");
    const value2 = ref("");

    let person_type_select_value_sum = ref("");

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
      if (form.workTime != null && form.workTime.length != 0) {
        return (
          time.getTime() < form.workTime[0] ||
          time.getTime() >= form.workTime[1]
        );
      }
      // console.log(time.toLocaleString("zh-cn"));
    };

    //级联选择器

    const person_type_select_value = ref("");

    const person_type_select_options = [
      {
        value: "0",
        label: "机关",
        children: [
          {
            value: "0",
            label: "公务员",
          },
          {
            value: "1",
            label: "工人",
            children: [
              {
                value: "0",
                label: "技术工人",
              },
              {
                value: "1",
                label: "普通工人",
              },
            ],
          },
        ],
      },
      {
        value: "1",
        label: "事业",
        children: [
          {
            value: "0",
            label: "专技",
          },
          {
            value: "1",
            label: "管理",
          },
          {
            value: "2",
            label: "工人",
          },
        ],
      },
      {
        value: "2",
        label: "企业",
      },
    ];

    const person_type_select_handleChange = (values) => {
      position_value.value = [];
      person_type_select_value_sum.value = "";
      // for (let value in values) {
      //   sum.join(value.toString());
      // }
      for (let i in values) {
        person_type_select_value_sum.value += values[i];
      }
      console.log("人员类型选择器：" + person_type_select_value_sum.value);
    };

    //级联选择器
    //机关公务员级联选择器
    const position_value = ref([]);

    const position_props = {
      expandTrigger: "hover" as const,
    };

    const position_options = computed(function () {
      let civilOpt = [
        {
          value: 0,
          label: "县处级正职",
          children: [
            {
              value: 0,
              label: "领导职务",
              children: [],
            },
            {
              value: 1,
              label: "非领导职务",
              children: [],
            },
          ],
        },
        {
          value: 1,
          label: "县处级副职",
          children: [
            {
              value: 0,
              label: "领导职务",
              children: [],
            },
            {
              value: 1,
              label: "非领导职务",
              children: [],
            },
          ],
        },
        {
          value: 2,
          label: "乡科级正职",
          children: [
            {
              value: 0,
              label: "领导职务",
              children: [],
            },
            {
              value: "1",
              label: "非领导职务",
              children: [],
            },
          ],
        },
        {
          value: 3,
          label: "乡科级副职",
          children: [
            {
              value: "0",
              label: "领导职务",
              children: [],
            },
            {
              value: "1",
              label: "非领导职务",
              children: [],
            },
          ],
        },
        {
          value: 4,
          label: "科员",
        },
        {
          value: 5,
          label: "办事员",
        },
      ];
      let levelSubTab = [];
      let gearSubTab = [];
      for (let i = 0; i < cicvlServantExpTab.length; i++) {
        for (let j = 0; j < cicvlServantExpTab[i].length; j++) {
          gearSubTab.push({
            value: j,
            label: j + 1 + "档",
          });
        }
        levelSubTab.push({
          value: i,
          label: i + 1 + "级",
          children: gearSubTab,
        });
        gearSubTab = [];
      }

      for (let i = 0; i < civilOpt.length - 2; i++) {
        for (let j = 0; j < civilOpt[i].children.length; j++) {
          // console.log(civilOpt[i]);
          civilOpt[i].children[j]["children"] = levelSubTab;
        }
      }
      return civilOpt;
    });

    // 公务员职务指数表
    let cicvlPostExpTab = reactive([
      [0.4738, 0.449],
      [0.4066, 0.389],
      [0.3175, 0.3069],
      [0.2893, 0.2822],
      [0.2363],
      [0.2222],
    ]);

    // 公务员级别指数表
    let cicvlServantExpTab = reactive([
      [1.0668, 1.1234, 1.1799, 1.2364, 1.2929, 1.3494], //1
      [0.9785, 1.0297, 1.081, 1.1322, 1.1834, 1.2346, 1.2859], //2
      [0.8937, 0.9432, 0.9927, 1.0421, 1.0916, 1.141, 1.1905, 1.2399], //3
      [0.809, 0.857, 0.905, 0.9531, 1.0011, 1.0492, 1.0972, 1.1453, 1.1933], //4
      [
        0.7312, 0.7779, 0.8245, 0.8711, 0.9178, 0.9644, 1.011, 1.0577, 1.1043,
        1.1057,
      ], //5
      [
        0.6606, 0.7051, 0.7496, 0.7941, 0.8386, 0.8831, 0.9277, 0.9722, 1.0167,
        1.0612, 1.1057,
      ], //6
      [
        0.6005, 0.6422, 0.6839, 0.7256, 0.7673, 0.809, 0.8506, 0.8923, 0.934,
        0.9757, 1.0174,
      ], //7
      [
        0.5511, 0.5896, 0.6281, 0.666, 0.7051, 0.7436, 0.7821, 0.8206, 0.8591,
        0.8976, 0.9361,
      ], //8
      [
        0.508, 0.5433, 0.5786, 0.614, 0.6493, 0.6846, 0.7199, 0.7553, 0.7906,
        0.8259, 0.8612,
      ], //9
      [
        0.4677, 0.5002, 0.5327, 0.5652, 0.5977, 0.6302, 0.6627, 0.6952, 0.7277,
        0.7602, 0.7927,
      ], //10
      [
        0.4299, 0.4599, 0.49, 1.52, 0.55, 0.58, 0.6101, 0.6401, 0.6701, 0.7002,
        0.7302, 0.7602,
      ], //11
      [
        0.3946, 0.4225, 0.4504, 0.4783, 0.5062, 0.5341, 0.562, 0.5899, 0.6178,
        0.6458, 0.6737, 0.7016, 0.7295,
      ], //12
      [
        0.3617, 0.3879, 0.414, 0.4402, 0.4663, 0.4924, 0.5186, 0.5447, 0.5709,
        0.597, 0.6231, 0.6493, 0.6754, 0.7016,
      ], //13
      [
        0.3314, 0.3557, 0.3801, 0.4045, 0.4289, 0.4532, 0.4776, 0.502, 0.5264,
        0.5507, 0.5751, 0.5995, 0.6239, 0.6482,
      ], //14
      [
        0.3034, 0.3264, 0.3494, 0.3723, 0.3953, 0.4183, 0.4412, 0.4642, 0.4871,
        0.5101, 0.5331, 0.556, 0.579, 0.6019,
      ], //15
      [
        0.2777, 0.2992, 0.3208, 0.3423, 0.3639, 0.3854, 0.407, 0.4285, 0.45,
        0.4716, 0.4931, 0.5147, 0.5362, 0.5578,
      ], //16
      [
        0.254, 0.2741, 0.2943, 0.3144, 0.3345, 0.3547, 0.3748, 0.3949, 0.4151,
        0.4352, 0.4553, 0.4755, 0.4956,
      ], //17
      [
        0.2324, 0.2512, 0.2699, 0.2886, 0.3073, 0.3261, 0.3448, 0.3635, 0.3822,
        0.4009, 0.4197, 0.4384, 0.4571,
      ], //18
      [
        0.2127, 0.23, 0.2473, 0.2646, 0.2819, 0.2992, 0.3165, 0.3338, 0.3511,
        0.3684, 0.3858, 0.4031,
      ], //19
      [
        0.1946, 0.2105, 0.2264, 0.2423, 0.2582, 0.2741, 0.29, 0.3059, 0.3218,
        0.3377, 0.3536,
      ], //20
      [
        0.178, 0.1925, 0.207, 0.2215, 0.236, 0.2505, 0.2649, 0.2794, 0.2939,
        0.3084,
      ], //21
      [0.1629, 0.1759, 0.189, 0.2021, 0.2151, 0.2282, 0.2413, 0.2543, 0.2674], //22
      [0.1491, 0.1607, 0.1724, 0.184, 0.1957, 0.2074, 0.219, 0.2307], //23
      [0.1364, 0.147, 0.1576, 0.1682, 0.1787, 0.1893, 0.1999, 0.2105], //24
      [0.1243, 0.1342, 0.1441, 0.154, 0.1639, 0.1738, 0.1837], //25
      [0.113, 0.1226, 0.1321, 0.1417, 0.1512, 0.1607], //26
      [0.1024, 0.1116, 0.1208, 0.13, 0.1392, 0.1484], //27
    ]);

    //机关工人技术等级表
    let agencyWorkerSkillLevelTab = reactive([
      0.2822, 0.2328, 0.1709, 0.1568, 0.1462,
    ]);

    //agency 机关工人岗位指数表
    // 技术工人agencySkillWorker
    let agencySkillWorkerTab = reactive([
      [
        0.3162, 0.3306, 0.3451, 0.3617, 0.3783, 0.3949, 0.4137, 0.4324, 0.4511,
        0.472, 0.4928, 0.5136, 0.5366, 0.5596, 0.5825,
      ], //1
      [
        0.2685, 0.2808, 0.2932, 0.3056, 0.3197, 0.3338, 0.348, 0.3642, 0.3805,
        0.3967, 0.4151, 0.4334, 0.4518, 0.4727, 0.4935,
      ], //2
      [
        0.2296, 0.2406, 0.2515, 0.2625, 0.2745, 0.2865, 0.2985, 0.3116, 0.3246,
        0.3377, 0.3526, 0.3674, 0.3822, 0.3988, 0.4154, 0.4338, 0.4522,
      ], //3
      [
        0.2014, 0.2112, 0.2211, 0.231, 0.242, 0.2529, 0.2639, 0.2759, 0.2879,
        0.2999, 0.313, 0.3261, 0.3391, 0.3536, 0.3681, 0.384, 0.3999, 0.4158,
      ], //4
      [
        0.1766, 0.1858, 0.195, 0.2042, 0.2141, 0.224, 0.2339, 0.2448, 0.2558,
        0.2667, 0.2784, 0.29, 0.3017, 0.3148, 0.3278, 0.3409, 0.3554, 0.3699,
      ],
    ]);
    // 普通工人
    let agencyOrdinaryWorkerTab = reactive([
      0.3175, 0.326, 0.3345, 0.3437, 0.3529, 0.3628, 0.3726, 0.3836, 0.3945,
      0.4066, 0.4186, 0.432, 0.4454, 0.4599, 0.4744, 0.4899, 0.5055, 0.521,
      0.5366,
    ]);
    const agencyOrdinarySkillLevelTabOpt = computed(() => {
      let totalTab = [];
      for (let i = 0; i < agencyOrdinaryWorkerTab.length; i++) {
        totalTab.push({ value: i, label: i + 1 + "级" });
      }
      return totalTab;
    });

    const agencyWorkerSkillLevelTabOpt = computed(() => {
      // 合并机关技术工人的数组
      let totalTab = [
        { value: "0", label: "高级技师" },
        { value: "1", label: "技师" },
        { value: "2", label: "高级工" },
        { value: "3", label: "中级工" },
        { value: "4", label: "初级工" },
      ];

      let subTab = [];
      for (let i = 0; i < agencySkillWorkerTab.length; i++) {
        for (let j = 0; j < agencySkillWorkerTab[i].length; j++) {
          subTab.push({
            value: j,
            label: j + 1 + "级",
          });
        }
        totalTab[i]["children"] = subTab;
        subTab = [];
      }
      // console.log(totalTab);
      return totalTab;
    });

    //事业单位工作人员岗位指数
    //管理人员岗位
    let causeManPersonnelLevTab = reactive([
      1.4032, 1.1842, 0.8541, 0.7358, 0.5497, 0.4808, 0.3917, 0.3635, 0.3105,
      0.2963,
    ]);

    //专技人员岗位
    let causeSkillPersonnelLevTab = reactive([
      1.2639, 0.9459, 0.8506, 0.7764, 0.5974, 0.5479, 0.5091, 0.4129, 0.3953,
      0.3776, 0.3211, 0.3105, 0.2963,
    ]);
    // 工人岗位
    let causeWorkmanLevTab = reactive([
      0.4306, 0.3811, 0.3193, 0.3052, 0.2946, 0.2928,
    ]);

    //事业单位工作人员薪级指数表
    //管理人员薪级指数表
    let causeManPersonnelSaLvExpTab = reactive([
      0.0283, 0.0321, 0.036, 0.0399, 0.0442, 0.0484, 0.0533, 0.0583, 0.0639,
      0.0696, 0.076, 0.0823, 0.0894, 0.0964, 0.1042, 0.112, 0.1205, 0.1289,
      0.1381, 0.1473, 0.1565, 0.1664, 0.1763, 0.1862, 0.1961, 0.2059, 0.2165,
      0.2271, 0.2377, 0.2483, 0.2596, 0.2709, 0.2823, 0.2946, 0.307, 0.3193,
      0.3335, 0.3476, 0.3617, 0.3759, 0.3918, 0.4077, 0.4236, 0.4395, 0.4553,
      0.4712, 0.4889, 0.5066, 0.5242, 0.5419, 0.5617, 0.5846, 0.6076, 0.6306,
      0.6535, 0.6783, 0.703, 0.7277, 0.7524, 0.7772, 0.8054, 0.8337, 0.8619,
      0.8902, 0.9185,
    ]);

    // 专业技术人员薪级年指数表
    let causeSkillPersonnelSaLvExpTab = reactive([
      0.0283, 0.0321, 0.036, 0.0399, 0.0442, 0.0484, 0.0533, 0.0583, 0.0639,
      0.0696, 0.076, 0.0823, 0.0894, 0.0964, 0.1042, 0.112, 0.1205, 0.1289,
      0.1381, 0.1473, 0.1565, 0.1664, 0.1763, 0.1862, 0.1961, 0.2059, 0.2165,
      0.2271, 0.2377, 0.2483, 0.2596, 0.2709, 0.2823, 0.2946, 0.307, 0.3193,
      0.3335, 0.3476, 0.3617, 0.3759, 0.3918, 0.4077, 0.4236, 0.4395, 0.4553,
      0.4712, 0.4889, 0.5066, 0.5242, 0.5419, 0.5617, 0.5846, 0.6076, 0.6306,
      0.6535, 0.6783, 0.703, 0.7277, 0.7524, 0.7772, 0.8054, 0.8337, 0.8619,
      0.8902, 0.9185,
    ]);

    // 工人薪级指数表
    let causeWorkmanSaLvExpTab = reactive([
      0.0247, 0.0283, 0.0318, 0.0357, 0.0396, 0.0438, 0.048, 0.0523, 0.0569,
      0.0615, 0.0664, 0.0714, 0.0767, 0.082, 0.0876, 0.0933, 0.0996, 0.106,
      0.113, 0.1201, 0.1282, 0.1364, 0.1445, 0.1526, 0.1607, 0.1689, 0.178,
      0.1872, 0.1964, 0.2067, 0.2169, 0.2271, 0.2384, 0.2498, 0.2611, 0.2734,
      0.2858, 0.2981, 0.3105, 0.3232,
    ]);

    // 事业单位工作人员岗位等级和薪级
    let causeWorkmanLevAndSalSc = computed(() => {
      let totalTab = [];
      switch (person_type_select_value_sum.value) {
        case "10":
          {
            let subList = [];
            for (let j = 0; j < causeSkillPersonnelSaLvExpTab.length; j++) {
              subList.push({
                value: j,
                label: j + 1 + "级薪资",
              });
            }
            for (let i = 0; i < causeSkillPersonnelLevTab.length; i++) {
              totalTab.push({
                value: i,
                label: i + 1 + "级岗位",
                children: subList,
              });
            }
          }
          break;
        case "11":
          {
            let subList = [];
            for (let j = 0; j < causeManPersonnelSaLvExpTab.length; j++) {
              subList.push({
                value: j,
                label: j + 1 + "级薪资",
              });
            }
            for (let i = 0; i < causeManPersonnelLevTab.length; i++) {
              totalTab.push({
                value: i,
                label: i + 1 + "级岗位",
                children: subList,
              });
            }
          }
          break;
        case "12":
          {
            let subList = [];
            for (let j = 0; j < causeWorkmanSaLvExpTab.length; j++) {
              subList.push({
                value: j,
                label: j + 1 + "级薪资",
              });
            }
            totalTab = [
              {
                value: 0,
                label: "技术工1级",
                children: subList,
              },
              {
                value: 1,
                label: "技术工2级",
                children: subList,
              },
              {
                value: 2,
                label: "技术工3级",
                children: subList,
              },
              {
                value: 3,
                label: "技术工4级",
                children: subList,
              },
              {
                value: 4,
                label: "技术工5级",
                children: subList,
              },
              {
                value: 5,
                label: "普通工",
                children: subList,
              },
            ];
          }
          break;
      }

      //
      return totalTab;
    });

    // 退休补贴指数表
    let retireExpTab = reactive([
      [5500, 1.881],
      [5450, 1.8614],
      [5400, 1.8417],
      [5350, 1.8221],
      [5300, 1.8025],
      [5250, 1.7829],
      [5200, 1.7632],
      [5150, 1.7436],
      [5100, 1.724],
      [5050, 1.7044],
      [5000, 1.6847],
      [4950, 1.6651],
      [4900, 1.6455],
      [4850, 1.6259],
      [4800, 1.6062],
      [4750, 1.5866],
      [4700, 1.567],
      [4650, 1.5474],
      [4600, 1.5277],
      [4550, 1.5081],
      [4500, 1.4885],
      [4450, 1.4689],
      [4400, 1.4492],
      [4350, 1.4296],
      [4300, 1.41],
      [4250, 1.3904],
      [4200, 1.3707],
      [4150, 1.3511],
      [4100, 1.3315],
      [4050, 1.3119],
      [4000, 1.2922],
      [3950, 1.2726],
      [3900, 1.253],
      [3850, 1.2334],
      [3800, 1.2137],
      [3750, 1.1941],
      [3700, 1.1745],
      [3650, 1.1549],
      [3600, 1.1352],
      [3550, 1.1156],
      [3500, 1.096],
      [3450, 1.0764],
      [3400, 1.0567],
      [3350, 1.0371],
      [3300, 1.0175],
      [3250, 0.9979],
      [3200, 0.9782],
      [3150, 0.9586],
      [3100, 0.939],
      [3050, 0.9193],
      [3000, 0.8997],
      [2950, 0.8801],
      [2900, 0.8605],
      [2850, 0.8408],
      [2800, 0.8212],
      [2750, 0.8016],
      [2700, 0.782],
      [2650, 0.7623],
      [2600, 0.7427],
      [2550, 0.7231],
      [2500, 0.7035],
      [2450, 0.6838],
      [2400, 0.6642],
      [2350, 0.6446],
      [2300, 0.625],
      [2250, 0.6053],
      [2200, 0.5857],
      [2150, 0.5661],
      [2100, 0.5465],
      [2050, 0.5268],
      [2000, 0.5072],
      [1950, 0.4876],
      [1900, 0.468],
      [1850, 0.4483],
      [1800, 0.4287],
      [1750, 0.4091],
      [1700, 0.3895],
      [1650, 0.3698],
      [1600, 0.3502],
      [1550, 0.3306],
      [1500, 0.311],
      [1450, 0.2913],
      [1400, 0.2717],
      [1350, 0.2521],
      [1300, 0.2325],
      [1250, 0.2128],
      [1200, 0.1932],
      [1150, 0.1736],
      [1100, 0.154],
      [1050, 0.1343],
      [1000, 0.1147],
      [950, 0.0951],
      [900, 0.0755],
    ]);

    let workTimeSum = ref(0);
    //工作时间选择器的改变事件
    let selectTime = () => {
      form.archivesDate = "";
      workTimeSum.value = 0;
      form.jobAvgSalay = [];
      if (form.workTime != null) {
        let millisecond =
          form.workTime[1].getTime() - form.workTime[0].getTime();
        let month = millisecond * 3.8026486208333e-10;
        workTimeSum.value = Math.round(month + 1);
        console.log(month);
      }
    };

    //岗平均工资
    let selectArchivesDat = () => {
      if (
        form.archivesDate != null &&
        form.archivesDate.length != 0 &&
        form.workTime != null &&
        form.workTime.length != 0 &&
        form.archivesDate.getFullYear.toString() > "1998"
      ) {
        form.asTollMonth = Math.round(
          (form.archivesDate.getTime() - form.workTime[0].getTime()) *
            3.8026486208333e-10
        );

        // 实际缴费时间
        form.actualToll = workTimeSum.value - form.asTollMonth;
        let averageSalaryList = [];
        // if (averageSalaryList == null || averageSalaryList.length == 0) {
        openDB("pension", "1").then((db) => {
          form.jobAvgSalay = [];
          cursorGetData(db, "averageSalary", function (cursor) {
            if (cursor) {
              // 必须要检查
              // while (

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
                console.log(111);
                cursor.continue(); // 遍历了存储对象中的所有内容
                averageSalaryList.push(cursor.value);
              } else {
                cursor.continue();
              }
            } else {
              // console.log("游标读取的数据：", averageSalaryList);
              // 一维数组变成二维数组
              let subItem = [];
              let i = 0;
              for (; i < averageSalaryList.length - 1; i++) {
                if (
                  averageSalaryList[i].year.slice(0, 4) ==
                    averageSalaryList[i + 1].year.slice(0, 4) &&
                  averageSalaryList[i].averageSalary ==
                    averageSalaryList[i + 1].averageSalary
                ) {
                  subItem.push(averageSalaryList[i]);
                } else {
                  subItem.push(averageSalaryList[i]);
                  form.jobAvgSalay.push({
                    year: subItem[0].year.slice(0, 4),
                    subList: subItem,
                    subItem: 0,
                    monthAveSal: null,
                    monthMin: 1,
                    monthMax: subItem.length,
                    averageSalary: subItem[0].averageSalary,
                    month: subItem.length,
                  });
                  subItem = [];
                }
              }
              subItem.push(averageSalaryList[i]);
              form.jobAvgSalay.push({
                year: subItem[0].year.slice(0, 4),
                subList: subItem,
                subItem: 0,
                monthAveSal: null,
                monthMin: 1,
                monthMax: subItem.length,
                averageSalary: subItem[0].averageSalary,
                month: subItem.length,
              });
              subItem = [];
              if (person_type_select_value.value == "2") {
                for (let i = 0; i < form.jobAvgSalay.length; i++) {
                  if (
                    form.jobAvgSalay[i].year == 2017 ||
                    form.jobAvgSalay[i].year == 2018
                  ) {
                    form.jobAvgSalay[i].averageSalary = 4491;
                  }
                }
              }
              // console.log("tolList", form.jobAvgSalay);
            }
          });
        });
        // }
      }
    };

    // 月份改变后
    let oldMonth = 12;
    let reviseTollMonth = (index, value) => {
      console.log("当前输入的月" + value.month);
      if (value.month >= 1 && value.month < oldMonth) {
        form.jobAvgSalay[index].monthMax = value.month;

        form.jobAvgSalay.splice(index + 1, 0, {
          year: value.year,
          averageSalary: value.averageSalary,
          month: oldMonth - value.month,
          monthAveSal: null,
          subItem: value.subItem + 1,
          monthMin: 1,
          monthMax: oldMonth - value.month,
        });
      } else {
        // jobAvgSalay[index].month = value.month;
      }
    };
    let focusEvent = (value) => {
      oldMonth = value.month;
      console.log("旧的月" + oldMonth);
    };

    // 输入本人的平均工资后
    let avgSalayInptEvn = () => {
      let i = 0;
      let actualTollexpSum = 0;
      for (i = 0; i < form.jobAvgSalay.length; i++) {
        if (form.jobAvgSalay[i].monthAveSal == null) {
          break;
        }
        actualTollexpSum +=
          (form.jobAvgSalay[i].monthAveSal /
            form.jobAvgSalay[i].averageSalary) *
          form.jobAvgSalay[i].month;
      }
      if (i == form.jobAvgSalay.length) {
        form.actualTollexp = actualTollexpSum / form.actualToll;
        console.log(form.jobAvgSalay);
      }
    };

    watch(
      [() => form.asTollexp, () => form.actualTollexp],
      ([asTollexp, actualTollexp]) => {
        console.log(
          "视同缴费指数" + asTollexp + "实际缴费指数" + actualTollexp
        );
        if (
          asTollexp != null &&
          actualTollexp != null &&
          asTollexp != 0 &&
          actualTollexp != 0
        ) {
          form.avgTollexp =
            (asTollexp * form.asTollMonth + actualTollexp * form.actualToll) /
            workTimeSum.value;
        }
      },
      {
        // 页面加载会先执行一次
        immediate: true,
      }
    );

    let retireSubsidyExp = ref();
    let retireSubsidyStad = ref();
    let retireSubsidyExpOpt = computed(function () {
      let tableData = [];
      for (let i = 0; i < retireExpTab.length; i++) {
        tableData.push({
          value: i + 1 + "档",
          exp: retireExpTab[i][1],
          SubsidyStd: retireExpTab[i][0],
        });
      }
      return tableData;
    });
    // 两指数之和
    let expSum = 0;
    // 查找视同缴费指数
    const position_handleChange = (value) => {
      console.log(
        "退休补贴选择器：" +
          retireSubsidyExp.value +
          "\n岗位薪资选择器" +
          value.length
      );
      expSum = 0;
      retireSubsidyExp.value = "";
      form.asTollexp = "";
      switch (person_type_select_value_sum.value) {
        case "00":
          // 算公务员的视同指数
          {
            if (value.length != 1) {
              expSum =
                cicvlPostExpTab[value[0]][value[1]] +
                cicvlServantExpTab[value[2]][value[3]];
              console.log(
                cicvlPostExpTab[value[0]][value[1]] +
                  "  " +
                  cicvlServantExpTab[value[2]][value[3]]
              );
            } else {
              expSum = cicvlPostExpTab[value][0];
              console.log(cicvlPostExpTab[value][0]);
            }
          }
          break;
        case "010":
          // 算机关技术工人的视同指数
          {
            expSum =
              agencyWorkerSkillLevelTab[value[0]] +
              agencySkillWorkerTab[value[0]][value[1]];
            console.log(
              agencyWorkerSkillLevelTab[value[0]] +
                "   " +
                agencySkillWorkerTab[value[0]][value[1]]
            );
          }
          break;
        case "011":
          // 算普通机关工人的视同指数
          {
            expSum = agencyOrdinaryWorkerTab[value];
            console.log(agencyOrdinaryWorkerTab[value]);
          }
          break;
        case "10":
          // 算事业专技的视同指数
          {
            expSum =
              causeSkillPersonnelLevTab[value[0]] +
              causeSkillPersonnelSaLvExpTab[value[1]];
            console.log(
              causeSkillPersonnelLevTab[value[0]] +
                " " +
                causeSkillPersonnelSaLvExpTab[value[1]]
            );
          }
          break;
        case "11":
          // 算事业管理的视同指数
          {
            expSum =
              causeManPersonnelLevTab[value[0]] +
              causeManPersonnelSaLvExpTab[value[1]];
            console.log(
              causeManPersonnelLevTab[value[0]] +
                " " +
                causeManPersonnelSaLvExpTab[value[1]]
            );
          }
          break;
        case "12":
          // 算事业工人的视同指数
          {
            expSum =
              causeWorkmanLevTab[value[0]] + causeWorkmanSaLvExpTab[value[1]];
            console.log(
              causeWorkmanLevTab[value[0]] +
                " " +
                causeWorkmanSaLvExpTab[value[1]]
            );
          }
          break;
        case "2":
          // 算企业的视同指数
          {
            expSum = 1;
          }
          break;
      }
    };

    // 退休缴费指数的点击事件
    let retireSubsidyExpHandleChange = (value) => {
      // retireSubsidyStad.value = retireExpTab[value];
      form.asTollexp = expSum + value;
      console.log(value);
    };

    //删除crad
    let delSubReviseTollMonth = (index, value) => {
      form.jobAvgSalay[index - 1].month += value.month;
      form.jobAvgSalay[index - 1].monthMax = form.jobAvgSalay[index - 1].month;
      form.jobAvgSalay.splice(index, 1);
    };

    //清除数据
    let clearData = () => {
      form.workTime = [];
      workTimeSum.value = 0;
      form.asTollMonth = 0;
      form.actualToll = null;
      form.archivesDate = "";
      form.jobAvgSalay = [];
      form.avgTollexp = 0;
      form.actualTollexp = 0;
      form.asTollexp = 0;
    };

    return {
      avgSalayInptEvn,
      delSubReviseTollMonth,
      focusEvent,
      reviseTollMonth,
      clearData,
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
      person_type_select_value_sum,
      agencyWorkerSkillLevelTabOpt,
      agencyOrdinarySkillLevelTabOpt,
      causeWorkmanLevAndSalSc,
      retireSubsidyExpOpt,
      retireSubsidyExp,
      retireSubsidyExpHandleChange,
      retireSubsidyStad,
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
