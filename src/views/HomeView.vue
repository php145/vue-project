<template>
  <div class="common-layout">
    <el-container>
      <el-header>养老金计算器</el-header>
      <el-main>
        <el-form :model="form" label-width="100px" size = "mini"  >
          <el-row type="flex">
            <el-col :spen="12">
              <el-form-item label="姓名">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>
              <el-col :spen="12">
              <el-form-item label="退休时间">
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="退休时间"
                    :size="size"
                  />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// do not use same name with ref
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
const size = ref<'default' | 'large' | 'small'>('default')

const value1 = ref('')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

</script>

<style>
  .el-container{
    margin: 0;
    padding: 0;
    height: 100vh;
  }

  .el-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

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
