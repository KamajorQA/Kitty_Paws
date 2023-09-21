import { ReactNode } from 'react';

interface IBaseLink {
  href: string;
  children: ReactNode;
}

function BaseLink({ href, children }: IBaseLink) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export { BaseLink };
