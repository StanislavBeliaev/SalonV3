/**
 * Генерирует URL для категории в зависимости от уровня
 * @param categoryId - ID категории
 * @param level - Уровень категории (0 - главная, 1 - подкатегория)
 * @param parentId - ID родительской категории (для подкатегорий)
 * @returns URL для навигации
 */
export function getCategoryUrl(
  categoryId: number,
  level: number,
  parentId?: number
): string {
  // Если это категория уровня 0, переходим на страницу подкатегорий
  if (level === 0) {
    return `/category/${categoryId}`;
  }
  
  // Если это подкатегория (level 1), переходим на страницу услуг
  // Формат: /catalog/1/services?subcategoryId=12
  // Где 1 - это parentId, 12 - это categoryId
  if (level === 1 && parentId) {
    return `/category/${parentId}/services?subcategoryId=${categoryId}`;
  }
  
  return `/category/${categoryId}`;
}

