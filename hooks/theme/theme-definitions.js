export const themeDefinitions = {
  swiss: {
    stripeBgClass: "bg-red-600",
    occurrenceClosedHitBgColor: "bg-red-600",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-red-600",
    buttonBgColor: "bg-transparent",
    linkColor: "text-red-600",
  },

  edmonton: {
    stripeBgClass: "bg-gray-300",
    occurrenceClosedHitBgColor: "bg-gray-400",
    occurrenceClosedMissBgColor: "bg-gray-50",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-gray-500",
    buttonBgColor: "bg-transparent",
    linkColor: "text-gray-500",
  },

  portland: {
    stripeBgClass: "bg-green-800",
    occurrenceClosedHitBgColor: "bg-green-800",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-green-900",
    buttonBgColor: "bg-transparent",
    linkColor: "text-green-900",
  },

  ubahn: {
    stripeBgClass: "bg-yellow-400",
    occurrenceClosedHitBgColor: "bg-yellow-400",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-yellow-600",
    buttonBgColor: "bg-transparent",
    linkColor: "text-yellow-600",
  },

  webog: {
    stripeBgClass: "bg-blue-700",
    occurrenceClosedHitBgColor: "bg-blue-700",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-blue-700",
    buttonBgColor: "bg-transparent",
    linkColor: "text-blue-700",
  },
};

export const DEFAULT_THEME = "webog";
export const themeKeys = Object.keys(themeDefinitions);
