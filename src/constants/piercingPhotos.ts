export const earPiercingPhotos = [
  '/assets/images/photos/piercings/ear-01.jpg',
  '/assets/images/photos/piercings/ear-02.jpg',
  '/assets/images/photos/piercings/ear-03.jpg',
  '/assets/images/photos/piercings/ear-04.jpg',
] as const;

export const mouthPiercingPhotos = [
  '/assets/images/photos/piercings/mouth-01.jpg',
  '/assets/images/photos/piercings/mouth-02.jpg',
  '/assets/images/photos/piercings/mouth-03.jpg',
  '/assets/images/photos/piercings/mouth-04.jpg',
] as const;

export const facePiercingPhotos = [
  '/assets/images/photos/piercings/face-01.jpg',
  '/assets/images/photos/piercings/face-02.jpg',
  '/assets/images/photos/piercings/face-03.jpg',
  '/assets/images/photos/piercings/face-04.jpg',
] as const;

// Expected assets live in: public/assets/images/photos/piercings/
export const piercingPhotoMap = {
  ohr: earPiercingPhotos,
  mund: mouthPiercingPhotos,
  gesicht: facePiercingPhotos,
  koerper: [] as string[],
  intim: [] as string[],
  ohrlochzauberer: [] as string[],
} as const;

export type PiercingPhotoCategory = keyof typeof piercingPhotoMap;
