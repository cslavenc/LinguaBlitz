/*
 * Copyright (c) 2024 LinguaBlitz.
 */

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
} from './screens/category/CategoryIcons';
import { StyleSheet, Text, View } from 'react-native';

export const CUSTOM_WORDS_KEY = 'CUSTOM_WORDS';
export const PRELOADED_WORDS_KEY = 'PRELOADED_WORDS';

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
  OTHERS = 'Other',
  MY_VOCABULARY = 'My Vocabulary',
}

export const categoryValues = Object.values(Category);

export const CategoryData = () => {
  let data = [];
  const keys = Object.keys(Category);
  const values = Object.values(Category);
  keys.forEach((key, idx) => data.push({ label: values[idx], value: key }));
  return data;
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
    case Category.MY_VOCABULARY:
      return (
        <View>
          <Text style={styles.text}>My Vocabulary</Text>
        </View>
      );
    case Category.OTHERS:
      return (
        <View>
          <Text style={styles.text}>Other Words</Text>
        </View>
      );
    default:
      const exhaustiveCheck: never = course as any;
      throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
