import {
  camelCase,
  kebabCase,
  lowerCase,
  snakeCase,
  startCase,
  upperCase,
  upperFirst,
} from "lodash";

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
