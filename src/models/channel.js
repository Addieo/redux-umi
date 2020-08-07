import { getChannelData, getChannelDataBySearch } from '@/services/channel';

const Model = {
  namespace: 'channel',
  state: {
    data: [],
  },
  effects: {
    *getChannelData(action, { call, put }) {
      const response = yield call(getChannelData);
      yield put({
        type: 'channelData',
        payload: response,
      });
    },
    *getChannelDataBySearch({ payload }, { call, put }) {
      const response = yield call(getChannelDataBySearch, payload);
      yield put({
        type: 'channelData',
        payload: response,
      });
    },
  },
  reducers: {
    channelData(state, { payload }) {
      return { ...state, data: [...payload.data] };
    },
  },
};

export default Model;
