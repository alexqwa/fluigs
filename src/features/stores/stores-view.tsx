'use client'

import z from 'zod'
import { useMemo, useState } from 'react'

import { Create } from '@/actions/admin/create'
import { UserInputSchema } from '@/generated/zod/schemas'
import { useDataOptimistic } from '@/hooks/use-data-optimistic'

import { Input } from '@/components/ui/input'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { StoreDataTable } from '@/components/tables/store-data-table'
import { FormCreateBranch } from '@/components/forms/form-create-branch'

const userSchemaInput = UserInputSchema.omit({
  id: true,
  role: true,
  image: true,
  fluigs: true,
  banned: true,
  accounts: true,
  sessions: true,
  banReason: true,
  updatedAt: true,
  createdAt: true,
  banExpires: true,
  emailVerified: true,
})

const userSchema = UserInputSchema.omit({
  role: true,
  image: true,
  banned: true,
  accounts: true,
  sessions: true,
  banReason: true,
  updatedAt: true,
  createdAt: true,
  banExpires: true,
  emailVerified: true,
})

type UserSchema = z.infer<typeof userSchema>
type UserSchemaInput = z.infer<typeof userSchemaInput>

export function StoresView({ users }: { users: UserSchema[] }) {
  const [store, setStore] = useState('')

  const optimistic = useDataOptimistic<UserSchema>(users)

  const filteredStores = useMemo(() => {
    return optimistic.data.filter((item) => {
      const search = store.toLowerCase().trim()

      const matchBranchOrStore =
        item.branch?.toString().includes(search) ||
        item.name.toLowerCase().includes(search)

      return matchBranchOrStore
    })
  }, [optimistic.data, store])

  function toStore(input: UserSchemaInput): UserSchema {
    return {
      ...input,
      id: crypto.randomUUID(),
      fluigs: [],
    }
  }

  function toUserSchema(
    createdUser: Awaited<ReturnType<typeof Create>>,
    input: UserSchemaInput
  ): UserSchema {
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      branch: input.branch,
      fluigs: [],
    }
  }

  async function handleCreate(data: UserSchemaInput) {
    const optimisticItem = toStore(data)
    const tempId = optimistic.add(optimisticItem)

    try {
      const createdUser = await Create(data)

      optimistic.confirmCreate(tempId, toUserSchema(createdUser, data))
    } catch {
      optimistic.rollback()
    }
  }

  return (
    <div className="mt-10 space-y-5">
      <div className="flex flex-col items-end gap-4 md:flex-row md:justify-between">
        <FieldGroup className="w-full">
          <Field orientation="vertical">
            <FieldLabel htmlFor="fieldgroup-code">Loja</FieldLabel>
            <Input
              id="fieldgroup-code"
              placeholder="Buscar loja"
              className="border-border bg-card border"
              value={store}
              onChange={(e) => setStore(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <FormCreateBranch onSubmit={handleCreate} />
      </div>
      <StoreDataTable data={filteredStores} optimistic={optimistic} />
    </div>
  )
}
