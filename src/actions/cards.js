import { CATEGORY, ALL_CATEGORIES, CATEGORY_DATA } from './types';

export const setCategory = ( payload ) => (
    {
      type: CATEGORY,
      payload: payload,
    }
  );
export const setCategories = ( payload ) => (
    {
      type: ALL_CATEGORIES,
      payload: payload,
    }
  );
export const setCategoryData = ( payload ) => (
    {
      type: CATEGORY_DATA,
      payload: payload,
    }
  );