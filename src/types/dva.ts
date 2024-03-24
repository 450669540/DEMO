import { Action, AnyAction, Dispatch } from 'redux';

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S

/**
 * Object whose values correspond to different reducer functions.
 *
 * @template A The type of actions the reducers can potentially respond to.
 */
export type ReducersMapObject<S = any, A extends Action = AnyAction> = {
  [K in keyof S]: Reducer<S[K], A>
}

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any,
  call: Function,
  select: Function,
  take: Function,
  cancel: Function,
  [key: string]: any,
}

export interface ReducerEnhancer {
  (reducer: Reducer<any>): void,
}

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle';
export type EffectWithType = [Effect, { type: EffectType }];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;
export type ReducersMapObjectWithEnhancer = [ReducersMapObject, ReducerEnhancer];

export interface SubscriptionAPI {
  history: History,
  dispatch: Dispatch<any>,
}

export interface EffectsMapObject {
  [key: string]: Effect | EffectWithType,
}

export interface SubscriptionsMapObject {
  [key: string]: Subscription,
}


/**
 * dva model通用类型
 */
export interface ModelType<S = any> {
  namespace: string,
  state?: S;
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer,
  effects?: EffectsMapObject,
  subscriptions?: SubscriptionsMapObject,
}


