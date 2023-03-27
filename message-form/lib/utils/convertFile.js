export function base64toFile(base64, filename) {
  const arr = base64.split(",");
  // @ts-ignore
  const mime = arr[0].match(/:(.*?);/)[1];
  const buffer = Buffer.from(arr[1], "base64");
  const file = new File([buffer], filename, { type: mime });
  const fileWithPreview = Object.assign(file, {
    preview: base64,
  });
  return fileWithPreview;
}

export function base64toFileNew(base64, filename) {
  const arr = base64.split(",");
  // @ts-ignore
  const mime = arr[0].match(/:(.*?);/)[1];
  const buffer = Buffer.from(arr[1], "base64");
  const file = new File([buffer], filename, { type: mime });
  return {
    file,
    data_url: base64,
  };
}
