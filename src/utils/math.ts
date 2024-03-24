import numeral from 'numeral';
import { isNil } from './lang';

type SumIteratee<T> = (t: T) => number | undefined;

export enum EnumRoundType {
  四舍五入 = 1,
  向下取整 = 2,
  向上取整 = 3,
}

export default class MathHelper {
  /**
   * 加法
   * @param augend 被加数
   * @param addend 加数
   */
  static add(augend?: number | null, addend?: number | null) {
    return numeral(augend ?? 0)
      .add(addend ?? 0)
      .value() as number;
  }

  /**
   * 减法
   * @param minuend 被减数
   * @param subtrahend 减数
   */
  static subtract(minuend?: number | null, subtrahend?: number | null) {
    return numeral(minuend ?? 0)
      .subtract(subtrahend ?? 0)
      .value() as number;
  }

  /**
   * 乘法
   * @param multiplier 乘数
   * @param multiplicand 被乘数
   * @param precision 保留小数位数
   * @param roundType 取整方式
   */
  static multiply(
    multiplier?: number | null,
    multiplicand?: number | null,
    precision: number = 2,
    roundType: EnumRoundType = EnumRoundType.四舍五入,
  ) {
    if (isNil(multiplier) || isNil(multiplicand)) {
      return null;
    }
    // eslint-disable-next-line
    const move = precision === 0 ? 1 : Math.pow(10, precision);
    if (roundType === EnumRoundType.四舍五入) {
      return numeral(
        Math.round(
          numeral(multiplier ?? 0)
            .multiply(multiplicand ?? 0)
            .multiply(move)
            .value() as number,
        ),
      )
        .divide(move)
        .value();
    }

    if (roundType === EnumRoundType.向上取整) {
      return numeral(
        Math.ceil(
          numeral(multiplier ?? 0)
            .multiply(multiplicand ?? 0)
            .multiply(move)
            .value() as number,
        ),
      )
        .divide(move)
        .value();
    }

    return numeral(
      Math.floor(
        numeral(multiplier ?? 0)
          .multiply(multiplicand ?? 0)
          .multiply(move)
          .value() as number,
      ),
    )
      .divide(move)
      .value();
  }

  /**
   * 除法
   * @param dividend 被除数
   * @param divisor 除数
   * @param precision 保留小数位数
   * @param roundType 取整方式
   */
  static divide(
    dividend?: number | null,
    divisor?: number | null,
    precision: number = 2,
    roundType: EnumRoundType = EnumRoundType.四舍五入,
  ) {
    if (divisor === 0 || isNil(dividend)) {
      return null;
    }
    // eslint-disable-next-line
    const move = precision === 0 ? 1 : Math.pow(10, precision);
    if (roundType === EnumRoundType.四舍五入) {
      return numeral(
        Math.round(
          numeral(dividend ?? 0)
            .divide(divisor ?? 1)
            .multiply(move)
            .value() as number,
        ),
      )
        .divide(move)
        .value();
    }

    if (roundType === EnumRoundType.向上取整) {
      return numeral(
        Math.ceil(
          numeral(dividend ?? 0)
            .divide(divisor ?? 1)
            .multiply(move)
            .value() as number,
        ),
      )
        .divide(move)
        .value();
    }

    return numeral(
      Math.floor(
        numeral(dividend ?? 0)
          .divide(divisor ?? 1)
          .multiply(move)
          .value() as number,
      ),
    )
      .divide(move)
      .value();
  }

  /**
   * 合计
   * @param array 待合计 array
   * @param iteratee 取值函数
   */
  static sumBy<T>(array: readonly T[], iteratee: SumIteratee<T>) {
    return array.reduce((accum, next: T) => this.add(accum, iteratee(next)) as number, 0);
  }

  /**
   * 依次减去
   * @param initialValue 初始化数值，减数
   * @param array 待减去数组 array
   * @param iteratee 取值函数，默认 (val) => val
   */
  static subtractBy<T>(initialValue, array: readonly T[], iteratee: SumIteratee<T> = (val) => val as number) {
    return array.reduce((accum, next: T) => this.subtract(accum, iteratee(next)) as number, initialValue);
  }
}
