const CLOUDINARY_REGEX = /\/upload\/(?:v\d+\/)?(.+)$/;

export function transformCloudinaryUrl(
  url: string,
  transforms: string
): string {
  return url.replace(CLOUDINARY_REGEX, `/upload/${transforms}/$1`);
}
