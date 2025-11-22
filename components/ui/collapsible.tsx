"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { motion } from "motion/react"

const CollapsibleContext = React.createContext<{ open?: boolean }>({})

function Collapsible({
  open,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsibleContext.Provider value={{ open }}>
      <CollapsiblePrimitive.Root data-slot="collapsible" open={open} {...props} />
    </CollapsibleContext.Provider>
  )
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const context = React.useContext(CollapsibleContext)
  
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      forceMount
      asChild
      {...props}
    >
      <motion.div
        initial={false}
        animate={{
          height: context.open ? "auto" : 0,
          opacity: context.open ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ overflow: "hidden" }}
      >
        {children}
      </motion.div>
    </CollapsiblePrimitive.CollapsibleContent>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
