import { FileType } from '../../enterprise/file'

export function verifyMediaType(mimeType: string) {
  if (mimeType.startsWith('image/')) {
    return FileType.IMAGE
  } else if (mimeType.startsWith('video/')) {
    return FileType.VIDEO
  } else {
    return FileType.OTHER
  }
}
