export const IconHome = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z"
      fill="currentColor"
    />
  </svg>
);

export const IconFolder = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      d="M10 4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z"
      fill="currentColor"
    />
  </svg>
);

export const IconStar = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      d="M12 17.3l-5.4 3 1-6.1L3 9.7l6.2-.9L12 3l2.8 5.8 6.2.9-4.6 4.5 1 6.1-5.4-3Z"
      fill="currentColor"
    />
  </svg>
);

export const IconChart = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M4 19h16v2H4v-2Z" fill="currentColor" />
    <path d="M6 10h3v7H6v-7Z" fill="currentColor" />
    <path d="M11 6h3v11h-3V6Z" fill="currentColor" />
    <path d="M16 13h3v4h-3v-4Z" fill="currentColor" />
  </svg>
);

export const IconSave = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4Zm-5 16a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4-10H5V5h11v4Z"
      fill="currentColor"
    />
  </svg>
);

export const IconGame = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      d="M7 10h2v2H7v-2Zm3 0h2v2h-2v-2Zm3 0h2v2h-2v-2Zm-6 3h2v2H7v-2Zm8 0h2v2h-2v-2Z"
      fill="currentColor"
    />
    <path
      d="M6 7h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconLogout = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path
      d="M10 17l1.5-1.5L9 13h9v-2H9l2.5-2.5L10 7l-5 5 5 5Z"
      fill="currentColor"
    />
    <path
      d="M4 4h8v2H6v12h6v2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      fill="currentColor"
    />
  </svg>
);

export const IconChevron = ({ direction = "left", ...props }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
    {direction === "left" ? (
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);
