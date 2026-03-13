"use client";

import { usePathname } from "next/navigation";

export const LoginIntro = () => {
  const pathname = usePathname() || "";
  const isCreateFirstUser = pathname.includes("/admin/create-first-user");

  const cardStyle = isCreateFirstUser
    ? {
        background:
          "linear-gradient(130deg, rgba(0, 153, 138, 0.2), rgba(254, 204, 0, 0.28))",
        border: "1px solid rgba(0, 153, 138, 0.28)",
        borderRadius: "0.95rem",
        marginBottom: "1rem",
        padding: "1rem 1.1rem",
      }
    : {
        background:
          "linear-gradient(135deg, rgba(254, 204, 0, 0.2), rgba(0, 153, 138, 0.12))",
        border: "1px solid rgba(29, 29, 27, 0.12)",
        borderRadius: "0.85rem",
        marginBottom: "1rem",
        padding: "0.85rem 1rem",
      };

  return (
    <div style={cardStyle}>
      <p
        style={{
          color: "#1d1d1b",
          fontSize: isCreateFirstUser ? "0.98rem" : "0.92rem",
          fontWeight: 700,
          margin: 0,
        }}
      >
        {isCreateFirstUser
          ? "Erstelle den ersten Admin-Benutzer"
          : "Willkommen im Viconia Care Admin"}
      </p>
      <p
        style={{
          color: "#575756",
          fontSize: "0.82rem",
          margin: "0.25rem 0 0",
        }}
      >
        {isCreateFirstUser
          ? "Lege jetzt den initialen Zugang fuer dein CMS-Team an."
          : "Bitte melde dich mit deinem CMS-Account an."}
      </p>
      {isCreateFirstUser ? (
        <p
          style={{
            color: "#1d1d1b",
            fontSize: "0.76rem",
            fontWeight: 600,
            letterSpacing: "0.01em",
            margin: "0.5rem 0 0",
            opacity: 0.86,
          }}
        >
          Schritt 1 von 1: Zugangsdaten vergeben und Benutzer speichern.
        </p>
      ) : null}
    </div>
  );
};
