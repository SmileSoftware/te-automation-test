import useragent from 'useragent';


const applicationInfo = (agentString: string) => {
  let result;
  agentString.split(' ').forEach((app) => {
    if (app && app.startsWith('TE')) {
      const pair = app.split('/');
      if (pair && pair.length === 2) {
      // Must match userDevices schema
        result = { appType: pair[0], appVersion: pair[1] };
      }
    }
  });
  return result;
};

export interface DeviceInfoInterface {
  browser: string;
  os: string;
  osVersion: string;
  deviceType: string;
  appType?: string;
  appVersion?: string;
}

const getDeviceInfo = (userAgentParam: string): DeviceInfoInterface => {
  const agent = useragent.lookup(userAgentParam);
  const app = applicationInfo(agent.source);
  // Must match fields from userDevicesSchema
  const result = {
    browser: agent.toAgent(),
    os: agent.os.family,
    osVersion: agent.os.toVersion(),
    deviceType: agent.device.family
  };
  if (app) {
    Object.assign(result, app);
  }
  return result;
};

const getClientFromUserAgent = (userAgentParam: string): string => {
  let client = 'Unkown';
  const device = getDeviceInfo(userAgentParam);
  client = device.browser;
  if (device.appType && device.appVersion) {
    client = `${device.appType} ${device.appVersion}`;
  }
  return client;
};

export { getDeviceInfo, getClientFromUserAgent };
