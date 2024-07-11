/*
 * @Author: zhuyingjie zhuyingjie@xueji.com
 * @Date: 2024-03-08 09:34:48
 * @LastEditors: zhuyingjie zhuyingjie@xueji.com
 * @LastEditTime: 2024-06-28 17:48:17
 * @FilePath: /xmall-mini-v3-new/src/components/ LongImage/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Image, Text, View } from "@tarojs/components";
import Taro, { PageInstance, usePageScroll } from "@tarojs/taro";
import Calendar from "../Calendar";
import CountDownComponent from "../CountDownComponents";
import Comment from "../Comment";
import Icon from "../Icon";
import AddressMap from "../AddressMap";
import { useScreenHeight } from "@/hooks/layout";
import { NOOP } from "@/utils/util";
interface Props {
  template: any;
  comments: any;
  systemParams?: any;
  isEdit?: boolean;

  onAddComment: (value) => void;
}

const LongImage = ({
  template,
  comments,
  systemParams,
  isEdit,

  onAddComment,
}: Props) => {
  const windowHeight = useScreenHeight();
  const [flag, setFlag] = useState<boolean>(true);
  const countRef = useRef(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [pageHeight, setPageHeight] = useState([]);
  const [elements, setElements] = useState([]);
  usePageScroll((res) => {
    setScrollTop(res?.scrollTop);
  });

  useEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery();
      query
        .select(`#container`)
        .boundingClientRect((rect) => {
          let height = rect.height;
          console.log(height);
          Taro.pageScrollTo({
            selector: "#container",
            scrollTop: height,
            duration: 80000,
            complete: () => {
              setFlag(false);
            },
          });
        })
        .exec();

      for (let i = 1; i <= 10; i++) {
        // 假设N是元素的总数
        query
          .select(`#element_${i}`)
          .boundingClientRect((rect) => {
            if (rect) {
              let { height, top } = rect;
              console.log(height, top);

              setElements((prev) => {
                const newArr = [...prev];
                const index = newArr.findIndex(
                  (element) => element?.id === `element_${i}`
                );
                if (index === -1) {
                  newArr.push({
                    id: `element_${i}`,
                    show: true,
                    height:
                      newArr?.length === 0
                        ? height
                        : newArr?.[newArr?.length - 1]?.height + height,
                    top:
                      newArr?.length === 0
                        ? top
                        : newArr?.[newArr?.length - 1]?.height + top,
                  });
                }

                return newArr;
              });
            }
          })
          .exec();
      }

      // template?.pages?.forEach((page, index) => {
      //   query.select(`#page_${page?.id}`).boundingClientRect((rect) => {
      //     let height = rect.height;
      //     console.log(height);

      //     setPageHeight((prev) => {
      //       const newPageHeight = [...prev];
      //       newPageHeight.push(
      //         newPageHeight?.length === 0
      //           ? height
      //           : newPageHeight?.[newPageHeight?.length - 1] + height
      //       );
      //       console.log("newPageHeight", newPageHeight);
      //       return newPageHeight;
      //     });
      //   });
      // });

      // Taro.createIntersectionObserver(
      //   Taro.getCurrentInstance().page as PageInstance,
      //   {
      //     thresholds: [0, 1],
      //     observeAll: true,
      //   }
      // )
      //   .relativeToViewport()
      //   .observe("#container", (res) => {
      //     console.log(res);
      //   });
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
    let showAnimation = false;
    const element = elements?.find(
      (element) => element?.id === (item?.id ?? item?.images?.[0]?.id)
    );

    if (scrollTop + windowHeight > element?.top) {
      showAnimation = true;
    }
    return item?.type === "singleImage" ? (
      <Image
        id={item?.images?.[0]?.id}
        src={item?.images?.[0]?.url}
        className={showAnimation && (item?.images?.[0]?.animationClass ?? "")}
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
            id={image?.id}
            src={image?.url}
            className={
              showAnimation && (item?.images?.[0]?.animationClass ?? "")
            }
            style={image?.styles}
            mode={image?.mode}
          />
        ))}
      </View>
    ) : item?.type === "text" ? (
      <View
        id={item?.id}
        style={item?.styles}
        className={showAnimation && (item?.animationClass ?? "")}
      >
        <Text>{item?.value}</Text>
      </View>
    ) : item?.type === "multi" ? (
      <View
        style={{ ...item?.styles }}
        className={item?.class}
        onClick={(e) => {
          e.stopPropagation();
          console.log("点击", item);
          if (item?.functionType === "phoneCall") {
            Taro.makePhoneCall({
              phoneNumber: item?.phoneNumber,
            });
          }
        }}
      >
        {item?.children?.map((child) => renderElement(child, showAnimation))}
      </View>
    ) : item?.type === "icon" ? (
      <Icon type={item?.name} style={{ ...item?.styles }} />
    ) : (
      <></>
    );
  };

  const renderComponent = (page) => {
    // console.log("page_id", page?.id, template?.components);
    const currentPageComponents = template?.components?.find(
      (item) => item?.page_id === page?.id
    );
    const calendar = currentPageComponents?.list?.find(
      (component) => component?.type === "calendar"
    );
    const countDownComponent = currentPageComponents?.list?.find(
      (component) => component?.type === "countDownComponent"
    );
    const addressComponent = currentPageComponents?.list?.find(
      (component) => component?.type === "address"
    );
    return (
      <>
        {calendar && (
          <Calendar
            isEdit={isEdit}
            url={calendar?.url}
            value={calendar?.value}
            weekType={calendar?.weekType}
            bottomLine={calendar?.bottomLine}
            styles={{ ...calendar?.styles }}
          />
        )}
        {countDownComponent && (
          <CountDownComponent
            isEdit={isEdit}
            date={countDownComponent?.value}
            styles={{ ...countDownComponent?.styles }}
            childStyles={{ ...countDownComponent?.childStyles }}
          />
        )}
        {addressComponent && (
          <AddressMap
            isEdit={isEdit}
            styles={{ ...addressComponent?.styles }}
            address={template?.address}
            latitude={template?.lat}
            longitude={template?.lng}
            hotelName={template?.hotel_name}
            firstLineText={addressComponent?.firstLineText}
            secondLineText={addressComponent?.secondLineText}
            firstLineStyles={addressComponent?.firstLineStyles}
            secondLineStyles={addressComponent?.secondLineStyles}
            onChangeAddressInfo={(info) => {
              console.log(info);
            }}
          />
        )}
      </>
    );
  };

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
        onClick={() => {
          console.log("onClick");

          if (!flag) {
            const query = Taro.createSelectorQuery();
            query
              .select(`#container`)
              .boundingClientRect((rect) => {
                let height = rect.height;
                console.log(height);
                Taro.pageScrollTo({
                  selector: "#container",
                  scrollTop: height,
                  duration: 30000,
                  // complete: () => {

                  // },
                });
              })
              .exec();
            setFlag(true);
          }
        }}
        // onClick={handleClick}
      >
        {template?.pages?.map((page, index) => {
          const nextPageHeight = index === 0 ? 0 : pageHeight?.[index - 1];
          const currentPageHeight = pageHeight?.[index];
          let showAnimation = false;
          if (scrollTop > nextPageHeight && scrollTop < currentPageHeight) {
            console.log("显示第", index + 1);
            showAnimation = true;
          }
          return (
            <View
              id={`page_${page.id}`}
              style={{
                width: "100%",
                height: "100%",
                background: page?.background,
                position: "relative",
              }}
            >
              {page?.list?.map((item, index) => {
                return renderElement(item, showAnimation);
              })}
              {renderComponent(page)}
            </View>
          );
        })}

        {/* {calendarData && <Calendar url={calendarData?.url} />}
        {countDownComponentData && (
          <CountDownComponent date={countDownComponentData?.value} />
        )} */}
      </View>

      {systemParams?.comment_flag && (
        <Comment comments={comments} onAddComment={onAddComment} />
      )}
    </View>
  );
};
export default LongImage;
