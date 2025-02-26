'use client'

import * as React from 'react'
import Link from 'next/link'
import { MenuIcon, X } from 'lucide-react'
import { Button } from '@/src/components/ui/button2'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/src/components/ui/sheet'

import { Accordion, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import { AccordionContent } from '@/src/components/ui/accordion'

interface MobileMenuProps {
  navItems: Array<{
    title: string
    href?: string
    items?: Array<{ title: string; href: string }>
  }>
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {navItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={item.title}>
                {item.items ? (
                  <>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="text-lg text-green-200 hover:text-amber-500"
                            onClick={() => setOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={item.href ?? '/'}
                    className="text-x flex h-12 w-full items-center justify-between border-b px-4 text-[1.66rem] uppercase font-medium text-gray-700 hover:text-amber-600"
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
        <div className="mt-6 space-y-4">
        
        </div>
      </SheetContent>
    </Sheet>
  )
}

