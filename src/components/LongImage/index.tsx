/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-08 09:34:48
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-04-02 17:42:41
 * @FilePath: /xmall-mini-v3-new/src/components/ LongImage/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Calendar from "../Calendar";
import CountDownComponent from "../CountDownComponents";
import Comment from "../Comment";
import Icon from "../Icon";
interface Props {
  template: any;
  comments: any;
  onAddComment: (value) => void;
}

const LongImage = ({ template, comments, onAddComment }: Props) => {
  const [flag, setFlag] = useState<boolean>(true);
  const countRef = useRef(0);

  useEffect(() => {
    setTimeout(() => {
      Taro.pageScrollTo({
        selector: "#container",
        scrollTop: 2000,
        duration: 10000,
        complete: () => {
          setFlag(false);
        },
      });
    }, 1000);
  }, []);

  const handleClick = () => {
    console.log("gjhggh");
    const query = Taro.createSelectorQuery();
    query.select("#container").boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      console.log(res);
      if (res?.[0]?.top !== 0) {
        if (flag) {
          setFlag(false);
        } else {
          setFlag(true);
          Taro.pageScrollTo({
            selector: "#container",
            scrollTop: 2000,
            duration: 10000,
            complete: () => {
              setFlag(false);
            },
          });
        }
      } else {
        if (countRef.current === 1) {
          setFlag(true);
          Taro.pageScrollTo({
            selector: "#container",
            scrollTop: 2000,
            duration: 10000,
            complete: () => {
              setFlag(false);
            },
          });
        } else {
          countRef.current = countRef.current + 1;
        }
      }
      // if(res?.[0]?.top)
    });
  };

  const renderElement = (item) => {
    return item?.type === "singleImage" ? (
      <Image
        src={item?.images?.[0]?.url}
        // className={currentIndex === index ? item?.images?.[0]?.animationClass : ''}
        style={{
          ...item?.images?.[0]?.styles,
        }}
        mode={item?.images?.[0]?.mode}
      />
    ) : item?.type === "twoInARowImage" ? (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: item?.width,
          height: item?.height,
        }}
      >
        {item?.images?.map((image) => (
          <Image
            src={image?.url}
            // className={currentIndex === index ? item?.images?.[0]?.animationClass : ''}
            style={image?.styles}
            mode={image?.mode}
          />
        ))}
      </View>
    ) : item?.type === "text" ? (
      <View
        style={item?.styles}
        //   className={currentIndex === index ? item?.animationClass : ''}
      >
        <Text>{item?.value}</Text>
      </View>
    ) : item?.type === "multi" ? (
      <View style={{ ...item?.styles }} onClick={item?.onClick}>
        {item?.children?.map((child) => renderElement(child))}
      </View>
    ) : item?.type === "icon" ? (
      <Icon type={item?.name} style={{ ...item?.styles }} />
    ) : (
      <></>
    );
  };

  const calendarData = useMemo(() => {
    const calendar = template?.components?.find(
      (component) => component?.type === "calendar"
    );
    return calendar;
  }, [template]);

  const countDownComponentData = useMemo(() => {
    const countDownComponent = template?.components?.find(
      (component) => component?.type === "countDownComponent"
    );
    return countDownComponent;
  }, [template]);

  return (
    <View style={{ position: "relative" }}>
      <View
        id="container"
        onTouchStart={() => {
          console.log("onTouchStart");
          if (flag) {
            setTimeout(() => {
              const query = Taro.createSelectorQuery();
              query.select("#container").boundingClientRect();
              query.selectViewport().scrollOffset();
              query.exec(function (res) {
                Taro.pageScrollTo({
                  selector: "#container",
                  scrollTop: Math.abs(res?.[0]?.top),
                  duration: 0,
                });
              });
            }, 100);
            setFlag(false);
          }
        }}
        onClick={handleClick}
      >
        {template?.pages?.map((page, index) => (
          <View
            style={{
              width: "100%",
              height: "100%",
              background: page?.background,
              position: "relative",
            }}
          >
            {page?.list?.map((item) => {
              return renderElement(item);
            })}
          </View>
        ))}

        {calendarData && <Calendar url={calendarData?.url} />}
        {countDownComponentData && (
          <CountDownComponent date={countDownComponentData?.value} />
        )}
      </View>

      {/* <Comment comments={comments} onAddComment={onAddComment} /> */}
    </View>
  );
};
export default LongImage;
