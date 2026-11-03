import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Shared = {
  children: ReactNode
  variant?: 'sun' | 'ghost-light' | 'ghost-dark'
  className?: string
}

type AsLink = Shared &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    as?: 'a'
  }

type AsButton = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
    as?: 'button'
  }

export function Button({
  children,
  variant = 'sun',
  className = '',
  ...props
}: AsLink | AsButton) {
  const classes = `btn-fill btn-${variant} ${className}`.trim()

  if ('href' in props && props.href) {
    const { href, ...rest } = props
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
