import React from 'react';

let errorIdCount = 0;

const getErrorIdCount = () => errorIdCount;

export function ValidationWrapper({ hasSubmitted, error, children }) {
  const errorId = `vw-error-${getErrorIdCount()}`;
  const showError = hasSubmitted && error;

  const wrappedChildren = React.Children.map(children, child => {
    const isFormElement = ['select', 'input'].includes(child.type);
    if (!showError || !isFormElement) {
      return child;
    }

    console.log(child.props.className);

    const classNames = child.props.className
      .split(' ')
      .filter((className) => !className.match(/border-.+-[0-9]+/))
      .join(' ');

    const updatedClassName = [
      classNames,
      showError ? "border-red-700" : "",
    ].join(" ");

    return React.cloneElement(child, {
      className: updatedClassName,
      ["aria-invalid"]: true,
      ['aria-describedby']: errorId,
    });
  });

  return (
    <div
      className="inline-block">
      {wrappedChildren}
      {showError ? (
        <div id={errorId} className="text-base mt-1 text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
