"use server"

import { actionClient } from "./safe-action"
import { registerSchema } from "@/types/register-schema"

export const register = actionClient.schema(registerSchema).action(async ({ parsedInput: { name, email, password } }) => {
    return {
        success: { name, email, password }
    }
})