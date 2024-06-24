import { Input, List, Loading } from "@taroify/core";
import {
  Image,
  PageContainer,
  ScrollView,
  Text,
  View,
} from "@tarojs/components";
import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import Taro, { usePageScroll } from "@tarojs/taro";
import {
  convertSecondsToHMS,
  limitNumber,
  scaleImageUrlSize,
} from "@/utils/util";

interface Props {
  show: boolean;
  onClose: () => void;
  onChangeMusic: (url: string, id: string) => void;
}

const MusicLibrary = ({ show, onChangeMusic, onClose }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);
  const pageRef = useRef(1);
  const [loading, setLoading] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);
  const [playId, setPlayId] = useState();
  const audioContext = useRef();

  //   useEffect(() => {
  //     getMusic();
  //   }, []);

  const TabList = [
    { label: "全部", id: "" },
    { label: "华语", id: 231223 },
    { label: "日韩", id: 231224 },
    { label: "欧美", id: 28337 },
    { label: "轻快", id: 233932 },
    { label: "舒缓", id: 21465 },
    { label: "纯音乐", id: 25183 },
    { label: "小甜歌", id: 233935 },
    { label: "国风", id: 233097 },
    { label: "动感", id: 233936 },
    { label: "抖音", id: 233934 },
    { label: "民族音乐", id: 234043 },
    { label: "复古歌单", id: 234044 },
  ];

  const getMusic = async () => {
    // const result = await Taro.request({
    //   url: "https://h5.y1n.cn/weapp/logining",
    //   data: {
    //     code: "0b3N5kGa1GqWBH03FfGa1NF5m71N5kGS",
    //   },
    // });
    // if (result?.success) {
    //   console.log("ssss", result);
    const res = await Taro.request({
      url: "https://api.hunliji.com/hms/eInvitation/appApi/music/list",
      data: {
        page: pageRef.current,
        perPage: 20,
        markId: TabList?.[tabIndex]?.id,
      },
    });
    if (res?.status?.retCode === 0) {
      console.log("ssss", res?.data?.list);
      if (list?.length === 0 && pageRef.current === 0) {
        setList(res?.data?.list);
      } else {
        if (res?.data?.list?.length > 0) {
          setList((prev) => [...prev, ...res?.data?.list]);
          pageRef.current = pageRef.current + 1;
        }
      }
      //   setHasMore(res?.data?.hasNext);
    }
    // }
  };

  useEffect(() => {
    pageRef.current = 1;
    setList([]);
    getMusic();
  }, [tabIndex]);

  const playMusic = async (item) => {
    const isSame = playId === item.id;
    setPlayId(isSame ? "" : item?.id);

    if (!audioContext.current) {
      audioContext.current = Taro.createInnerAudioContext();
    }
    if (isSame) {
      audioContext.current.stop();
    } else {
      audioContext.current.src = item?.audioPath;
      /** 循环播放 */
      audioContext.current.loop = true;
      /** 是否遵循系统静音开关,不遵循，静音模式下也可以发出声音 */
      audioContext.current.obeyMuteSwitch = false;

      audioContext.current.play();
    }
  };

  const handleChangeTab = (index) => {
    setTabIndex(index);
  };

  const handleSelect = (item) => {
    /** 销毁audio实例 */
    audioContext.current?.destroy();
    onChangeMusic?.(item?.audioPath, item?.id);
  };

  const handleClose = () => {
    /** 销毁audio实例 */
    audioContext.current?.destroy();
    onClose();
  };

  return (
    <PageContainer show={show} round onBeforeLeave={handleClose}>
      <View style={{ height: "500px", textAlign: "center" }}>
        <View style={{ marginTop: "20rpx", fontSize: "40rpx" }}>音乐库</View>
        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            border: "2rpx solid #333",
            borderRadius: "16rpx",
            margin: "24rpx",
            padding: "24rpx",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: "60vw" }}
              placeholder="请输入歌曲名"
              value={keyword}
              // value={keyWord}
              confirmType="search"
              onInput={(e) => {
                setKeyword(e.detail.value);
              }}
            />
          </View>
          <Icon
            type="icon-sousuo"
            style={{ fontSize: "36rpx", color: "#333" }}
            onClick={handleSearch}
          />
        </View> */}

        <ScrollView
          scrollX
          style={{
            whiteSpace: "nowrap",
            margin: "0 24rpx",
            width: `calc(100% - 48rpx)`,
          }}
        >
          {TabList?.map((item, index) => (
            <View
              style={{
                display: "inline-block",
                height: "60rpx",
                padding: "0 24rpx",
                background: tabIndex === index ? "#FFF4F6" : "#fff",
                borderRadius: "16rpx",
                lineHeight: "60rpx",
                color: tabIndex === index ? "#FF405F" : "#333",
              }}
              onClick={() => handleChangeTab(index)}
            >
              {item?.label}
            </View>
          ))}
        </ScrollView>
        <ScrollView
          scrollY
          style={{ height: "420px", margin: "24rpx" }}
          lowerThreshold={100}
          onScrollToLower={() => {
            getMusic();
          }}
        >
          {list.map((item) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "18rpx",
              }}
              onClick={() => handleSelect(item)}
            >
              <View
                style={{ position: "relative" }}
                onClick={() => playMusic(item)}
              >
                <Image
                  //   lazyLoad
                  src={scaleImageUrlSize(item?.coverPath, "60x60")}
                  style={{
                    width: "120rpx",
                    height: "120rpx",
                    background: "#fff",
                    borderRadius: "16rpx",
                    marginRight: "12rpx",
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    background: "rgba(128, 128, 128, 0.5)",

                    width: "120rpx",
                    height: "120rpx",
                    borderRadius: "16rpx",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    type={
                      playId === item?.id ? "icon-24gf-pause2" : "icon-bofang"
                    }
                    style={{ fontSize: "34rpx", color: "#fff" }}
                  />
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  //   height: "120rpx",
                }}
              >
                <View>{limitNumber(item?.name, 19)}</View>
                <View style={{ marginTop: "20rpx" }}>
                  {convertSecondsToHMS(item?.duration)}
                </View>
              </View>
            </View>
          ))}

          {/* <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && "没有更多了"}
          </List.Placeholder> */}
        </ScrollView>
      </View>
    </PageContainer>
  );
};
export default MusicLibrary;
