import React, { CSSProperties } from "react";
import { ITouchEvent, Text } from "@tarojs/components";

interface IconProps {
  type: String;
  style?: string | CSSProperties;
  className?: string;
  onClick?: (event: ITouchEvent) => any;
}

const Icon: React.FC<IconProps> = (props) => {
  const { type, style, className } = props;
  return (
    <Text
      style={style}
      onClick={props?.onClick}
      className={`iconfont ${type} ${className}`}
    />
  );
};

export default Icon;
