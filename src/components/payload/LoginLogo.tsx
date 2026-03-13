export const LoginLogo = () => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "0.75rem",
        marginBottom: "1rem",
      }}
    >
      <span
        aria-hidden
        style={{
          background: "#fecc00",
          borderRadius: "9999px",
          display: "inline-block",
          height: "1rem",
          width: "1rem",
        }}
      />
      <span
        style={{
          color: "#1d1d1b",
          fontSize: "1.125rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        Viconia Care
      </span>
    </div>
  );
};
