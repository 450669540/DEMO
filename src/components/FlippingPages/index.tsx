import React, { useRef, useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Image, Swiper, SwiperItem, Text, View } from '@tarojs/components';
import './index.less';

interface Props {
  template: any;
}

const FlippingPages = ({ template }: Props) => {
  const [flag, setFlag] = useState<boolean>(true);
  const countRef = useRef(0);

  //翻页
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <Swiper
      autoplay
      interval={3000}
      duration={0}
      style={{ height: '100vh' }}
      circular
      current={currentIndex}
      onChange={(e) => {
        console.log('sss', e);
        setCurrentIndex(e?.detail?.current);
      }}
    >
      {template?.pages?.map((page, index) => (
        <SwiperItem>
          <View style={{ width: '100%', height: '100%', background: page?.background, position: 'relative' }}>
            {page?.list?.map((item) =>
              item?.type === 'singleImage' ? (
                <Image
                  src={item?.images?.[0]?.url}
                  className={currentIndex === index ? item?.images?.[0]?.animationClass : ''}
                  style={{
                    ...item?.images?.[0]?.styles,
                  }}
                />
              ) : item?.type === 'twoInARowImage' ? (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: item?.width,
                    height: item?.height,
                  }}
                >
                  {item?.images?.map((image) => (
                    <Image
                      src={image?.url}
                      className={currentIndex === index ? item?.images?.[0]?.animationClass : ''}
                      style={image?.styles}
                    />
                  ))}
                </View>
              ) : item?.type === 'text' ? (
                <View style={item?.styles} className={currentIndex === index ? item?.animationClass : ''}>
                  <Text>{item?.value}</Text>
                </View>
              ) : (
                <></>
              ),
            )}
          </View>
        </SwiperItem>
      ))}
      {/* <SwiperItem>
        <View
          style={{
            width: '100vw',
            height: '100vh',
            background: 'red',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <View
            className={currentIndex === 0 ? 'element' : ''}
            style={{ width: '600rpx', height: '400rpx', background: '#fff', marginTop: '200rpx' }}
          ></View>
          <View
            className={currentIndex === 0 ? 'element' : ''}
            style={{ width: '600rpx', height: '400rpx', background: '#fff', marginTop: '200rpx' }}
          ></View>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View
          className={currentIndex === 1 ? 'element2' : ''}
          style={{ width: '100vw', height: '100vh', background: 'green' }}
        ></View>
      </SwiperItem>
      <SwiperItem>
        <View style={{ width: '100vw', height: '100vh', background: 'yellow' }}>
          <View
            className={currentIndex === 2 ? 'element3' : ''}
            style={{ width: '600rpx', height: '400rpx', background: '#fff' }}
          ></View>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View
          style={{
            width: '100vw',
            height: '100vh',
            background: 'blue',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <View
            className={currentIndex === 3 ? 'element4' : ''}
            style={{ width: '600rpx', height: '400rpx', background: '#fff', marginTop: '200rpx' }}
          ></View>
          <View
            className={currentIndex === 3 ? 'element5' : ''}
            style={{ width: '600rpx', height: '400rpx', background: '#fff', marginTop: '200rpx' }}
          ></View>
        </View>
      </SwiperItem>
      <SwiperItem>
        <View
          style={{
            width: '100vw',
            height: '100vh',
            background: 'blue',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            className={currentIndex === 4 ? 'element6' : ''}
            style={{
              width: '200rpx',
              height: '200rpx',
              background: '#fff',
              marginTop: '200rpx',
              borderRadius: '50%',
              marginLeft: '100rpx',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            1
          </View>
          <View
            className={currentIndex === 4 ? 'element7' : ''}
            style={{
              width: '200rpx',
              height: '200rpx',
              background: '#fff',
              marginTop: '200rpx',
              borderRadius: '50%',
              marginRight: '100rpx',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            2
          </View>
        </View>
      </SwiperItem> */}
    </Swiper>
  );
};
export default FlippingPages;
