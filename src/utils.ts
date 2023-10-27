import { theme } from './theme';

export enum Category {
  BUSINESS = 'Business',
  HEALTH = 'Health',
  ENVIRONMENT = 'Environment',
  SCIENCE = 'Science & Technology',
  FEELINGS = 'Feelings & Emotions',
}

export const getColor = (course: string) => {
  switch (course) {
    case Category.BUSINESS:
      return theme.turquoise;
    case Category.HEALTH:
      return theme.autumngreen;
    case Category.ENVIRONMENT:
      return theme.green;
    case Category.SCIENCE:
      return theme.violet;
    case Category.FEELINGS:
      return theme.orange;
    default:
      const exhaustiveCheck: never = course as any;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
  }
};

export const getImageUrl = (course: string) => {
  switch (course) {
    case Category.BUSINESS:
      return require('../assets/category_business.png');
    case Category.HEALTH:
      return require('../assets/category_health.png');
    case Category.ENVIRONMENT:
      return require('../assets/category_environment.png');
    case Category.SCIENCE:
      return require('../assets/category_science.png');
    case Category.FEELINGS:
      return require('../assets/category_feelings.png');
    default:
      const exhaustiveCheck: never = course as any;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
  }
};
