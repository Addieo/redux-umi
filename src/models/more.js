import { getChannelData, getChannelDataBySearch } from '@/services/channel';

const Model = {
  namespace: 'more',
  state: {
    data: [],
  },
  effects: {
    *getChannelData(action, { call, put }) {
      const res = yield call(getChannelData);
      yield put({
        type: 'channelData',
        payload: { ...res },
      });
    },
    *getChannelDataBySearch({ payload }, { call, put }) {
      const res = yield call(getChannelDataBySearch, payload);
      yield put({
        type: 'channelData',
        payload: { ...res },
      });
    },
  },
  reducers: {
    channelData(state, { payload }) {
      return {
        ...state,
        data: [...payload.data],
      };
    },
  },
};

export default Model;
