export class FileUploadRequest {
  files: FileList;
  containerName: string;
  allowedExtensions: Array<string>;
  invalidExtensionMsg: string;
  maxFiles: number;
  maxFilesMsg: string;
  maxSize: number;
  maxSizeMsg: string;
  checkCombineSize? : boolean = false;
  constructor() {
    this.files = new FileList();
  }
}

export class FileUploadResponse {
  invalidFiles: Array<InvalidFile>;
  invalidCount: number;
  uploadedFiles: Array<UploadedFile>;
  successCount: number;
  FailedFiles: Array<FailedFile>;
  failureCount: number;

  constructor() {
    this.invalidFiles = new Array<InvalidFile>();
    this.invalidCount = 0;
    this.uploadedFiles = new Array<UploadedFile>();
    this.successCount = 0;
    this.FailedFiles = new Array<FailedFile>();
    this.failureCount = 0;
  }
}

export class InvalidFile {
  file: File;
  msg: string;
}

export class UploadedFile {
  file: File;
  url: string;
}

export class FailedFile {
  file: File;
  error: string;
}
