const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function validImageType(fileType: string) {
  return fileType === 'image/jpeg'
      || fileType === 'image/png'
      || fileType === 'image/webp'
      || fileType === 'image/gif';
}

export function validImageSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE;
}
