import { create } from 'dva-core';
// import immer from 'dva-immer';
// import { createLogger } from 'redux-logger';

let app;
let store;
let dispatch;
let registered;

function createApp(opt) {
  // redux日志
  // opt.onAction = [createLogger()]
  app = create(opt);
  // app.use(createLoading({}));
  // app.use(immer());

  if (!registered) opt.models.forEach((model) => app.model(model));
  registered = true;

  app.start();

  store = app._store;

  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;

  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
