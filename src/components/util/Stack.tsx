const Stack = ({ children, gap }: React.PropsWithChildren<{ gap?: number | string }>) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap
      }}
    >
      {children}
    </div>
  );
};

export default Stack;
