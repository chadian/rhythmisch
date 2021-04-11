import { default as NextLink } from "next/link";
import { useTheme } from "../hooks/theme/index";

export default function Link({
  attrs,
  href,
  underline,
  underlineOffset,
  children,
}) {
  const [theme] = useTheme();

  attrs = attrs ?? {};
  underline = underline ?? true;
  underlineOffset = underlineOffset ?? "sm";
  href = href ?? attrs.href;

  const classNames = (attrs.className ?? "").split(" ");
  classNames.push('cursor-pointer', theme.linkColor);

  if (underline) {
    classNames.push("underline");
    classNames.push(`underline-offset-${underlineOffset}`);
  }

  const className = classNames.join(" ");

  return (
    <NextLink href={href}>
      <span {...attrs} className={className}>
        {children}
      </span>
    </NextLink>
  );
}
