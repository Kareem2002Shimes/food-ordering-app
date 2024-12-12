'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

type CustomLinkProps = NextLinkProps & {
  children: React.ReactNode;
  href: string;
  target?: string;
} & HTMLAttributes<HTMLAnchorElement>;

const Link: FC<CustomLinkProps> = ({ children, href, ...rest }) => {
  const [prefetching, setPrefetching] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const setPrefetchListener = () => {
    setPrefetching(true);
  };
  const removePrefetchListener = () => {
    setPrefetching(false);
  };
  useEffect(() => {
    const linkElement = linkRef.current;
    linkElement?.addEventListener('mouseover', setPrefetchListener);
    linkElement?.addEventListener('mouseleave', removePrefetchListener);
    return () => {
      linkElement?.removeEventListener('mouseover', setPrefetchListener);
      linkElement?.removeEventListener('mouseleave', removePrefetchListener);
    };
  }, [prefetching]);
  return (
    <NextLink href={href} ref={linkRef} prefetch={prefetching} {...rest}>
      {children}
    </NextLink>
  );
};

export default Link;
