import { cn, type ClassValue } from "./utils"

type ConfigSchema = Record<string, Record<string, ClassValue>>
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: keyof T[Variant] | null | undefined
}
type ConfigVariantsMulti<T extends ConfigSchema> = {
  [Variant in keyof T]?: keyof T[Variant] | (keyof T[Variant])[] | null | undefined
}

type Config<T extends ConfigSchema> = {
  variants?: T
  defaultVariants?: ConfigVariants<T>
  compoundVariants?: Array<ConfigVariants<T> & { class: ClassValue }>
}

export type VariantProps<Component extends (...args: any) => any> = Omit<
  Parameters<Component>[0],
  "class" | "className"
>

export function cva<T extends ConfigSchema>(base?: ClassValue, config?: Config<T>) {
  return (props?: ConfigVariantsMulti<T> & { class?: ClassValue; className?: ClassValue }) => {
    if (!config?.variants) {
      return cn(base, props?.class, props?.className)
    }

    const { variants, defaultVariants, compoundVariants } = config

    const classes: ClassValue[] = [base]

    // Apply variant classes
    for (const variantName in variants) {
      const variantValue = props?.[variantName as keyof typeof props] ?? defaultVariants?.[variantName]
      const variantClasses = variants[variantName]

      if (variantValue != null) {
        classes.push(variantClasses[variantValue as keyof typeof variantClasses])
      }
    }

    // Apply compound variants
    if (compoundVariants) {
      for (const compound of compoundVariants) {
        let matches = true
        for (const key in compound) {
          if (key === "class") continue
          const variantValue =
            props?.[key as keyof typeof props] ?? defaultVariants?.[key as keyof typeof defaultVariants]
          if (variantValue !== compound[key as keyof typeof compound]) {
            matches = false
            break
          }
        }
        if (matches) {
          classes.push(compound.class)
        }
      }
    }

    classes.push(props?.class, props?.className)

    return cn(...classes)
  }
}
