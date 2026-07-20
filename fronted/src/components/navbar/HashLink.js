"use client";

export default function HashLink({ href, children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.hash = href.replace("#", "");
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
