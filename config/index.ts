/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-02-06 15:40:30
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-02-20 16:21:19
 * @FilePath: /DEMO/config/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from "path";
import minimist from "minimist";
import dotenv from "dotenv";
import { CIPluginOptFn } from "./CIPluginOptFn";

const params = process.argv.slice(2);
const paramsDefault = {
  default: {
    online: false,
    test: false,
    report: false,
  },
};
const {
  online = false,
  test = false,
  report = false,
  robot = 1,
} = minimist(params, paramsDefault);

const outputRoot = `dist/${process.env.NODE_ENV}/${process.env.TARO_ENV}`;

let envPath = ".env";

if (test) {
  envPath = ".env.test";
}
if (online) {
  envPath = ".env.online";
}

const result = dotenv.config({
  path: envPath,
});

if (result.error) {
  throw result.error;
}

const config = {
  projectName: "myApp",
  date: "2021-9-3",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot,
  plugins: [
    [
      "@tarojs/plugin-mini-ci",
      async () => CIPluginOptFn(result, { test, online, robot }),
    ],
  ],
  defineConstants: {
    API_SERVER_URL: JSON.stringify(result.parsed?.API_SERVER_URL),
    API_VERSION: JSON.stringify("v1"),
    __DEV__: JSON.stringify(process.env.NODE_ENV === "development"),
  },
  copy: {
    patterns: [],
    options: {},
  },
  alias: {
    // 常量
    "@": path.resolve(__dirname, "..", "src"),
    "@/router": path.resolve(__dirname, "..", "src/router"),
    "@/const": path.resolve(__dirname, "..", "src/const"),
    "@@": path.resolve(__dirname, "..", "src/components"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/types": path.resolve(__dirname, "..", "src/types"),
    // '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    "@/models": path.resolve(__dirname, "..", "src/models"),
    "@/services": path.resolve(__dirname, "..", "src/services"),
    "@/images": path.resolve(__dirname, "..", "src/images"),
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
