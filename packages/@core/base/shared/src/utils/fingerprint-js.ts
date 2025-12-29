// Initialize the agent at application startup.
// If you're using an ad blocker or Brave/Firefox, this import will not work.
// Please use the NPM package instead: https://t.ly/ORyXk
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { v4 as uuidV4 } from 'uuid';

async function generatorFingerprint() {
  try {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    console.log('generatorFingerprint result:', result);
    return result;
  } catch (error) {
    console.error(error);
    return { visitorId: uuidV4() };
  }
}
export { generatorFingerprint };
