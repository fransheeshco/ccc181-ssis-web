"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
})

type SettingsValues = z.infer<typeof SettingsSchema>

export function SettingsForm() {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const onSubmit = (values: SettingsValues) => {
    // TODO: call your API endpoint
    console.log(values)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">User</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Your name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...form.register("email")}
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Logout
      </Button>
    </form>
  )
}
