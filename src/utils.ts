import { theme } from './theme';

export enum Cagegory {
  BUSINESS = 'Business',
  HEALTH = 'Health',
  ENVIRONMENT = 'Environment',
  SCIENCE = 'Science & Technology',
  FEELINGS = 'Feelings & Emotions',
}

export const getColor = (course: string) => {
  switch (course) {
    case Cagegory.BUSINESS:
      return theme.turquoise;
    case Cagegory.HEALTH:
      return theme.autumngreen;
    case Cagegory.ENVIRONMENT:
      return theme.green;
    case Cagegory.SCIENCE:
      return theme.violet;
    case Cagegory.FEELINGS:
      return theme.orange;
    default:
      const exhaustiveCheck: never = course as any;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
  }
};

export const getImageUrl = (course: string) => {
  switch (course) {
    case Cagegory.BUSINESS:
      return require('../assets/category_business.png');
    case Cagegory.HEALTH:
      return require('../assets/category_health.png');
    case Cagegory.ENVIRONMENT:
      return require('../assets/category_environment.png');
    case Cagegory.SCIENCE:
      return require('../assets/category_science.png');
    case Cagegory.FEELINGS:
      return require('../assets/category_feelings.png');
    default:
      const exhaustiveCheck: never = course as any;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
  }
};
