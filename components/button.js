export default function Button({ children, onClick = () => {} , attrs = {}, size = "large" }) {
  const {
    className,
    type: buttonType,
    ...buttonAttrs
  } = attrs;

  const largeButtonClassNames = [
    "bg-transparent",
    "inline-block",
    "text-red-600",
    "font-medium",
    "py-1.5",
    "text-xl",
  ];

  const smallButtonClassNames = [
    "bg-transparent",
    "inline-block",
    "text-red-600",
    "font-medium",
    "py-1.5"
  ];

  const sizeClassName =
    size === "large"
      ? largeButtonClassNames.join(" ")
      : smallButtonClassNames.join(" ");

  return (
    <button
      {...buttonAttrs}
      type={buttonType || "button"}
      onClick={onClick}
      className={`${className} ${sizeClassName}`}
    >
      {children}
    </button>
  );
}
