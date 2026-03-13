/**
 * Role-Based Access Control (RBAC)
 *
 * Role hierarchy (highest → lowest):
 *   superadmin  – unrestricted access to everything
 *   admin       – manage all business data and users
 *   editor      – create/update content & care records, no delete
 *   user        – read-only access to patient-facing content
 */

import type { Access, FieldAccess } from "payload";

export type UserRole = "superadmin" | "admin" | "editor" | "user";

/** Minimal shape of an authenticated Payload user (pre-generated-types). */
type AuthUser = { role?: UserRole; [key: string]: unknown } | null | undefined;

const hasRole = (user: AuthUser, ...roles: UserRole[]): boolean =>
  !!user && roles.includes(user.role as UserRole);

// ── Collection-level access ──────────────────────────────────────────────────

/** Only superadmin – system-level operations */
export const isSuperAdmin: Access = ({ req: { user } }) =>
  hasRole(user, "superadmin");

/** superadmin | admin */
export const isAdminOrAbove: Access = ({ req: { user } }) =>
  hasRole(user, "superadmin", "admin");

/** superadmin | admin | editor */
export const isEditorOrAbove: Access = ({ req: { user } }) =>
  hasRole(user, "superadmin", "admin", "editor");

/** Any authenticated user (all four roles) */
export const isLoggedIn: Access = ({ req: { user } }) => !!user;

// ── Field-level access ────────────────────────────────────────────────────────

/** Field readable/writable only by admin+ (e.g. the role field itself) */
export const adminOnlyField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, "superadmin", "admin");

// ── admin.hidden helpers ─────────────────────────────────────────────────────
// Payload types hidden()'s user arg as ClientUser (collections) or
// UntypedUser (globals), both of which carry [key: string]: unknown.
// Using Record<string, unknown> to be compatible with both.

type HiddenArg = { user: Record<string, unknown> | null };

/** Hide this collection/global in the sidebar for anyone below admin. */
export const hiddenFromNonAdmins = ({ user }: HiddenArg): boolean =>
  !["superadmin", "admin"].includes((user?.role as string) ?? "");

/** Hide this collection/global in the sidebar for anyone below superadmin. */
export const hiddenFromNonSuperAdmins = ({ user }: HiddenArg): boolean =>
  user?.role !== "superadmin";

/**
 * Read by all logged-in users, write (create/update/delete) by editor+.
 * Used for patient-facing care content.
 */
export const careContentAccess = {
  read: isLoggedIn,
  create: isEditorOrAbove,
  update: isEditorOrAbove,
  delete: isAdminOrAbove,
} as const;

/**
 * Fully restricted to admin+. Used for HR, finance, routing.
 */
export const adminContentAccess = {
  read: isAdminOrAbove,
  create: isAdminOrAbove,
  update: isAdminOrAbove,
  delete: isAdminOrAbove,
} as const;

/**
 * CMS content: editor+ writes, admin+ deletes.
 */
export const cmsContentAccess = {
  read: isEditorOrAbove,
  create: isEditorOrAbove,
  update: isEditorOrAbove,
  delete: isAdminOrAbove,
} as const;
