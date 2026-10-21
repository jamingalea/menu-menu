import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const PLUM = '#5b3a58';

// Menu Menu logo mark: a 3x2 grid of diamonds
const diamonds = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]]
  .map(([c, r]) => {
    const x = 24 + c * 56;
    const y = 24 + r * 56;
    return `<path d="M${x} ${y - 24}L${x + 24} ${y}L${x} ${y + 24}L${x - 24} ${y}Z"/>`;
  })
  .join('');
const logo = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="104" viewBox="0 0 160 104" fill="${PLUM}">${diamonds}</svg>`
)}`;

const el = (type, style, children) => ({ type, props: { style, children } });

export default function handler() {
  return new ImageResponse(
    el(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        color: PLUM,
      },
      [
        el('div', {
          position: 'absolute', top: 0, left: 0, right: 0, height: 28,
          background: 'linear-gradient(90deg, #ee95a0, #a45e97)',
        }),
        { type: 'img', props: { src: logo, width: 160, height: 104, style: { marginBottom: 36 } } },
        el('div', { fontSize: 88, fontWeight: 400, lineHeight: 1.05, textAlign: 'center' }, 'Menu management'),
        el('div', { fontSize: 88, fontWeight: 400, lineHeight: 1.05, textAlign: 'center', fontStyle: 'italic' }, 'at the speed of service'),
        el('div', { fontSize: 34, marginTop: 44, opacity: 0.8 }, 'Create, update and publish your menus from anywhere.'),
      ]
    ),
    { width: 1200, height: 630 }
  );
}
