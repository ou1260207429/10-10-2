
export const IS_DEBUG = true;
export const environment = {
  SERVER_URL: IS_DEBUG ? 'http://192.168.10.151:8087/' : `http://dn5.gxcic.net:8301/`,
  production: true,
  useHash: true,
  hmr: false,

};
