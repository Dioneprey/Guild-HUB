export interface UploadParams {
  fileName: string
  fileType: string
  file: Buffer
}

export abstract class Uploader {
  abstract upload(params: UploadParams): Promise<{ url: string; key: string }>
}
