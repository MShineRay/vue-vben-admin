import { generatorFingerprint } from '@edp-core/shared/utils';

/**
 * 动态生成路由 - 前端方式
 */
async function visitorIdGenerate() {
  const res = await generatorFingerprint();
  return res.visitorId;
}

async function visitorIdHandler(key: string = 'EDP_VISITOR_ID') {
  let visitorId = '';
  if (!localStorage.getItem(key)) {
    visitorId = await visitorIdGenerate();
    console.log('visitorId:', visitorId);
    localStorage.setItem(key, visitorId);
  }
}

async function visitorIdGetter(key: string = 'EDP_VISITOR_ID') {
  let visitorId = localStorage.getItem(key);
  if (!visitorId) {
    visitorId = await visitorIdGenerate();
    localStorage.setItem(key, visitorId);
  }
  return visitorId;
}

export { visitorIdGenerate, visitorIdGetter, visitorIdHandler };
