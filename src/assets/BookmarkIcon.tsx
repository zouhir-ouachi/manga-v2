import React from "react";
export interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

const BookmarkIcon = ({
  width = 40,
  height = 40,
  className = "",
  color = "currentColor",
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
    >
      <path
        fill={color}
        d="M 6 2 C 5.861875 2 5.7278809 2.0143848 5.5976562 2.0410156 C 4.686084 2.2274316 4 3.033125 4 4 L 4 22 L 12 19 L 20 22 L 20 4 C 20 3.8625 19.985742 3.7275391 19.958984 3.5976562 C 19.799199 2.8163086 19.183691 2.2008008 18.402344 2.0410156 C 18.272119 2.0143848 18.138125 2 18 2 L 6 2 z"
      ></path>
    </svg>
  );
};

export default BookmarkIcon;
