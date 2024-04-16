import React, { useRef, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Image, Swiper, SwiperItem, Text, View } from "@tarojs/components";
import "./index.less";
import Icon from "../Icon";
import Calendar from "../Calendar";
import CountDownComponent from "../CountDownComponents";
import Comment from "../Comment";

interface Props {
  template: any;
  comments: any;
  systemParams?: any;
  onAddComment: (value) => void;
}

const FlippingPages = ({
  template,
  comments,
  systemParams,
  onAddComment,
}: Props) => {
  const [flag, setFlag] = useState<boolean>(true);
  const countRef = useRef(0);

  //翻页
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const renderElement = (item, itemIndex, pageIndex) => {
    return item?.type === "singleImage" ? (
      <Image
        src={item?.images?.[0]?.url}
        className={
          currentIndex === pageIndex ? item?.images?.[0]?.animationClass : ""
        }
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
            className={
              currentIndex === pageIndex
                ? item?.images?.[0]?.animationClass
                : ""
            }
            style={image?.styles}
            mode={image?.mode}
          />
        ))}
      </View>
    ) : item?.type === "text" ? (
      <View
        style={{ ...item?.styles, writingMode: "vertical-rl" }}
        className={`${currentIndex === pageIndex ? item?.animationClass : ""} ${
          item?.class ?? ""
        }`}
      >
        <Text>{item?.value}</Text>
      </View>
    ) : item?.type === "multi" ? (
      <View style={{ ...item?.styles }} onClick={item?.onClick}>
        {item?.children?.map((child, childIndex) =>
          renderElement(child, childIndex, pageIndex)
        )}
      </View>
    ) : item?.type === "icon" ? (
      <Icon type={item?.name} style={{ ...item?.styles }} />
    ) : (
      <></>
    );
  };

  const renderComponent = (page) => {
    console.log("page_id", page?.id, template?.components);
    const currentPageComponents = template?.components?.find(
      (item) => item?.page_id === page?.id
    );
    const calendar = currentPageComponents?.list?.find(
      (component) => component?.type === "calendar"
    );
    const countDownComponent = currentPageComponents?.list?.find(
      (component) => component?.type === "countDownComponent"
    );
    return (
      <>
        {calendar && (
          <Calendar url={calendar?.url} styles={{ ...calendar?.styles }} />
        )}
        {countDownComponent && (
          <CountDownComponent
            date={countDownComponent?.value}
            styles={{ ...countDownComponent?.styles }}
          />
        )}
      </>
    );
  };
  return (
    <View>
      <Swiper
        autoplay
        interval={3000}
        duration={0}
        style={{ height: "100vh" }}
        circular
        current={currentIndex}
        onChange={(e) => {
          console.log("sss", e);
          setCurrentIndex(e?.detail?.current);
        }}
      >
        {template?.pages?.map((page, index) => (
          <SwiperItem>
            <View
              style={{
                width: "100%",
                height: "100%",
                background: page?.background,
                position: "relative",
                ...page?.styles,
              }}
            >
              {page?.list?.map((item, itemIndex) => {
                return renderElement(item, itemIndex, index);
              })}
              {renderComponent(page)}
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      {systemParams?.comment_flag && (
        <Comment comments={comments} onAddComment={onAddComment} />
      )}
    </View>
  );
};
export default FlippingPages;
