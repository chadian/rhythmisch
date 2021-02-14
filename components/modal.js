import FocusLock from "react-focus-lock";

export default function Modal({ children }) {
  const classNames = [
    "absolute",
    "w-screen",
    "h-screen",
    "bg-white",
    "flex",
    "items-center",
    "justify-center",
    "z-10",
    "bg-filter-blur-modal",
  ];

  return (
    <FocusLock>
      <div role="dialog" aria-modal="true" className={classNames.join(' ')}>
        {children}
      </div>
    </FocusLock>
  );
}
