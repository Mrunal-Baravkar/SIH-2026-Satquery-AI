import { EvidenceRegion } from '../types';

/**
 * Extracts a sub-region crop of an image specified by normalized bounding box coordinates.
 * Supports both 0-1000 scale and 0-1 normalized scale.
 */
export async function extractImageCrop(
  imageSrc: string,
  bbox?: { xmin: number; ymin: number; width: number; height: number }
): Promise<string> {
  return new Promise((resolve) => {
    if (!imageSrc || !bbox) {
      resolve('');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const naturalWidth = img.naturalWidth || img.width || 1024;
        const naturalHeight = img.naturalHeight || img.height || 1024;

        // Determine if coordinates are 0-1 or 0-1000 normalized
        const isNormalized01 = bbox.width <= 1 && bbox.height <= 1;
        const normX = isNormalized01 ? bbox.xmin : bbox.xmin / 1000;
        const normY = isNormalized01 ? bbox.ymin : bbox.ymin / 1000;
        const normW = isNormalized01 ? bbox.width : bbox.width / 1000;
        const normH = isNormalized01 ? bbox.height : bbox.height / 1000;

        // Calculate source rectangle in natural image pixel space
        const sx = Math.max(0, Math.min(naturalWidth - 1, Math.round(normX * naturalWidth)));
        const sy = Math.max(0, Math.min(naturalHeight - 1, Math.round(normY * naturalHeight)));
        const sw = Math.max(2, Math.min(naturalWidth - sx, Math.round(normW * naturalWidth)));
        const sh = Math.max(2, Math.min(naturalHeight - sy, Math.round(normH * naturalHeight)));

        const canvas = document.createElement('canvas');
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve('');
          return;
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        const cropDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve(cropDataUrl);
      } catch (err) {
        console.warn('extractImageCrop failed:', err);
        resolve('');
      }
    };

    img.onerror = () => {
      console.warn('Failed to load image for cropping:', imageSrc.slice(0, 50));
      resolve('');
    };

    img.src = imageSrc;
  });
}

/**
 * Iterates over an array of evidence regions, extracts crops from the image,
 * and attaches cropUrl to each evidence item.
 */
export async function attachCropsToEvidence(
  imageSrc: string,
  evidenceList: EvidenceRegion[]
): Promise<EvidenceRegion[]> {
  if (!imageSrc || !evidenceList || evidenceList.length === 0) {
    return evidenceList;
  }

  return Promise.all(
    evidenceList.map(async (ev) => {
      if (ev.bbox && (!ev.cropUrl || ev.cropUrl.length === 0)) {
        try {
          const cropUrl = await extractImageCrop(imageSrc, ev.bbox);
          return { ...ev, cropUrl: cropUrl || undefined };
        } catch {
          return ev;
        }
      }
      return ev;
    })
  );
}
