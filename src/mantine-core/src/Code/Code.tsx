import React from 'react';
import cx from 'clsx';
import { DefaultProps, useMantineTheme } from '@mantine/theme';
import useStyles from './Code.styles';

interface CodeProps extends DefaultProps, React.ComponentPropsWithoutRef<'code'> {
  /** Code content */
  children: React.ReactNode;

  /** Code color and background from theme */
  color?: string;

  /** True for code block, false for inline code */
  block?: boolean;
}

export function Code({
  children,
  themeOverride,
  block = false,
  className,
  color = 'gray',
  ...others
}: CodeProps) {
  const classes = useStyles({ color, theme: useMantineTheme() });

  if (block) {
    return (
      <pre className={cx(classes.code, classes.pre, className)} {...others}>
        {children}
      </pre>
    );
  }

  return (
    <code className={cx(classes.code, className)} {...others}>
      {children}
    </code>
  );
}

Code.displayName = '@mantine/core/Code';