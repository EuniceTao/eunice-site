/** 用户确认的个人作品清单；挂画墙与作品空间共用，未完成作品不伪装成成品。 */
export const ART_GAME_URL = 'https://app-moma.ke.com/7e041044-98ae-45c6-b51c-5da5489c2c2a';
export const PERSONAL_ARTWORKS = [
  { id: 'chao-chao', title: '吵吵艺术馆', titleLines: ['吵吵', '艺术馆'], kind: '小游戏', description: '这是我自己做的小游戏。点下面的入口，就可以进去玩。', url: ART_GAME_URL, action: '进去玩' },
];
export const ARTWORK_WALL_POSITION = [-4.035, 1.96, 0.1];
export function wallSlots(artworks = PERSONAL_ARTWORKS) {
  const slots = artworks.slice(0, 6);
  while (slots.length < 3) slots.push({ id: `empty-${slots.length}`, title: '待上墙', pending: true });
  return slots;
}
