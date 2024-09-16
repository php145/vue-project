<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          router
          text-color="#fff"
        >
          <router-link to="/">
            <el-menu-item index="/">
              <span>首页</span>
            </el-menu-item>
          </router-link>
          <router-link to="/AverageSalary">
            <el-menu-item index="/AverageSalary">
              <span>省岗平均工资管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>养老金计算器</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  setup() {
    return {};
  },
};
</script>

<style scoped>
.el-container {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.el-form {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
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

.el-menu-vertical-demo {
  height: 100%;
}
</style>
