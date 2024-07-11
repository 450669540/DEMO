/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-01-11 15:07:01
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-28 17:36:03
 * @FilePath: /xmall-mini-partner/src/app.utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Taro from "@tarojs/taro";
import { canIUseBySDKVersion } from "@/utils/wx";

export const updateApp = () => {
  if (!canIUseBySDKVersion("1.9.90")) {
    return;
  }
  const updateManager = Taro.getUpdateManager();

  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      Taro.showLoading({
        title: "更新下载中...",
      });
    }
  });

  updateManager.onUpdateReady(function () {
    Taro.hideLoading();
    Taro.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(function () {
    // 新版本下载失败
    Taro.hideLoading();
    Taro.showToast({ title: "下载失败...", icon: "none" });
  });
};

export const loadFontFace = () => {
  // console.log('loadFontFace--00', Taro.loadFontFace);
  if (!canIUseBySDKVersion("2.1.0")) {
    return;
  }
  const TaroLoadFontFace = (options: { family: string; source: string }) => {
    Taro.loadFontFace({
      global: true,
      // family: 'SourceHanSansCN',
      // source: 'url("https://sungd.github.io/Pacifico.ttf")',
      // source: 'url("https://at.alicdn.com/t/webfont_1f7b3qbimiv.eot")',
      // source: 'url("https://raw.githubusercontent.com/adobe-fonts/source-han-sans/release/Variable/TTF/SourceHanSansSC-VF.ttf")',
      // source: 'url("https://github.com/DeronW/minify-font/raw/master/dist/SourceHanSansCN-Medium.ttf")',
      // source: 'url("https://github.com/iamzhiyudong/SourceHanSansCN-TTF-Min/raw/main/min-output/SourceHanSerifCN-Regular-Min.otf")',
      // source: 'url("https://comteck-test.oss-cn-shanghai.aliyuncs.com/fonts/SourceHanSerifCN-Regular-Min.otf")',
      // source: 'url("https://comteck-test.oss-cn-shanghai.aliyuncs.com/fonts/SourceHanSansSC-Normal-Min.ttf")',
      // source:
      //   'url("https://github.com/iamzhiyudong/SourceHanSansCN-TTF-Min/raw/main/min-output/SourceHanSansSC-Normal-Min.ttf")',
      // TODO:
      // source: 'url("https://oss.xueji1992.com/fonts/SourceHanSansSC-Normal-Min.ttf")',
      ...options,
      // source: 'url("https://oss.xueji1992.com/fonts/SourceHanSansCN-Light.otf")',
      // source: 'url("https://oss.xueji1992.com/fonts/SourceHanSansCN-Bold.otf")',
      success() {},
      fail: function () {},
      complete: function (res) {},
    });
  };

  //方正标雅宋简体
  // TaroLoadFontFace({
  //   family: "FZYaSongS-R-GB",
  //   source:
  //     'url("https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/FZYaSongS-R-GB.TTF")',
  // });

  //鹭霞
  // TaroLoadFontFace({
  //   family: "LXGWWenKai-Regula",
  //   source:
  //     'url("https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/LXGWWenKai-Regular.ttf")',
  // });
  TaroLoadFontFace({
    family: "SourceHanSansCNBold",
    source: 'url("https://oss.xueji1992.com/fonts/SourceHanSansCN-Bold.otf")',
  });

  TaroLoadFontFace({
    family: "DINAlternateBold",
    source: 'url("https://oss.xueji1992.com/fonts/DINAlternateBold.ttf")',
  });
  //FZXSSK 方正博雅刊宋
  TaroLoadFontFace({
    family: "FZXSSK",
    source:
      'url("https://qnm.hunliji.com/sbft_FZXSSK_gvN-LXaVdD7SXFHWoSQJOA.ttf")',
  });

  //HYXiaoBoZheZhiTiJ
  // TaroLoadFontFace({
  //   family: "HYXiaoBoZheZhiTiJ",
  //   source:
  //     'url("https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/HYXiaoBoZheZhiTiJ.woff2")',
  // });

  //AndreaBilarosaRegular
  TaroLoadFontFace({
    family: "AndreaBilarosaRegular",
    source:
      'url("https://qnm.hunliji.com/sbft_AndreaBilarosaRegular_yH-tGf9KorumglsPE8vKaA.ttf")',
  });

  //FZLTZHUNHK--GBK1-0 方正兰亭准黑_GBK
  TaroLoadFontFace({
    family: "FZLTZHUNHK--GBK1-0",
    source:
      'url("https://qnm.hunliji.com/sbft_FZLTZHUNHK--GBK1-0_Ik9sd7wZ6RwuVJ9ocPb-vg.ttf")',
  });

  //FZS3K--GBK1-0 方正宋三_GBK
  TaroLoadFontFace({
    family: "FZS3K--GBK1-0",
    source:
      'url("https://qnm.hunliji.com/sbft_FZS3K--GBK1-0_o63T285nELES_rNeewzyGw.ttf")',
  });

  //FZSong III-Z05S 方正宋三简体
  TaroLoadFontFace({
    family: "FZSong III-Z05S",
    source:
      'url("https://qnm.hunliji.com/sbft_FZSong III-Z05S_FqzpgjtSBr_ou6QhcujPAg.ttf")',
  });

  //Revalinademo-L3LaE 方正宋三简体
  TaroLoadFontFace({
    family: "Revalinademo-L3LaE",
    source:
      'url("https://qnm.hunliji.com/sbft_Revalinademo-L3LaE_d5JnzceXH8GKTyXkVmFszw.ttf")',
  });

  TaroLoadFontFace({
    family: "FZZJ-PANYBJW",
    source:
      'url("https://qnm.hunliji.com/sbft_FZZJ-PANYBJW_3PtsUXC52MG6ICo6t2ePpg.ttf")',
  });
};
