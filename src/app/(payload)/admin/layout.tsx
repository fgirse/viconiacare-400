import type React from 'react'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import type { ServerFunctionClientArgs } from 'payload'
import { importMap } from './importMap.js'
import '@payloadcms/next/css'
import '../custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction = async function (args: ServerFunctionClientArgs) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default async function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
