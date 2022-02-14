import React, { JSXElementConstructor, ReactElement } from 'react';
import { ReactChildrenProps } from '../../types';

let errorIdCount = 0;
const getErrorIdCount = () => errorIdCount++;

// eslint-disable-next-line react/prop-types
export function ValidationWrapper({
  hasSubmitted,
  error,
  children,
}: { hasSubmitted: boolean; error: string } & ReactChildrenProps) {
  const errorId = `vw-error-${getErrorIdCount()}`;
  const showError = hasSubmitted && error;

  const wrappedChildren = React.Children.map(
    children,
    (child: ReactElement<any, any>) => {
      const isFormElement = ['select', 'input'].includes(child?.type);
      if (!showError || !isFormElement) {
        return child;
      }

      const classNames = child.props.className
        .split(' ')
        .filter((className) => !className.match(/border-.+-[0-9]+/))
        .join(' ');

      const updatedClassName = [
        classNames,
        showError ? 'border-red-700' : '',
      ].join(' ');

      return React.cloneElement(child, {
        className: updatedClassName,
        ['aria-invalid']: true,
        ['aria-describedby']: errorId,
      });
    }
  );

  return (
    <div className="inline-block">
      {wrappedChildren}
      {showError ? (
        <div id={errorId} className="text-base mt-1 text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
