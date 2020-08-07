import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'channel', ...(require('/Users/linzhijing/Desktop/我的学习/第二阶段react/课件及资料/react项目实战/lesson8-umi/src/models/channel.js').default) });
app.model({ namespace: 'global', ...(require('/Users/linzhijing/Desktop/我的学习/第二阶段react/课件及资料/react项目实战/lesson8-umi/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/linzhijing/Desktop/我的学习/第二阶段react/课件及资料/react项目实战/lesson8-umi/src/models/login.js').default) });
app.model({ namespace: 'more', ...(require('/Users/linzhijing/Desktop/我的学习/第二阶段react/课件及资料/react项目实战/lesson8-umi/src/models/more.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/linzhijing/Desktop/我的学习/第二阶段react/课件及资料/react项目实战/lesson8-umi/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/linzhijing/Desktop/我的学习/第二阶段react/课件及资料/react项目实战/lesson8-umi/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
