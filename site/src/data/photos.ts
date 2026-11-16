// The photo wall. Each inner list is one column, top to bottom.
// To add a photo: put the file in src/assets/photos/ and add its name to a
// column here. An entry can also be an object:
//   { file: 'name.jpg', ratio: 1.5, alt: 'What the photo shows' }
// ratio (width / height) crops the photo to that shape; without it the whole
// photo is shown.

export type Photo = string | { file: string; ratio?: number; alt?: string };

export const photoColumns: Photo[][] = [
  [
    { file: '01.webp', ratio: 2.15 },
    '02.avif',
    '03.avif',
    { file: '04.avif', ratio: 0.61 },
    { file: '05.avif', ratio: 0.84 },
    { file: '06.avif', ratio: 0.82 },
    '07.avif',
  ],
  [
    '08.avif',
    { file: '09.avif', ratio: 1.07 },
    '10.avif',
    '11.avif',
    { file: '12.avif', ratio: 1.05 },
    { file: '13.avif', ratio: 0.82 },
    { file: '14.avif', ratio: 0.77 },
    { file: '15.avif', ratio: 0.69 },
  ],
  [
    '16.avif',
    { file: '17.avif', ratio: 1.01 },
    { file: '18.avif', ratio: 0.92 },
    '19.avif',
    { file: '20.avif', ratio: 0.61 },
    '21.avif',
    '22.avif',
    { file: '23.avif', ratio: 0.58 },
    { file: '24.avif', ratio: 1.21 },
  ],
  [
    { file: '25.png', ratio: 2.37 },
    { file: '26.avif', ratio: 0.91 },
    '27.avif',
    '28.avif',
    { file: '29.avif', ratio: 0.76 },
    '30.avif',
    '31.avif',
    { file: '32.webp', ratio: 0.60 },
    '33.avif',
  ],
  [
    { file: '34.avif', ratio: 0.77 },
    { file: '35.avif', ratio: 0.83 },
    { file: '36.avif', ratio: 0.94 },
    '37.avif',
    { file: '38.avif', ratio: 0.85 },
    { file: '39.avif', ratio: 0.94 },
    { file: '40.avif', ratio: 1.05 },
  ],
];
