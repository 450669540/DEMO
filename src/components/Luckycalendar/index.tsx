import { Picker, View, Swiper, SwiperItem } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import "./index.less";
import { formatDate, fillWithZero } from "./utils";
import Days, {
  CalendarDateInfo,
  CustomStyles,
  StyleGeneratorParams,
} from "./days/index";
import { CSSProperties } from "react";

export type CalendarMark = {
  /** 要标记的日期 YYYY-MM-DD*/
  value: string;
  /** 标记颜色 */
  color?: string;
  /** 标记的大小，css中的width、length */
  markSize?: string;
};

export type ExtraInfo = {
  /** 要标记的日期 YYYY-MM-DD*/
  value: string;
  /** 额外信息文本 */
  text: string;
  /** 颜色 */
  color?: string;
  /** 文字大小 */
  fontSize?: string;
};

export type IProps = {
  /** 额外信息 */
  extraInfo?: ExtraInfo[];
  /** 要标记的日期列表 YYYY-MM-DD */
  marks?: CalendarMark[];
  /** 点击回调 */
  onDayClick?: (item: { value: string }) => any;
  /** 长按回调（触发长按事件时不会触发点击事件） */
  onDayLongPress?: (item: { value: string }) => any;
  /** 当前选中的时间 YYYY-MM-DD*/
  selectedDate?: string;
  /** 当前显示的月份/周 所包含的一个日期 YYYY-MM-DD */
  currentView?: string;
  /** 隐藏箭头 */
  hideArrow?: boolean;
  /** 隐藏控制器 */
  hideController?: boolean;
  /** 是否可以滑动 */
  isSwiper?: boolean;
  /** 滑动方向 水平/竖直*/
  isVertical?: boolean;
  /** 最小的可选时间 */
  minDate?: string;
  /** 最大的可选时间 */
  maxDate?: string;
  /** 选中日期的背景色 */
  selectedDateColor?: string;
  /** 是否显示农历 */
  mode?: "normal" | "lunar";
  /** 是否显示分割线 */
  showDivider?: boolean;
  /** 是否范围选择模式 */
  isMultiSelect?: boolean;
  /** 月份/周改变回调 */
  onCurrentViewChange?: (value: string) => any;
  /** 点击左箭头 */
  onClickPre?: () => any;
  /** 点击右箭头 */
  onClickNext?: () => any;
  /** 范围选择完成时的回调 */
  onSelectDate?: (value: { start: string; end: string }) => any;
  /** 自定义样式生成器 */
  customStyleGenerator?: (dateInfo: StyleGeneratorParams) => CustomStyles;
  /** 头部整体样式 */
  headStyle?: CSSProperties;
  /** 头部单元格样式 */
  headCellStyle?: CSSProperties;
  /** body整体样式 */
  bodyStyle?: CSSProperties;
  /** 左箭头样式 */
  leftArrowStyle?: CSSProperties;
  /** 右箭头样式 */
  rightArrowStyle?: CSSProperties;
  /** 日期选择器样式 */
  datePickerStyle?: CSSProperties;
  /** 日期选择器&左右箭头 所在容器样式 */
  pickerRowStyle?: CSSProperties;
  /** 视图 月/周 */
  view?: "month" | "week";
  /** 日期选择器文本生成器 */
  pickerTextGenerator?: (currentView: Date) => string;
  /** 父组件通过ref可以调用内部方法 */
  bindRef?: (ref: Calendar) => any;
  /** 指定周几为一行的起点，0为周日*/
  startDay?: number;
};

type IState = {
  /** 当前年月YYYY-MM */
  current: string;
  /** 当前选中日期 YYYY-MM-DD*/
  selectedDate: string;
  /** 当前显示的轮播图index */
  currentCarouselIndex: number;
  /** 范围选择 */
  selectedRange: { start: string; end: string };
};

const getWeekDayList = (startDay: number) => {
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  let result: string[] = [];
  for (let i = startDay; i < 7; i++) {
    result.push(weekDays[i]);
  }
  for (let i = 0; i < startDay; i++) {
    result.push(weekDays[i]);
  }
  return result;
};

export default class Luckycalendar extends Component<IProps, IState> {
  state: IState = {
    current: formatDate(new Date(this.props.currentView as string)),
    selectedDate: this.props.selectedDate as string,
    currentCarouselIndex: 1,
    selectedRange: { start: "", end: "" },
  };

  /** 指定默认的props */
  public static defaultProps: Partial<IProps> = {
    isVertical: false,
    marks: [],
    selectedDate: formatDate(new Date(), "day"),
    selectedDateColor: "#90b1ef",
    hideArrow: false,
    isSwiper: true,
    minDate: "1970-01-01",
    mode: "normal",
    maxDate: "2100-12-31",
    showDivider: false,
    isMultiSelect: false,
    view: "month",
    currentView: formatDate(new Date()),
    startDay: 0,
    extraInfo: [],
  };
  UNSAFE_componentWillMount() {
    if (this.props.bindRef) {
      this.props.bindRef(this);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<IProps>): void {
    if (
      nextProps.selectedDate &&
      nextProps.selectedDate !== this.props.selectedDate
    ) {
      this.setState({
        selectedDate: nextProps.selectedDate,
        current: nextProps.selectedDate,
      });
    }
    if (
      nextProps.currentView &&
      nextProps.currentView !== this.props.currentView
    ) {
      this.setState({ current: nextProps.currentView });
    }
  }

  getPickerText = () => {
    let { view, startDay } = this.props;
    startDay = startDay as number;
    const { current } = this.state;
    const currentDateObj = new Date(current);
    const monthStr = formatDate(currentDateObj, "month");

    if (view === "week") {
      currentDateObj.setDate(
        currentDateObj.getDate() -
          (currentDateObj.getDay() >= startDay
            ? currentDateObj.getDay() - startDay
            : 6 - startDay + currentDateObj.getDay())
      );
      const weekStart = currentDateObj.getDate();
      const weekStartMonth = currentDateObj.getMonth() + 1;
      const weekStartYear = currentDateObj.getFullYear();
      currentDateObj.setDate(currentDateObj.getDate() + 6);
      const weekEnd = currentDateObj.getDate();
      const weekEndMonth = currentDateObj.getMonth() + 1;
      const weekEndYear = currentDateObj.getFullYear();
      let weekEndStr = `${fillWithZero(weekEnd, 2)}`;
      if (weekEndMonth !== weekStartMonth) {
        weekEndStr = `${fillWithZero(weekEndMonth, 2)}-${weekEndStr}`;
      }
      if (weekEndYear !== weekStartYear) {
        weekEndStr = `${weekEndYear}-${weekEndStr}`;
      }
      return `${monthStr}-${fillWithZero(weekStart, 2)}~${weekEndStr}`;
    }
    if (view === "month") {
      return monthStr;
    }
  };
  onClickDate = (value: CalendarDateInfo) => {
    const { onDayClick, onSelectDate } = this.props;
    let { current, currentCarouselIndex, selectedRange } = this.state;
    if (!selectedRange.start || selectedRange.end) {
      selectedRange = { start: value.fullDateStr, end: "" };
    } else {
      if (new Date(selectedRange.start) > new Date(value.fullDateStr)) {
        selectedRange = {
          start: value.fullDateStr,
          end: selectedRange.start,
        };
      } else {
        selectedRange.end = value.fullDateStr;
      }
    }

    if (!value.currentMonth) {
      // 点到非本月的日期就跳转到相应月份
      const { onCurrentViewChange, onClickNext, onClickPre } = this.props;
      let dateObj = new Date(value.fullDateStr);
      if (dateObj.getMonth() > new Date(current).getMonth()) {
        currentCarouselIndex = (currentCarouselIndex + 1) % 3;
        if (onClickNext) onClickNext();
      } else {
        currentCarouselIndex = (currentCarouselIndex + 2) % 3;
        if (onClickPre) onClickPre();
      }
      if (onCurrentViewChange) onCurrentViewChange(value.fullDateStr);

      current = formatDate(dateObj);
    }
    this.setState({
      selectedDate: value.fullDateStr,
      selectedRange,
      currentCarouselIndex,
      current,
    });
    if (onDayClick) {
      onDayClick({ value: value.fullDateStr });
    }
    if (onSelectDate) {
      onSelectDate(selectedRange);
    }
  };

  goNext = () => {
    const { view } = this.props;
    const { currentCarouselIndex } = this.state;
    let dateObj = new Date(this.state.current);
    const { onClickNext, onCurrentViewChange } = this.props;
    let current = "";
    if (view === "month") {
      dateObj.setMonth(dateObj.getMonth() + 1);
      const nextMonth = formatDate(dateObj);
      current = nextMonth;
    }
    if (view === "week") {
      dateObj.setDate(dateObj.getDate() + 7);
      const nextWeek = formatDate(dateObj, "day");
      current = nextWeek;
    }
    this.setState({
      currentCarouselIndex: (currentCarouselIndex + 1) % 3,
      current,
    });
    if (onClickNext) onClickNext();
    if (onCurrentViewChange) onCurrentViewChange(current);
  };

  goPre = () => {
    const { view } = this.props;
    const { currentCarouselIndex } = this.state;
    let dateObj = new Date(this.state.current);
    let current = "";
    if (view === "month") {
      dateObj.setMonth(dateObj.getMonth() - 1);
      const preMonth = formatDate(dateObj);
      current = preMonth;
    }
    if (view === "week") {
      dateObj.setDate(dateObj.getDate() - 7);
      const preWeek = formatDate(dateObj, "day");
      current = preWeek;
    }
    const { onClickPre, onCurrentViewChange } = this.props;
    if (onClickPre) onClickPre();
    if (onCurrentViewChange) onCurrentViewChange(current);
    this.setState({
      currentCarouselIndex: (currentCarouselIndex + 2) % 3,
      current,
    });
  };

  render() {
    const { current, selectedDate, currentCarouselIndex, selectedRange } =
      this.state;
    const {
      marks,
      isVertical,
      selectedDateColor,
      hideArrow,
      isSwiper,
      minDate,
      maxDate,
      onDayLongPress,
      mode,
      showDivider,
      isMultiSelect,
      customStyleGenerator,
      headStyle,
      headCellStyle,
      bodyStyle,
      leftArrowStyle,
      rightArrowStyle,
      datePickerStyle,
      pickerRowStyle,
      view,
      pickerTextGenerator,
      hideController,
      onCurrentViewChange,
      startDay,
      extraInfo,
    } = this.props;
    // 配合Swiper组件实现无限滚动
    // 原理：永远保持当前屏幕显示月份的左边是前一个月，右边是后一个月
    // current即当前月份，currentCarouselIndex即当前显示页面的index。一共3个页面，index分别为0 1 2 。
    // Swiper的无限循环就是类似0 1 2 0 1 2 这样。如果currentCarouselIndex是2 那么我只要保证 1显示的是前面一个月，0显示的是后面一个月 就完成了循环。
    let currentDate = new Date(current);

    let preDate = new Date(current);
    let nextDate = new Date(current);

    if (view === "month") {
      preDate.setMonth(currentDate.getMonth() - 1);
      nextDate.setMonth(currentDate.getMonth() + 1);
    }
    if (view === "week") {
      preDate.setDate(currentDate.getDate() - 7);
      nextDate.setDate(currentDate.getDate() + 7);
    }
    const preIndex = (currentCarouselIndex + 2) % 3;
    const nextIndex = (currentCarouselIndex + 1) % 3;
    let monthObj: Date[] = [];
    monthObj[currentCarouselIndex] = currentDate;
    monthObj[preIndex] = preDate;
    monthObj[nextIndex] = nextDate;

    // 所有Days组件的公共Props
    const publicDaysProp = {
      marks: marks ? marks : [],
      onClick: this.onClickDate,
      selectedDate,
      minDate: minDate as string,
      maxDate,
      selectedDateColor,
      onDayLongPress,
      mode: mode as "normal" | "lunar",
      showDivider: showDivider as boolean,
      isMultiSelect: isMultiSelect as boolean,
      selectedRange: selectedRange,
      customStyleGenerator,
      view: view as "month" | "week",
      startDay: startDay as number,
      extraInfo: extraInfo ? extraInfo : [],
    };

    return (
      <View>
        <View
          className="calendar-picker"
          style={{
            ...pickerRowStyle,
            display: hideController ? "none" : "block",
          }}
        >
          {hideArrow ? (
            ""
          ) : (
            <View
              style={leftArrowStyle}
              className="calendar-arrow-left"
              onClick={() => this.goPre()}
            />
          )}
          <Picker
            style={{
              display: "inline-block",
              lineHeight: "25px",
              ...datePickerStyle,
            }}
            mode="date"
            onChange={(e) => {
              const currentDate = formatDate(new Date(e.detail.value));
              this.setState({ current: currentDate });
              if (onCurrentViewChange) {
                onCurrentViewChange(currentDate);
              }
            }}
            value={current}
            fields="month"
            start={minDate}
            end={maxDate}
          >
            {pickerTextGenerator
              ? pickerTextGenerator(new Date(current))
              : this.getPickerText()}
          </Picker>
          {hideArrow ? (
            ""
          ) : (
            <View
              style={rightArrowStyle}
              className="calendar-arrow-right"
              onClick={() => {
                this.setState({
                  currentCarouselIndex: (currentCarouselIndex + 1) % 3,
                });
                this.goNext();
              }}
            />
          )}
        </View>

        <View className="calendar-head" style={headStyle}>
          {getWeekDayList(startDay as number).map((value) => (
            <View style={headCellStyle} key={value}>
              {value}
            </View>
          ))}
        </View>
        {isSwiper ? (
          <Swiper
            style={{
              height: view === "month" ? "19rem" : "3rem",
              ...bodyStyle,
            }}
            vertical={isVertical}
            circular
            current={currentCarouselIndex}
            onChange={(e) => {
              if (e.detail.source === "touch") {
                const currentIndex = e.detail.current;
                if ((currentCarouselIndex + 1) % 3 === currentIndex) {
                  // 当前月份+1
                  this.goNext();
                } else {
                  // 当前月份-1
                  this.goPre();
                }
                this.setState({ currentCarouselIndex: e.detail.current });
              }
            }}
            className={"calendar-swiper"}
          >
            <SwiperItem style="position: absolute; width: 100%; height: 100%;">
              <Days date={monthObj[0]} {...publicDaysProp} />
            </SwiperItem>
            <SwiperItem style="position: absolute; width: 100%; height: 100%;">
              <Days date={monthObj[1]} {...publicDaysProp} />
            </SwiperItem>
            <SwiperItem style="position: absolute; width: 100%; height: 100%;">
              <Days date={monthObj[2]} {...publicDaysProp} />
            </SwiperItem>
          </Swiper>
        ) : (
          <Days bodyStyle={bodyStyle} date={currentDate} {...publicDaysProp} />
        )}
      </View>
    );
  }
}
