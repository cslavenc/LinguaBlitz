import { theme } from './theme';
import {
  ActivitiesIcon,
  ArtIcon,
  BusinessIcon,
  CommunicationIcon,
  EducationIcon,
  EmotionsIcon,
  EntertainmentIcon,
  EnvironmentIcon,
  FashionIcon,
  HealthIcon,
  IndustryIcon,
  PhilosophyIcon,
  ScienceIcon,
  SocietyIcon,
  TechnologyIcon,
  TravelIcon,
} from './components/CategoryIcons';

export enum Category {
  ART = 'Art',
  ENTERTAINMENT = 'Entertainment',
  COMMUNICATION = 'Communication',
  FASHION = 'Fashion',
  EDUCATION = 'Education',
  SCIENCE = 'Science',
  BUSINESS = 'Business',
  ENVIRONMENT = 'Environment',
  TECHNOLOGY = 'Technology',
  INDUSTRY = 'Industry',
  SOCIETY = 'Society',
  ACTIVITIES = 'Activities',
  PHILOSOPHY = 'Philosophy',
  TRAVEL = 'Travel',
  HEALTH = 'Health',
  EMOTIONS = 'Emotions',
  MY_VOCABULARY = 'My Vocabulary',
}

export const CategoryData = () => {
  let data = [];
  const keys = Object.keys(Category);
  const values = Object.values(Category);
  keys.forEach((key, idx) => data.push({ label: values[idx], value: key }));
  return data;
};

export const getColor = (course: string) => {
  switch (course) {
    case Category.ART:
      return theme.turquoise;
    case Category.BUSINESS:
      return theme.turquoise;
    case Category.HEALTH:
      return theme.autumngreen;
    case Category.ENVIRONMENT:
      return theme.green;
    case Category.SCIENCE:
      return theme.violet;
    case Category.EMOTIONS:
      return theme.orange;
    default:
      // const exhaustiveCheck: never = course as any;
      // throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
      return theme.autumngreen;
  }
};

export const getCategoryIcon = (course: string) => {
  switch (course) {
    case Category.ART:
      return <ArtIcon />;
    case Category.ENTERTAINMENT:
      return <EntertainmentIcon />;
    case Category.COMMUNICATION:
      return <CommunicationIcon />;
    case Category.FASHION:
      return <FashionIcon />;
    case Category.EDUCATION:
      return <EducationIcon />;
    case Category.SCIENCE:
      return <ScienceIcon />;
    case Category.BUSINESS:
      return <BusinessIcon />;
    case Category.ENVIRONMENT:
      return <EnvironmentIcon />;
    case Category.TECHNOLOGY:
      return <TechnologyIcon />;
    case Category.INDUSTRY:
      return <IndustryIcon />;
    case Category.SOCIETY:
      return <SocietyIcon />;
    case Category.ACTIVITIES:
      return <ActivitiesIcon />;
    case Category.PHILOSOPHY:
      return <PhilosophyIcon />;
    case Category.TRAVEL:
      return <TravelIcon />;
    case Category.HEALTH:
      return <HealthIcon />;
    case Category.EMOTIONS:
      return <EmotionsIcon />;
    // TODO : my vocabulary
    //case Category.MY_VOCABULARY:
    //  return null;
    default: // TODO : remove default
      // const exhaustiveCheck: never = course as any;
      // throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
      return <ArtIcon />;
  }
};
