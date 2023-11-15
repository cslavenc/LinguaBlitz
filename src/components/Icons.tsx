import React from 'react';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';

interface Icon {
  color?: string;
  size?: number;
}

export const HomeIcon: React.FC<Icon> = ({ color, size }) => {
  return (
    <Svg width={size} height={size} viewBox="0 1 511 511.999" fill={color}>
      <Path d="M498.7 222.695c-.016-.011-.028-.027-.04-.039L289.805 13.81C280.902 4.902 269.066 0 256.477 0c-12.59 0-24.426 4.902-33.332 13.809L14.398 222.55c-.07.07-.144.144-.21.215-18.282 18.386-18.25 48.218.09 66.558 8.378 8.383 19.44 13.235 31.273 13.746.484.047.969.07 1.457.07h8.32v153.696c0 30.418 24.75 55.164 55.168 55.164h81.711c8.285 0 15-6.719 15-15V376.5c0-13.879 11.293-25.168 25.172-25.168h48.195c13.88 0 25.168 11.29 25.168 25.168V497c0 8.281 6.715 15 15 15h81.711c30.422 0 55.168-24.746 55.168-55.164V303.14h7.719c12.586 0 24.422-4.903 33.332-13.813 18.36-18.367 18.367-48.254.027-66.633zm-21.243 45.422a17.03 17.03 0 01-12.117 5.024H442.62c-8.285 0-15 6.714-15 15v168.695c0 13.875-11.289 25.164-25.168 25.164h-66.71V376.5c0-30.418-24.747-55.168-55.169-55.168H232.38c-30.422 0-55.172 24.75-55.172 55.168V482h-66.71c-13.876 0-25.169-11.29-25.169-25.164V288.14c0-8.286-6.715-15-15-15H48a13.9 13.9 0 00-.703-.032c-4.469-.078-8.66-1.851-11.8-4.996-6.68-6.68-6.68-17.55 0-24.234.003 0 .003-.004.007-.008l.012-.012L244.363 35.02A17.003 17.003 0 01256.477 30c4.574 0 8.875 1.781 12.113 5.02l208.8 208.796.098.094c6.645 6.692 6.633 17.54-.031 24.207zm0 0" />
    </Svg>
  );
};

export const CategoryOverviewTab: React.FC<Icon> = ({ color, size }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 60.123 60.123" fill={color}>
      <Path d="M57.124 51.893H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6zM57.124 33.062H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6zM57.124 14.231H16.92a3 3 0 110-6h40.203a3 3 0 01.001 6z" />
      <Circle cx={4.029} cy={11.463} r={4.029} />
      <Circle cx={4.029} cy={30.062} r={4.029} />
      <Circle cx={4.029} cy={48.661} r={4.029} />
    </Svg>
  );
};

export const SpeechBubbleIcon: React.FC<Icon> = ({ color }) => {
  return (
    <Svg
      width={122}
      height={99}
      viewBox="0 0 122 99"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G filter="url(#filter0_d_18_116)">
        <Path
          d="M62.168.293C31.206-.421 5.673 18.026 5.131 41.508 4.898 51.644 9.37 61.031 16.997 68.506 14.022 78.743 4.657 87.708 4.545 87.808a1.544 1.544 0 00-.37 1.77c.271.62.876 1.002 1.577 1.018 14.517.335 25.55-5.913 31.03-9.794 7.102 2.679 15.017 4.313 23.425 4.507 30.962.714 56.495-17.733 57.037-41.215C117.785 20.612 93.13 1.007 62.168.293z"
          fill="#000"
          fillOpacity={0.51}
          shapeRendering="crispEdges"
        />
        <Text
          x="60"
          y="55"
          fill="white"
          fontSize="36"
          fontWeight="bold"
          textAnchor="middle">
          C1
        </Text>
      </G>
    </Svg>
  );
};

export const SearchIcon = () => {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21 20.9999L16.65 16.6499"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const VocabularyIcon = () => {
  return (
    <Svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        id="Vector"
        d="M15.2344 14.0625H21.875V1.17188C21.875 0.522461 21.3525 0 20.7031 0H1.17188C0.522461 0 0 0.522461 0 1.17188V20.7031C0 21.3525 0.522461 21.875 1.17188 21.875H14.0625V15.2344C14.0625 14.5898 14.5898 14.0625 15.2344 14.0625ZM21.5332 16.748L16.748 21.5332C16.5283 21.7529 16.2305 21.875 15.918 21.875H15.625V15.625H21.875V15.9229C21.875 16.2305 21.7529 16.5283 21.5332 16.748Z"
        fill="#E5AA12"
      />
    </Svg>
  );
};

export const RightArrow = () => {
  return (
    <Svg
      width="13"
      height="21"
      viewBox="0 0 13 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        id="Vector"
        d="M12.6553 11.3163L3.12171 20.6621C2.66208 21.1127 1.91646 21.1127 1.45683 20.6621L0.344787 19.5719C-0.114355 19.1217 -0.114845 18.3927 0.342826 17.9416L7.89855 10.5002L0.343314 3.05838C-0.114847 2.6073 -0.113866 1.87826 0.345276 1.42814L1.45732 0.337949C1.91695 -0.112651 2.66257 -0.112651 3.1222 0.337949L12.6553 9.68416C13.1149 10.1348 13.1149 10.8657 12.6553 11.3163Z"
        fill="black"
      />
    </Svg>
  );
};

export const UserIcon = ({ size, color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      className="bi bi-person-circle"
      viewBox="0 0 16 16">
      <Path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <Path
        fill-rule="evenodd"
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
      />
    </Svg>
  );
};

export const BookmarkPlusIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="black"
      className="bi bi-bookmark-plus"
      viewBox="0 0 16 16">
      <Path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
      <Path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z" />
    </Svg>
  );
};

export const BookmarkFilledIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="red"
      className="bi bi-bookmark-fill"
      viewBox="0 0 16 16">
      <Path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
    </Svg>
  );
};

export const FlashcardIcon = () => {
  return (
    <Svg
      fill="#000000"
      width="26"
      height="26"
      viewBox="0 0 256 256"
      id="Flat-flashcard"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M184.00781,76h-144a12.01343,12.01343,0,0,0-12,12V200a12.01343,12.01343,0,0,0,12,12h144a12.01343,12.01343,0,0,0,12-12V88A12.01343,12.01343,0,0,0,184.00781,76Zm4,124a4.00458,4.00458,0,0,1-4,4h-144a4.00458,4.00458,0,0,1-4-4V88a4.00458,4.00458,0,0,1,4-4h144a4.00458,4.00458,0,0,1,4,4Zm40-144V176a4,4,0,0,1-8,0V56a4.00458,4.00458,0,0,0-4-4h-152a4,4,0,0,1,0-8h152A12.01343,12.01343,0,0,1,228.00781,56Z" />
    </Svg>
  );
};

export const FlashcardFilledIcon = () => {
  return (
    <Svg
      fill="red"
      width="26"
      height="26"
      viewBox="0 0 256 256"
      id="Flat-flashcard-filled"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M200.00781,88V200a16.01833,16.01833,0,0,1-16,16h-144a16.01833,16.01833,0,0,1-16-16V88a16.01833,16.01833,0,0,1,16-16h144A16.01833,16.01833,0,0,1,200.00781,88Zm16-48h-152a8,8,0,0,0,0,16h152V176a8,8,0,0,0,16,0V56A16.01833,16.01833,0,0,0,216.00781,40Z" />
    </Svg>
  );
};
