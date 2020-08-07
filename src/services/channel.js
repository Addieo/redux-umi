import request from '@/utils/request';

export async function getChannelData() {
  return request('/api/getChannelData', {
    method: 'get',
  });
}

export async function getChannelDataBySearch(params) {
  return request('/api/getChannelDataBySearch', {
    method: 'post',
    data: params,
  });
}
