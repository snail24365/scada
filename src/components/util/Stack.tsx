import { CSSObject, Interpolation, Theme } from '@emotion/react';

const Stack = ({
  children,
  gap,
  sx,
  direction
}: React.PropsWithChildren<{ gap?: number | string; sx?: Interpolation<Theme>; direction?: 'row' | 'column' }>) => {
  direction = direction ?? 'column';

  return (
    <div
      css={[
        {
          display: 'flex',
          flexDirection: direction,
          gap
        },
        sx
      ]}
    >
      {children}
    </div>
  );
};

export default Stack;
