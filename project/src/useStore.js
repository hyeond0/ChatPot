import { create } from 'zustand';

const useStore = create((set) => ({
  select: [
    { type: '돼지고기', thumbnail: '🍖' },
    { type: '닭고기', thumbnail: '🍗' },
    { type: '소고기', thumbnail: '🥩' },
    { type: '대파', thumbnail: '🥬' },
    { type: '마늘', thumbnail: '🧄' },
    { type: '양파', thumbnail: '🧅' },
    { type: '달걀', thumbnail: '🥚' },
    { type: '감자', thumbnail: '🥔' },
    { type: '고구마', thumbnail: '🍠' },
    { type: '토마토', thumbnail: '🍅' },
    { type: '당근', thumbnail: '🥕' },
    { type: '파프리카', thumbnail: '🫑' },
    { type: '가지', thumbnail: '🍆' },
    { type: '옥수수', thumbnail: '🌽' },
    { type: '고추', thumbnail: '🌶️' },
    { type: '오이', thumbnail: '🥒' },
    { type: '아보카도', thumbnail: '🥑' },
    { type: '버섯', thumbnail: '🍄' },
    { type: '콩', thumbnail: '🫘' },
    { type: '치즈', thumbnail: '🧀' },
    { type: '사과', thumbnail: '🍎' },
    { type: '배', thumbnail: '🍐' },
    { type: '오렌지', thumbnail: '🍊' },
    { type: '레몬', thumbnail: '🍋' },
    { type: '바나나', thumbnail: '🍌' },
    { type: '수박', thumbnail: '🍉' },
    { type: '포도', thumbnail: '🍇' },
    { type: '딸기', thumbnail: '🍓' },
    { type: '블루베리', thumbnail: '🫐' },
    { type: '메론', thumbnail: '🍈' },
    { type: '복숭아', thumbnail: '🍑' },
    { type: '파인애플', thumbnail: '🍍' },
  ],
  selected: [],
  addSelected: (item) =>
    set((state) => ({ selected: [...state.selected, item] })),
  removeSelected: (item) =>
    set((state) => ({
      selected: state.selected.filter((element) => element !== item),
    })),
  initSelected: () => set({ selected: [] }),

  option: [
    '한식',
    '중식',
    '일식',
    '양식',
    '디저트',
    '간편식',
    '저렴한',
    '매콤한',
    '비건식',
    '파티음식',
    '오이 안들어간',
    '추운 날 먹기 좋은',
    '비 오는 날 먹기 좋은',
  ],
  pushOption: (item) => set((state) => ({ option: [...state.option, item] })),
  selectedOption: [],
  addOption: (item) =>
    set((state) => ({ selectedOption: [...state.selectedOption, item] })),
  removeOption: (item) =>
    set((state) => ({
      selectedOption: state.selectedOption.filter(
        (element) => element !== item
      ),
    })),
  initOption: () => set({ selectedOption: [] }),

  inputClick: true,
  toggleInputClick: () => set((state) => ({ inputClick: !state.inputClick })),

  receiveData: {
    dishName: '',
    elements: [],
    recipeSteps: [],
    introduction: '',
    messages: [],
  },
  setReceiveData: (data) => set({ receiveData: { ...data } }),
}));

export default useStore;
