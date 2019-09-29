/**
 * 上传设置
 * @type {{bucket: string, baseUrl: string, directory: string}}
 */
const OSS_UPLOAD_CONCONFIG = {
  bucket: process.env.VUE_APP_UPLOAD_OSS_BUCKET,
  baseUrl: process.env.VUE_APP_UPLOAD_OSS_BASE_URL,
  directory: process.env.ENV_CONFIG === 'prod' ? 'feed/web-admin-offline' : 'feed/web-admin-offline',
  accessId: process.env.VUE_APP_UPLOAD_OSS_ACCESSID,
  accessKey: process.env.VUE_APP_UPLOAD_OSS_ACCESSKEY
}
export default OSS_UPLOAD_CONCONFIG
