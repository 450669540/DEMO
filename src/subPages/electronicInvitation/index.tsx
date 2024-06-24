/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-03 15:08:21
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-24 14:03:38
 * @FilePath: /DEMO/src/pages/electronicInvitation/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import Taro, { useDidHide, useRouter, useUnload } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import {
  Image,
  ScrollView,
  Text,
  View,
  PageContainer as Dialog,
} from "@tarojs/components";
import { Like, Phone } from "@taroify/icons";
import "./index.scss";
import FlippingPages from "@/components/FlippingPages";
import LongImage from "@/components/LongImage";
import {
  commentList,
  getElectronicInvitationById,
  saveComment,
} from "@/services/electron";
import arrify from "@/utils/arrify";
import { RootState } from "@/models";
import { useSelector } from "react-redux";
import Icon from "@/components/Icon";
import { Input } from "@taroify/core";
import MusicLibrary from "@/components/MusicLibrary";
import { AtIcon } from "taro-ui";
import "./index.scss";
import AddressMap from "@/components/AddressMap";
import { electronicInvitationEditRouter } from "@/router";
const ElectronicInvitation = () => {
  const systemParams = useSelector<RootState>(
    (state) => state.system.globalParams
  );

  const [template, setTemplate] = useState();
  const [comments, setComments] = useState();

  const { params } = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const audioContext = useRef();

  const getDetail = async () => {
    const res = await getElectronicInvitationById(params?.template_id);
    if (res?.data) {
      Taro.setNavigationBarTitle({ title: res?.data?.name });
      setTemplate({
        ...res?.data,
      });
      console.log("systemParams", systemParams);
      if (systemParams?.comment_flag) {
        getCommentList(res?.data?._id);
      }
    }
  };

  const getCommentList = async (template_id) => {
    const res = await commentList(template_id);
    if (res?.data) {
      setComments(arrify(res?.data));
    }
  };
  useEffect(() => {
    // const res = JSON.stringify({
    //   id: "1",
    //   name: "喜嫁风",
    //   cover: "",
    //   type: "longImage",
    //   components: [
    //     {
    //       type: "calendar",
    //       url: "http://192.168.3.90:5010/example1_1.jpg",
    //     },
    //     {
    //       type: "countDownComponent",
    //       value: "2024-04-01",
    //     },
    //   ],
    //   pages: [
    //     {
    //       id: "1",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "singleImage",
    //           width: "100vw",
    //           height: "100vh",
    //           images: [
    //             {
    //               url: "http://192.168.3.90:5010/example1_1.jpg",
    //               styles: {
    //                 width: "100vw",
    //                 height: "100vh",
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           width: "100vw",
    //           height: "50vh",
    //           images: [
    //             {
    //               url: "http://image109.360doc.com/DownloadImg/2018/08/1318/141247485_16_20180813064528834.gif",
    //               styles: {
    //                 width: "100vw",
    //                 height: "100vh",
    //                 position: "absolute",
    //                 top: 0,
    //                 left: 0,
    //               },
    //             },
    //           ],
    //           url: "",
    //           margin: "24rpx",
    //           borderRaduis: "16rpx",
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             position: "absolute",
    //             top: "30rpx",
    //             display: "flex",
    //             alignItems: "center",
    //             flexDirection: "column",
    //             color: "#FFE8B6",
    //             width: "100%",
    //           },
    //           children: [
    //             {
    //               type: "text",
    //               value: "我们结婚了",
    //               styles: {
    //                 fontSize: "28rpx",
    //               },
    //             },
    //             {
    //               type: "text",
    //               value: "囍",
    //               styles: {
    //                 fontSize: "80rpx",
    //               },
    //             },
    //             {
    //               type: "text",
    //               value: "OUR WEDDING",
    //               styles: {
    //                 fontSize: "48rpx",
    //                 fontStyle: "italic",
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "2",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             display: "flex",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //             padding: "20rpx 28rpx 100rpx 28rpx",
    //             color: "#C4C4C4",
    //           },
    //           children: [
    //             {
    //               type: "multi",
    //               value: "",
    //               styles: {
    //                 display: "flex",
    //                 flexDirection: "column",
    //               },
    //               children: [
    //                 {
    //                   type: "text",
    //                   value: "Like you",
    //                   styles: {
    //                     color: "#cf000b",
    //                     fontSize: "48rpx",
    //                     fontFamily: "Adorable",
    //                   },
    //                 },
    //                 {
    //                   type: "text",
    //                   value: "We got merried",
    //                   styles: {
    //                     fontSize: "16rpx",
    //                   },
    //                 },
    //               ],
    //             },
    //             {
    //               type: "text",
    //               value: `I would rather share one lifetime with you than face all the ages
    //               of this world alone.`,
    //               styles: {
    //                 fontSize: "16rpx",
    //                 width: "260rpx",
    //                 textAlign: "right",
    //               },
    //             },
    //           ],
    //         },

    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           width: "100vw",
    //           height: "50vh",
    //           images: [
    //             {
    //               url: "http://192.168.3.90:5010/example1_2.jpg",
    //               styles: {
    //                 width: "100vw",
    //                 height: "100vw",
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             display: "flex",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //             padding: "20rpx 28rpx 60rpx 28rpx",
    //             color: "#C4C4C4",
    //           },
    //           children: [
    //             {
    //               type: "text",
    //               value: `I would rather share one lifetime with you than face all the ages
    //                   of this world alone.`,
    //               styles: {
    //                 fontSize: "16rpx",
    //                 width: "180rpx",
    //                 textAlign: "left",
    //               },
    //             },
    //             {
    //               type: "text",
    //               value: "Our wedding",
    //               styles: {
    //                 color: "#cf000b",
    //                 fontSize: "24rpx",
    //               },
    //             },
    //             {
    //               type: "text",
    //               value: `I would rather share one lifetime with you than face all the ages
    //                   of this world alone.`,
    //               styles: {
    //                 fontSize: "16rpx",
    //                 width: "180rpx",
    //                 textAlign: "right",
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "3",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           width: "100vw",
    //           height: "50vh",
    //           images: [
    //             {
    //               url: "http://192.168.3.90:5010/example1_3.jpg",
    //               styles: {
    //                 width: "86vw",
    //                 margin: "0 7vw",
    //               },
    //               mode: "widthFix",
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             margin: "60rpx 0",
    //           },
    //           children: [
    //             {
    //               type: "text",
    //               value: `MY LOVE`,
    //               styles: {
    //                 color: "#cf000b",
    //                 fontSize: "80rpx",
    //                 fontFamily: "Adorable",
    //               },
    //             },
    //             {
    //               type: "text",
    //               value: " - 我 十 分 爱 你 -",
    //               styles: {
    //                 fontSize: "26rpx",
    //                 marginTop: "10rpx",
    //               },
    //             },
    //             {
    //               type: "other",
    //               element: (
    //                 <Like
    //                   style={{
    //                     color: "#A11E18",
    //                     marginTop: "80rpx",
    //                     marginBottom: "40rpx",
    //                   }}
    //                 />
    //               ),
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             position: "relative",
    //           },
    //           children: [
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "http://192.168.3.90:5010/example1_4.jpg",
    //                   styles: {
    //                     width: "90vw",
    //                     margin: "0 5%",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "multi",
    //               value: "",
    //               styles: {
    //                 width: "100%",
    //                 display: "flex",
    //                 justifyContent: "center",
    //               },
    //               children: [
    //                 {
    //                   type: "multi",
    //                   value: "",
    //                   styles: {
    //                     position: "absolute",
    //                     bottom: "24rpx",
    //                     borderRadius: "16rpx",
    //                     background: "#A11E18",
    //                     color: "#fff",
    //                     padding: "14rpx 20rpx",
    //                     display: "flex",
    //                     justifyContent: "center",
    //                     alignItems: "center",
    //                   },
    //                   onClick: () => {
    //                     Taro.makePhoneCall({
    //                       phoneNumber: "14565656555",
    //                     });
    //                   },
    //                   children: [
    //                     {
    //                       type: "other",
    //                       element: <Phone size={18} />,
    //                     },
    //                     {
    //                       type: "text",
    //                       value: " 联系新人",
    //                       styles: {
    //                         fontSize: "28rpx",
    //                         marginLeft: "16rpx",
    //                       },
    //                     },
    //                   ],
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });
    // setTemplate({
    //   id: "1",
    //   name: "爱在此时",
    //   cover: "",
    //   type: "longImage",
    //   create_name: "朱莹洁", //创建者

    //   start_on: "2024-07-14 12:08:00", // 请柬时间

    //   address: "浙江省宁波市北仑区昆亭燕湾村活动中心", //请柬地址

    //   title: "刘科龙&朱莹洁", //请柬标题
    //   audio_path:
    //     //"https://qnvideo.hunliji.com/o_1haivr705g25tiv19band3qrh9.mp3",
    //     "https://www.ihaoge.net/server/1/308186559.mp3",
    //   lat: 29.798702,
    //   lng: 121.923446,
    //   components: [
    //     {
    //       page_id: "4",
    //       list: [
    //         {
    //           type: "calendar",
    //           weekType: "English",
    //           bottomLine: false,
    //           styles: {
    //             color: "#704B30",
    //             itemColor: "#333",
    //             weekColor: "#704B30",
    //           },
    //           value: "2024-07-14 12:08:00",
    //         },
    //       ],
    //     },
    //     {
    //       page_id: "6",
    //       list: [
    //         {
    //           type: "countDownComponent",
    //           value: "2024-07-14",

    //           styles: {
    //             marginTop: "80px",
    //           },
    //           childStyles: {
    //             backgroundColor: "#AA866A",
    //           },
    //         },
    //         {
    //           type: "address",
    //           firstLineText: "敬备喜酌 恭候莅临",
    //           firstLineStyles: { color: "#AA866A", fontSize: "44rpx" },
    //           secondLineText: " WELCOME TO OUR WEDDING",
    //           secondLineStyles: { color: "#AA866A", fontSize: "30rpx" },
    //           styles: {
    //             marginTop: "40px",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    //   pages: [
    //     {
    //       id: "1",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             position: "relative",
    //           },
    //           class: "gradient-img",
    //           children: [
    //             {
    //               type: "singleImage",
    //               width: "100vw",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A010000_%E5%89%AF%E6%9C%AC.png",
    //                   styles: {
    //                     width: "100vw",
    //                     height: "100vh",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           width: "100vw",
    //           height: "50vh",
    //           images: [
    //             {
    //               url: "https://www.beautifulwedding.cn/FtOOm-iICLJtfFjCRMN7cLE65gBQ.jpg",
    //               styles: {
    //                 width: "100vw",
    //                 height: "78vh",
    //                 position: "absolute",
    //                 top: 0,
    //                 left: 0,
    //               },
    //             },
    //           ],
    //           url: "",
    //           margin: "24rpx",
    //           borderRaduis: "16rpx",
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             position: "absolute",
    //             top: "360px",
    //           },

    //           children: [
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://www.beautifulwedding.cn/Fl8XSk1IllFXLsKKNXIUeRNlfxJp.svg",
    //                   styles: {
    //                     width: "40px",
    //                     height: "100vw",

    //                     marginLeft: "45%",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },

    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://www.beautifulwedding.cn/Fgi3dl_QJVvW5Ji93xroaWzeHQDP.jpg",
    //                   styles: {
    //                     width: "100vw",
    //                     height: "100px",
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         },

    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             display: "flex",
    //             alignItems: "center",
    //             flexDirection: "row",
    //             justifyContent: "center",

    //             width: "100%",
    //             fontSize: "48rpx",
    //             marginTop: "66px",
    //             fontFamily: "FZS3K--GBK1-0",
    //           },
    //           children: [
    //             {
    //               type: "text",
    //               value: "刘科龙",
    //               styles: {
    //                 fontFamily: "FZS3K--GBK1-0",
    //               },
    //             },
    //             {
    //               type: "text",
    //               value: "&",
    //               styles: {
    //                 margin: "0 40rpx",
    //                 fontFamily: "FZS3K--GBK1-0",
    //               },
    //             },
    //             {
    //               type: "text",
    //               value: "朱莹洁",
    //               styles: {
    //                 fontFamily: "FZS3K--GBK1-0",
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           type: "text",
    //           value: "2024年7月14日 12:18",
    //           styles: {
    //             fontFamily: "FZS3K--GBK1-0",
    //             textAlign: "center",
    //             marginTop: "30px",
    //           },
    //         },
    //         {
    //           type: "text",
    //           value: "浙江省宁波市北仑区昆亭燕湾村活动中心",
    //           styles: {
    //             fontFamily: "FZS3K--GBK1-0",
    //             textAlign: "center",
    //             marginTop: "20px",
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       id: "2",
    //       background: "#fff",

    //       list: [
    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           width: "100vw",
    //           height: "50vh",

    //           images: [
    //             {
    //               url: "https://qnm.hunliji.com/Fs0HfUem7H4i4lk5JKeLTDK5Jh90",
    //               styles: {
    //                 width: "66vw",
    //                 height: "100px",
    //                 marginLeft: "17vw",
    //                 marginTop: "40px",
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             position: "relative",
    //             marginLeft: "24rpx",
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //           },

    //           children: [
    //             {
    //               type: "multi",
    //               value: "",
    //               styles: {
    //                 position: "relative",
    //               },

    //               children: [
    //                 {
    //                   type: "singleImage",
    //                   width: "100vw",
    //                   images: [
    //                     {
    //                       url: "https://www.beautifulwedding.cn/FsAtszekyyI_NAf-P8jn8FuXIX3Y.jpg",

    //                       styles: {
    //                         width: "80px",
    //                         height: "80px",
    //                       },
    //                       mode: "widthFix",
    //                     },
    //                   ],
    //                 },
    //                 {
    //                   type: "singleImage",
    //                   width: "100vw",

    //                   images: [
    //                     {
    //                       url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0086.jpg",
    //                       id: "element_1",
    //                       animationClass: "musicIcon",
    //                       styles: {
    //                         width: "60px",
    //                         height: "60px",
    //                         position: "absolute",
    //                         left: "10px",
    //                         top: "10px",
    //                         borderRadius: "50%",
    //                       },
    //                     },
    //                   ],
    //                 },
    //               ],
    //             },
    //             {
    //               type: "multi",
    //               value: "",
    //               styles: {
    //                 position: "relative",
    //                 marginLeft: "20rpx",
    //               },

    //               children: [
    //                 {
    //                   type: "text",
    //                   value: "讲故事写成我们",
    //                   styles: {
    //                     fontSize: "28rpx",
    //                   },
    //                 },
    //                 {
    //                   type: "singleImage",
    //                   width: "100vw",
    //                   images: [
    //                     {
    //                       url: "https://www.beautifulwedding.cn/FqueSBfZIMdnBCexKYsAQYLs2W6x.svg",

    //                       styles: {
    //                         width: "260px",
    //                       },
    //                       mode: "widthFix",
    //                     },
    //                   ],
    //                 },
    //               ],
    //             },
    //           ],
    //         },

    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {},
    //           children: [
    //             {
    //               type: "text",
    //               id: "element_2",
    //               animationClass: "element10",
    //               value:
    //                 "这一生 原本一个人\n你坚持 厮守成我们\n却小小声 牵着手在默认\n感动的眼神 说愿意\n走进我的人生\n进了门 开了灯 一家人\n执子之手 如此温柔\n天长地久 并肩走\n你深情 凝望着我说\n幸福 是你 有了我\n. . .",
    //               styles: {
    //                 fontFamily: "FZS3K--GBK1-0",
    //                 textAlign: "center",
    //                 letterSpacing: 2,
    //                 lineHeight: "36px",
    //                 color: "#69625D",
    //                 fontSize: "28rpx",
    //               },
    //             },
    //           ],
    //         },

    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           height: "50vh",
    //           images: [
    //             {
    //               url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0039_%E5%89%AF%E6%9C%AC.png",
    //               styles: {
    //                 width: `100vw`,
    //                 marginTop: "40px",
    //               },
    //               mode: "widthFix",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "3",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "multi",
    //           styles: {
    //             display: "flex",
    //             flexDirection: "row",
    //             margin: "0 24rpx",
    //             justifyContent: "space-between",
    //             marginTop: "40px",
    //             position: "relative",
    //           },

    //           children: [
    //             {
    //               type: "text",
    //               value:
    //                 "在这特殊的一天\n希望有你的见证\n期待有你的参与\n诚邀您\n参加我们的婚礼\n见证我们的幸福",
    //               styles: {
    //                 fontFamily: "FZS3K--GBK1-0",
    //                 textAlign: "left",
    //                 letterSpacing: 2,
    //                 lineHeight: "44px",
    //                 color: "#69625D",
    //                 fontSize: "28rpx",
    //               },
    //             },
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0038.jpg",
    //                   styles: {
    //                     width: "54vw",
    //                   },
    //                   id: "element_3",
    //                   animationClass: "element8",
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "text",
    //               value:
    //                 "There is never a time or place for true love. \nIt happens accidentally, in a heartbeat, in a single flashing, throbbing moment.",
    //               styles: {
    //                 fontFamily: "Revalinademo-L3LaE",
    //                 position: "absolute",
    //                 right: 0,

    //                 top: "271px",
    //                 width: "265px",
    //                 fontSize: "32px",
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           width: "100vw",
    //           height: "50vh",
    //           images: [
    //             {
    //               url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/1I2A0064_%E5%89%AF%E6%9C%AC.png",
    //               styles: {
    //                 width: "calc(100vw - 48rpx)",
    //                 margin: "0px 24rpx",
    //                 marginTop: "140px",
    //               },
    //               mode: "widthFix",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "4",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             marginTop: "40px",
    //             marginLeft: "24rpx",
    //           },
    //           children: [
    //             {
    //               type: "text",
    //               value:
    //                 "故事的开头，往往是两条平行线，\n是经过，是交错。\n谁向谁靠近，谁闯入了谁的故事情节，\n放弃了周遭的你你我我，\n决定了身边的从今以后。",
    //               styles: {
    //                 fontFamily: "FZS3K--GBK1-0",
    //                 textAlign: "left",

    //                 lineHeight: "50px",
    //                 color: "#69625D",
    //                 fontSize: "28rpx",
    //               },
    //             },
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",

    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://www.beautifulwedding.cn/FgLh0kM8ioeuHGA86zm-Er82jZJU.jpg",
    //                   styles: {
    //                     width: `100vw`,
    //                     position: "absolute",
    //                     top: "118px",
    //                     left: 0,
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //           ],
    //         },

    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             marginTop: "40px",
    //             margin: "0px 24rpx",
    //             display: "flex",
    //             flexDirection: "row",
    //           },
    //           children: [
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",

    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0205.jpg",
    //                   styles: {
    //                     width: `100vw`,
    //                     marginTop: "142px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "multi",
    //               value: "",
    //               styles: {
    //                 display: "flex",
    //                 flexDirection: "column",
    //               },
    //               children: [],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "5",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             margin: "0px 24rpx",
    //             marginTop: "40px",
    //             display: "flex",
    //             flexDirection: "row",
    //             justifyContent: "space-between",
    //             height: "50vh",
    //           },
    //           children: [
    //             {
    //               type: "singleImage",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0199_%E5%89%AF%E6%9C%AC.png",
    //                   styles: {
    //                     width: `44vw`,

    //                     marginTop: "60px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0205_%E5%89%AF%E6%9C%AC.png",
    //                   styles: {
    //                     width: `44vw`,

    //                     marginTop: "40px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             margin: "0px 24rpx",

    //             display: "flex",
    //             flexDirection: "row",
    //             position: "absolute",
    //             left: "-44px",
    //             top: "274px",
    //             alignItems: "center",
    //           },
    //           children: [
    //             {
    //               type: "singleImage",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "",
    //                   styles: {
    //                     width: `64px`,
    //                     height: "64px",
    //                     backgroundColor: "#DFD2C3",
    //                     borderRadius: "50%",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://www.beautifulwedding.cn/FvmWDNEFkSfthhs-_DV7BNASiOpX.svg",
    //                   styles: {
    //                     width: `88vw`,
    //                     marginLeft: "10rpx",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //           ],
    //         },

    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             display: "flex",
    //             flexDirection: "row",
    //             position: "relative",
    //           },
    //           children: [
    //             {
    //               type: "singleImage",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0207.jpg",

    //                   styles: {
    //                     width: "80vw",
    //                     margin: "100px 10vw",
    //                     zIndex: 1,
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "",
    //                   styles: {
    //                     width: `70px`,
    //                     height: "90px",
    //                     backgroundColor: "#DFD2C3",
    //                     position: "absolute",
    //                     right: 0,
    //                     top: "42px",
    //                   },
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "",
    //                   styles: {
    //                     width: `200px`,
    //                     height: "180px",
    //                     backgroundColor: "#DFD2C3",
    //                     position: "absolute",
    //                     left: 0,
    //                     bottom: "22px",
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },

    //     {
    //       id: "6",
    //       background: "#fff",
    //       list: [
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             marginTop: "40px",
    //             marginLeft: "112rpx",
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "flex-start",
    //           },
    //           children: [
    //             {
    //               type: "text",
    //               value: "诚邀您及家人\n参加\n我们的婚礼仪式\n",
    //               styles: {
    //                 fontFamily: "FZS3K--GBK1-0",
    //                 textAlign: "left",
    //                 letterSpacing: 2,
    //                 lineHeight: "36px",
    //                 color: "#69625D",
    //                 fontSize: "28rpx",
    //               },
    //             },
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://www.beautifulwedding.cn/FmphLU-IixPXR3WF--Z_pqg72DMn.svg",
    //                   styles: {
    //                     width: `59vw`,
    //                     marginTop: "40px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "singleImage",

    //           background: "#f3f4f5",
    //           height: "50vh",
    //           images: [
    //             {
    //               url: "https://www.beautifulwedding.cn/Fmd8Te7HDPO-TsVOFjp-Ob-TeFtN.jpg",
    //               styles: {
    //                 width: `100vw`,
    //                 height: "100px",
    //                 marginTop: "40px",
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             marginTop: "40px",
    //             margin: "0px 24rpx",
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //           },
    //           children: [
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0218.jpg",
    //                   styles: {
    //                     width: `59vw`,
    //                     marginTop: "40px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "multi",
    //               value: "",
    //               styles: {
    //                 display: "flex",
    //                 flexDirection: "column",
    //               },
    //               children: [
    //                 {
    //                   type: "multi",
    //                   value: "",
    //                   styles: {
    //                     display: "flex",
    //                     flexDirection: "column",
    //                   },
    //                   children: [
    //                     {
    //                       type: "text",
    //                       value: "朱莹洁",
    //                       styles: {
    //                         fontSize: "36rpx",
    //                         marginLeft: "16rpx",
    //                         color: "#85664C",
    //                         fontFamily: "FZS3K--GBK1-0",
    //                       },
    //                     },
    //                     {
    //                       type: "multi",
    //                       value: "",
    //                       styles: {
    //                         display: "flex",
    //                         flexDirection: "row",
    //                         alignItems: "center",
    //                         padding: "10rpx 20rpx",
    //                         backgroundColor: "#85664C",
    //                         borderRadius: "30rpx",
    //                         marginTop: "40px",
    //                       },
    //                       onClick: () => {
    //                         Taro.makePhoneCall({
    //                           phoneNumber: "17551095729",
    //                         });
    //                       },
    //                       children: [
    //                         {
    //                           type: "icon",
    //                           name: "icon-dianhua",
    //                           styles: { fontSize: "34rpx", color: "#fff" },
    //                         },
    //                         {
    //                           type: "text",
    //                           value: " 联系新娘",
    //                           styles: {
    //                             fontSize: "28rpx",
    //                             marginLeft: "16rpx",
    //                             color: "#fff",
    //                           },
    //                         },
    //                       ],
    //                     },
    //                   ],
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             marginTop: "40px",
    //             margin: "0px 24rpx",
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //           },
    //           children: [
    //             {
    //               type: "multi",
    //               value: "",
    //               styles: {
    //                 display: "flex",
    //                 flexDirection: "column",
    //               },
    //               children: [
    //                 {
    //                   type: "text",
    //                   value: "刘科龙",
    //                   styles: {
    //                     fontSize: "36rpx",
    //                     marginLeft: "16rpx",
    //                     color: "#85664C",
    //                     fontFamily: "FZS3K--GBK1-0",
    //                   },
    //                 },
    //                 {
    //                   type: "multi",
    //                   value: "",
    //                   styles: {
    //                     display: "flex",
    //                     flexDirection: "row",
    //                     alignItems: "center",
    //                     padding: "10rpx 20rpx",
    //                     backgroundColor: "#85664C",
    //                     borderRadius: "30rpx",
    //                     marginTop: "40px",
    //                   },
    //                   onClick: () => {
    //                     Taro.makePhoneCall({
    //                       phoneNumber: "18069252398",
    //                     });
    //                   },
    //                   children: [
    //                     {
    //                       type: "icon",
    //                       name: "icon-dianhua",
    //                       styles: { fontSize: "34rpx", color: "#fff" },
    //                     },
    //                     {
    //                       type: "text",
    //                       value: " 联系新郎",
    //                       styles: {
    //                         fontSize: "28rpx",
    //                         marginLeft: "16rpx",
    //                         color: "#fff",
    //                       },
    //                     },
    //                   ],
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0219.jpg",
    //                   styles: {
    //                     width: `59vw`,
    //                     marginTop: "40px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: "multi",
    //           value: "",
    //           styles: {
    //             marginTop: "40px",
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //           },
    //           children: [
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               // width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0213_%E5%89%AF%E6%9C%AC.png",

    //                   styles: {
    //                     width: `100vw`,
    //                     marginTop: "40px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               // width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0217.jpg",
    //                   styles: {
    //                     width: `100vw`,
    //                     marginTop: "10px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               // width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://beautifulwedding.oss-cn-hangzhou.aliyuncs.com/%E5%8E%8B%E7%BC%A9%E7%89%88%E7%B2%BE%E4%BF%AE%E5%9B%BE%E7%89%87/1I2A0216_%E5%89%AF%E6%9C%AC.png",
    //                   styles: {
    //                     width: `100vw`,
    //                     marginTop: "10px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //             {
    //               type: "singleImage",

    //               background: "#f3f4f5",
    //               // width: "100vw",
    //               height: "50vh",
    //               images: [
    //                 {
    //                   url: "https://www.beautifulwedding.cn/Fvr-CeLEwrN5UiR4STyloqZgkDvm.svg",
    //                   styles: {
    //                     width: `59vw`,
    //                     marginTop: "40px",
    //                   },
    //                   mode: "widthFix",
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // });
    getDetail();
    // setComments([
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家",
    //   },
    //   {
    //     id: "",
    //     create: "张三",
    //     content: "获国家火炬计划计划很久很久很好就好",
    //   },
    // ]);
  }, []);

  useUnload(() => {
    console.log("离开页面");
    audioContext?.current?.destroy();
  });

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = Taro.createInnerAudioContext();
      /** 循环播放 */
      audioContext.current.loop = true;
      /** 是否遵循系统静音开关,不遵循，静音模式下也可以发出声音 */
      audioContext.current.obeyMuteSwitch = false;
    }
    if (!template?.audio_path) {
      audioContext.current.stop();
    } else {
      audioContext.current.src = template?.audio_path;

      audioContext.current.play();
    }
  }, [template?.audio_path]);

  const handleAddComment = async (value) => {
    const res = await saveComment({ ...value, template_id: template?._id });
    if (res?.success) {
      getCommentList(template?._id);
    }
  };

  const handleMark = () => {
    Taro.navigateTo({
      url: electronicInvitationEditRouter(template?._id, template?._id),
    });
  };

  const handleChangeMusicPlay = () => {
    setIsPaused((prev) => !prev);
    if (!isPaused) {
      audioContext.current.pause();
    } else {
      audioContext.current.play();
    }
  };

  return (
    <PageContainer>
      <View style={{ position: "relative" }}>
        <View
          style={{
            background: "#999",
            borderRadius: "50%",
            width: "100rpx",
            height: "100rpx",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: "24rpx",
            top: "24rpx",
            zIndex: 1,
          }}
          className={!isPaused && "musicIcon"}
          onClick={handleChangeMusicPlay}
        >
          <Icon
            // type="icon-yinle1"
            type={isPaused ? "icon-yinlezanting01" : "icon-yinle1"}
            style={{ fontSize: "50rpx", color: "#fff" }}
          />
        </View>
        {template?.type === "flip" ? (
          <FlippingPages
            comments={comments}
            onAddComment={handleAddComment}
            template={template}
            systemParams={systemParams}
          />
        ) : template?.type === "longImage" ? (
          <LongImage
            template={template}
            comments={comments}
            systemParams={systemParams}
            onAddComment={handleAddComment}
          />
        ) : (
          <></>
        )}
        {/* <View
          style={{
            position: "fixed",
            bottom: "0rpx",
            width: "100%",
            paddingBottom: "60rpx",
            height: "80rpx",
            background: "#fff",
            boxShadow: "0px -4px 9px 0px rgba(0,0,0,0.05)",
            paddingTop: "20rpx",
          }}
        >
          <View
            style={{
              margin: "0 24rpx",
              display: "flex",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <AtIcon value="star" size="30" color="#f3d4a4"></AtIcon>
            <View
              style={{
                fontSize: "32rpx",
                color: "#fff",
                height: "80rpx",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f3d4a4",
                borderRadius: "16rpx",
                padding: "0 80rpx",
                width: "400rpx",
              }}
              onClick={handleMark}
            >
              去制作
            </View>
          </View>
        </View> */}
      </View>
    </PageContainer>
    // <MusicLibrary />
  );
};
export default ElectronicInvitation;
