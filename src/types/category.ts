export interface Category {
  id: number;
  name: string;
  parentId?: number | null; // null이면 대분류, 값이 있으면 소분류 (상위 카테고리 ID)
  // 추가적으로 description, icon 등 필요한 필드도 포함 가능
}
