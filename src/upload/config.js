/**
 * 阿里OSS 直传设置
 * @type {{bucket: string, baseUrl: string, directory: string}}
 */
const OSS_UPLOAD_CONCONFIG = {
  bucket: 'online-sound-bja',
  baseUrl: 'http://song-static.inframe.mobi/',
  directory: process.env.ENV_CONFIG === 'prod' ? 'feed/web-admin-offline' : 'feed/web-admin-offline',
  accessId: 'LTAIwEdOX9qH0BBA',
  accessKey: 'Ay8fF3Sm3wA4dQwCelmGMZPgsR7r5a'
}

export default OSS_UPLOAD_CONCONFIG
