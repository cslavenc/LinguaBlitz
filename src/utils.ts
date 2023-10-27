import { theme } from './theme';

export const getColor = (course: string) => {
  switch (course) {
    case 'Business':
      return theme.turquoise;
    case 'Health':
      return theme.autumngreen;
    case 'Environment':
      return theme.green;
    case 'Science & Technology':
      return theme.violet;
    case 'Feelings & Emotions':
      return theme.orange;
  }
};

export const getImageUrl = (course: string) => {
  switch (course) {
    case 'Business':
      return require('../assets/category_business.png');
    case 'Health':
      return require('../assets/category_health.png');
    case 'Environment':
      return require('../assets/category_environment.png');
    case 'Science & Technology':
      return require('../assets/category_science.png');
    case 'Feelings & Emotions':
      return require('../assets/category_feelings.png');
  }
};
