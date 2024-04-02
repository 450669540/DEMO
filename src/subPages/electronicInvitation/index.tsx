/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-03 15:08:21
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-02 17:42:06
 * @FilePath: /DEMO/src/pages/electronicInvitation/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import PageContainer from "@/components/PageContainer";
import { Image, ScrollView, Text, View } from "@tarojs/components";
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
const ElectronicInvitation = () => {
  const [template, setTemplate] = useState();
  const [comments, setComments] = useState();

  const { params } = useRouter();

  const getDetail = async () => {
    const res = await getElectronicInvitationById(params?.template_id);
    if (res?.data) {
      Taro.setNavigationBarTitle({ title: res?.data?.name });
      setTemplate({
        ...res?.data,
      });
      //getCommentList(res?.data?._id);
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
    //               type: "icon",
    //               name: "icon-likefill",

    //               styles: {
    //                 color: "#A11E18",
    //                 marginTop: "80rpx",
    //                 marginBottom: "40rpx",
    //                 fontSize: 18,
    //               },
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
    //                       type: "icon",
    //                       name: "icon-phone-fill",
    //                       styles: { fontSize: 18 },
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

  const handleAddComment = async (value) => {
    const res = await saveComment({ ...value, template_id: template?._id });
    if (res?.success) {
      getCommentList(template?._id);
    }
  };

  return (
    <PageContainer>
      {template?.type === "flip" ? (
        <FlippingPages template={template} />
      ) : template?.type === "longImage" ? (
        <LongImage
          template={template}
          comments={comments}
          onAddComment={handleAddComment}
        />
      ) : (
        <></>
      )}
    </PageContainer>
  );
};
export default ElectronicInvitation;
