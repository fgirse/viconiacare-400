import type { ReactNode } from "react";
import '@payloadcms/next/css'
import './custom.scss'

type Props = {
  children: ReactNode;
};

export default function PayloadGroupLayout({ children }: Props) {
  return <>{children}</>;
}

