import { useTheme } from "../hooks/theme/index";

export default function Link({ attrs, underline, underlineOffset, children }) {
  const [ theme ] = useTheme();

  attrs = attrs ?? {};
  underline = underline ?? true;
  underlineOffset = underlineOffset ?? 'sm';

  const classNames = (attrs.className ?? "").split(" ");
  classNames.push(theme.linkColor);
  if (underline) {
    classNames.push("underline");
    classNames.push(`underline-offset-${underlineOffset}`);
  }
  const className = classNames.join(" ");

  return (
    <a {...attrs} className={className}>
      {children}
    </a>
  );
}
