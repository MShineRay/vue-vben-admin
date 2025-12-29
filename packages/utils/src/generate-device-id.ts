import { generatorFingerprint } from '@edp-core/shared/utils';

async function deviceIdGenerate() {
  const res = await generatorFingerprint();
  return res.visitorId;
}

async function deviceIdHandler(key = 'EDP_DEVICE_ID') {
  let deviceId = '';
  if (!localStorage.getItem(key)) {
    deviceId = await deviceIdGenerate();
    console.log('deviceId:', deviceId);
    localStorage.setItem(key, deviceId);
  }
}
function deviceIdGetter(key = 'EDP_DEVICE_ID') {
  return localStorage.getItem(key);
}

export { deviceIdGenerate, deviceIdGetter, deviceIdHandler };
