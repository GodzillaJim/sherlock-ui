import {
  camelCase,
  kebabCase,
  lowerCase,
  snakeCase,
  startCase,
  upperCase,
  upperFirst,
} from "lodash";
import { DropdownOption } from "../components/Dropdown";
import { Order, OrderStatus } from "../../graphql/common";
import { Theme } from "@mui/material";

export default class StringUtility {
  static toCamelCase(str: string) {
    return camelCase(str);
  }

  static toTitleCase(str: string) {
    return startCase(camelCase(str));
  }

  static toPascalCase(str: string) {
    return startCase(camelCase(str)).replace(/ /g, "");
  }

  static toConstantCase(str: string) {
    return upperCase(str).replace(/ /g, "_");
  }

  static toDotCase(str: string) {
    return lowerCase(str).replace(/ /g, ".");
  }

  static toKebabCase(str: string) {
    return kebabCase(str);
  }

  static toLowerCase(str: string) {
    return lowerCase(str).replace(/ /g, "");
  }

  static toPathCase(str: string) {
    return lowerCase(str).replace(/ /g, "/");
  }

  static toSnakeCase(str: string) {
    return snakeCase(str);
  }

  static toSentenceCase(str: string) {
    return upperFirst(lowerCase(str));
  }
}

export const isServerSide = () => typeof window === "undefined";
export const orderStatus = {
  draft: "DRAFT",
  active: "ACTIVE",
  completed: "COMPLETED",
  canceled: "CANCELED",
  inProgress: "IN_PROGRESS",
};

export const essayCategories = [
  "Business",
  "Psychology",
  "Engineering",
  "Literature",
  "History",
  "Medicine",
  "Economics",
  "Philosophy",
  "Science",
  "Art",
  "Environmental Studies",
  "Political Science",
  "Education",
  "Sociology",
  "Mathematics",
  "Information Technology",
  "Law",
  "Architecture",
  "Anthropology",
  "Biology",
  "Chemistry",
  "Physics",
  "Geography",
  "Music",
  "Theater and Drama",
  "Public Health",
  "Nursing",
  "Social Work",
  "Linguistics",
  "Religious Studies",
  "Other",
];

export const writingStyle = {
  apaV6: "APA6",
  apaV7: "APA7",
  mla: "MLA",
  harvard: "HARVARD",
};

export const paperType = {
  article: "ARTICLE",
  essay: "ESSAY",
  prompt: "PROMPT",
  review: "REVIEW",
  bibliography: "BIBLIOGRAPHY",
};

export const getOrderTypeOptions = (): DropdownOption[] => {
  return Object.entries(paperType).map(([key, value]) => ({
    label: startCase(key),
    value,
  }));
};

export const getWritingStyleOptions = () =>
  Object.entries(writingStyle).map(([key, value]) => ({
    label: startCase(key),
    value,
  }));

export const getStatusOptions = () => {
  return Object.entries(orderStatus).map(([key, value]) => ({
    label: startCase(key),
    value,
  }));
};

export const academicLevelOptions = {
  none: "NONE",
  highSchool: "HIGH_SCHOOL",
  undergraduate: "UNDERGRADUATE",
  postGraduate: "POST_GRADUATE",
};
export const getAcademicLevelOptions = () =>
  Object.entries(academicLevelOptions).map(([key, value]) => ({
    label: startCase(key),
    value,
  }));

export const getOrderStatusIndex = (status: OrderStatus) => {
  switch (status) {
    case "DRAFT":
      return 0;
    case "ACTIVE":
      return 1;
    case "IN_PROGRESS":
      return 2;
    case "COMPLETED":
      return 3;
    case "CANCELED":
      return -1;
    default:
      return 0;
  }
};

export type GetStatusColorProps = {
  background: string;
  color: string;
  tooltipMessage: string;
};

export const getStatusColor = (
  status: OrderStatus,
  theme: Theme
): GetStatusColorProps => {
  switch (status) {
    case "DRAFT":
      return {
        background: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light),
        tooltipMessage: "This order has not been published yet.",
      }; // Light grey
    case "ACTIVE":
      return {
        background: "#4caf50",
        color: "#ffffff",
        tooltipMessage:
          "The order has been submitted and work will start promptly",
      }; // Bright green
    case "IN_PROGRESS":
      return {
        background: theme.palette.info.main,
        color: theme.palette.getContrastText(theme.palette.info.main),
        tooltipMessage: "Work on this order has begun.",
      }; // Sky blue
    case "COMPLETED":
      return {
        background: theme.palette.success.main,
        color: theme.palette.getContrastText(theme.palette.success.main),
        tooltipMessage: "A response for this order is ready for collection.",
      }; // Gold
    case "CANCELED":
      return {
        background: theme.palette.error.main,
        color: theme.palette.getContrastText(theme.palette.error.main),
        tooltipMessage: "This order is not being worked on.",
      }; // Dark red
    default:
      return {
        background: theme.palette.common.black,
        color: theme.palette.getContrastText(theme.palette.common.black),
        tooltipMessage: "",
      };
  }
};

export const orderIsDeletable = (order: Order) =>
  ["DRAFT"].includes(order.status);

export const orderIsEditable = (order: Order) =>
  ["DRAFT", "ACTIVE"].includes(order.status);
