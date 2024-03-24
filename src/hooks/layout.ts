import { useLayoutEffect, useState } from 'react';
import Taro from '@tarojs/taro';

export function useScrollHeight(h: number, safe: boolean = false) {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    Taro.getSystemInfo().then((res) => {
      if (safe) {
        setHeight((res.windowHeight * 750) / res.windowWidth - h * 2 - (res.screenHeight - res.safeArea.bottom) * 2);
      } else {
        setHeight((res.windowHeight * 750) / res.windowWidth - h * 2);
      }
    });
  }, [h, safe]);

  return height;
}

export function useScrollHeightPx(h: number, safe: boolean = false) {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    Taro.getSystemInfo().then((res) => {
      if (safe) {
        setHeight(res.windowHeight - h - (res.screenHeight - res.safeArea.bottom));
      } else {
        setHeight(res.windowHeight - h);
      }
    });
  }, [h, safe]);

  return height;
}

export function useScrollWidth(h: number) {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    Taro.getSystemInfo().then((res) => {
      setHeight((res.windowWidth * 750) / res.windowWidth - h * 2);
    });
  }, [h]);

  return height;
}

export function useNavbarHeight(h: number = 0) {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const custom = Taro.getMenuButtonBoundingClientRect();
    Taro.getSystemInfo().then((res) => {
      setHeight(custom.height + h + (custom.top - res.statusBarHeight) * 2);
    });
  }, [h]);

  return height;
}

export function useStatusBarHeight() {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    Taro.getSystemInfo().then((res) => {
      setHeight(res.statusBarHeight);
    });
  });

  return height;
}

/**
 * 导航总高度
 * @returns
 */
export function useNavHeightPx(h: number = 0) {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const custom = Taro.getMenuButtonBoundingClientRect();
    Taro.getSystemInfo().then((res) => {
      setHeight(custom.height + h + (custom.top - res.statusBarHeight) * 2 + res.statusBarHeight);
    });
  }, [h]);

  return height;
}

export function useNavbarContentWidth() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const custom = Taro.getMenuButtonBoundingClientRect();
    Taro.getSystemInfo().then((res) => {
      setWidth(res.windowWidth - custom.width - (res.windowWidth - custom.left - custom.width));
    });
  });

  return width;
}

export function useScreenWidth() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    Taro.getSystemInfo().then((res) => {
      setWidth(res.screenWidth);
    });
  }, []);

  return width;
}

export function useScreenHeight() {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    Taro.getSystemInfo().then((res) => {
      setHeight(res.screenHeight);
    });
  }, []);

  return height;
}
