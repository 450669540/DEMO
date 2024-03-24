import { execSync } from "child_process";
import path from "path";

const setting = {
  urlCheck: false,
  // TODO:
  es6: false,
  postcss: false,
  preloadBackgroundData: false,
  minified: true,
  minifyWXML: true,
  newFeature: true,
  autoAudits: false,
  coverView: true,
  showShadowRootInWxmlPanel: false,
  scopeDataCheck: false,
  useCompilerModule: false,
  babelSetting: {
    ignore: [],
    disablePlugins: [],
    outputPath: "",
  },
  condition: false,
  ignoreUploadUnusedFiles: true,
  enhance: true,
};

export const weappConfig = {
  //自己的测试环境
  default: {
    appid: "wx43f3ae8aca9565e6",
    privateKeyPath: "config/key/private.wx43f3ae8aca9565e6.key",
    setting,
  },
  // 最美婚礼册 测试环境
  test: {
    appid: "wx43f3ae8aca9565e6",
    privateKeyPath: "config/key/private.wx43f3ae8aca9565e6.key",
    setting,
  },
  // 最美婚礼册 线上环境
  online: {
    appid: "wx43f3ae8aca9565e6",
    privateKeyPath: "config/key/private.wx43f3ae8aca9565e6.key",
    setting,
  },
};

/**
 * @typedef { import("@tarojs/plugin-mini-ci").CIOptions } CIOptions
 * @type {CIOptions}
 */
//  https://github.com/NervJS/taro/tree/next/packages/taro-plugin-mini-ci
export const CIPluginOptFn = async (result, { test, online, robot }) => {
  let weapp = weappConfig.default;
  let suffix = "";

  if (test) {
    weapp = weappConfig.test;
    suffix = " - test";
  }
  if (online) {
    weapp = weappConfig.online;
    suffix = " - online";
  }
  weapp = { ...weapp, robot };
  console.log(result, weapp, "CIPluginOptFn", robot);

  let version = "1.0.0";
  let desc = "版本描述";
  try {
    const packageConfig = require(path.join(__dirname, "../package.json"));
    const gitCommitHash = execSync("git rev-parse --short HEAD", {
      cwd: path.join(__dirname, "../"),
    })
      .toString()
      .trim();
    version = packageConfig.version;

    // 获取项目的 git 仓库、获取不到获取全局的 user.name
    const getUsername = (gitConfig = "git config user.name") => {
      let username = "默认";
      try {
        username = execSync(gitConfig, {
          // stdio: 'pipe',
          cwd: path.join(__dirname, "../"),
        })
          .toString()
          .trim();
      } catch (e) {
        console.warn(`${gitConfig} 获取失败`, e);
        username = getUsername("git config --global user.name");
      }
      return username;
    };

    desc = `v${
      packageConfig.version
    } - ${gitCommitHash} - by@${getUsername()}${suffix}`;
  } catch (e) {
    console.error("获取版本号和 git hash 失败，请检查", e);
  }
  return {
    // appid	string	小程序/小游戏项目的 appid
    // privateKeyPath	string	私钥文件在项目中的相对路径，在获取项目属性和上传时用于鉴权使用
    // devToolsInstallPath	string	微信开发者工具安装路径，如果你安装微信开发者工具时选的默认路径，则不需要传入此参数
    // projectPath	string	上传的小程序的路径（默认取的 outputPath ）
    // ignores	string[]	上传需要排除的目录(选填)
    weapp,
    tt: {
      email: "字节小程序邮箱",
      password: "字节小程序密码",
    },
    alipay: {
      appId: "支付宝小程序appId",
      toolId: "工具id",
      privateKeyPath:
        "密钥文件相对项目根目录的相对路径，例如 key/pkcs8-private-pem",
    },
    swan: {
      token: "鉴权需要的token令牌",
    },
    // 版本号
    version: version,
    // 版本发布描述
    desc: desc,
  };
};
