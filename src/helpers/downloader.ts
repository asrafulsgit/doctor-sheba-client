type DownloadSource = Blob | string;

export function downloader(source: DownloadSource, fileName: string) {
  const blobUrl = source instanceof Blob ? URL.createObjectURL(source) : source;

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  a.remove();

  if (source instanceof Blob) {
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  }
}
