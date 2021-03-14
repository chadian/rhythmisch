import React from 'react';

let errorIdCount = 0;

const getErrorIdCount = () => errorIdCount;

export function ValidationWrapper({ hasSubmitted, error, children }) {
  const errorId = `vw-error-${getErrorIdCount()}`;
  const showError = hasSubmitted && error;

  const wrappedChildren = React.Children.map(children, child => {
    const isFormElement = ['select', 'input'].includes(child.type);
    if (!isFormElement) {
      return child;
    }

    const updatedClassName = [child.props.className, showError ? 'border-red-700' : ''].join(' ');

    return React.cloneElement(child, {
      className: updatedClassName,
      ["aria-invalid"]: showError ? true : false,
      ['aria-describedby']: showError ? errorId : null,
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
