import { FileType } from '../../enterprise/entities/file'

export function verifyMediaType(mimeType: string) {
  if (mimeType.startsWith('image/')) {
    return FileType.image
  } else if (mimeType.startsWith('video/')) {
    return FileType.video
  } else {
    return FileType.other
  }
}
