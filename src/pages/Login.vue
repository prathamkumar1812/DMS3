<template>
    <div class="card w-full h-full flex justify-center items-center">
        <Toast />
        <div class="p-4 flex items-center gap-2.5 flex-col w-1/3 border-2 border-red-100">
            <h2 class="mb-[20px] text-3xl text-center">Login</h2>
            <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
                <FormField v-slot="$field" as="section" name="username" initialValue="" class="flex flex-col gap-2">
                    <InputText type="text" placeholder="Email" />
                    <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                        {{ $field.error?.message }}
                    </Message>
                </FormField>
                <FormField v-slot="$field" asChild name="password" initialValue="">
                    <section class="flex flex-col gap-2">
                        <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
                        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
                            {{ $field.error?.message }}
                        </Message>
                    </section>
                </FormField>
                <Button type="submit" severity="secondary" label="Submit" />
            </Form>
            <div>
                <p class="font-light">
                    Don't have an account?
                    <span>
                        <router-link to="/sign-up" class="underline font-light ml-1 text-[#0ce69e]">Sign up</router-link>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

export default {
    data() {
        return {
            resolver: zodResolver(
                z.object({
                    username: z.string().email({ message: 'Email is required.' }),
                    password: z.string().min(8, { message: 'Minimum 8 characters.' })
                })
            )
        };
    },
    methods: {
        async onFormSubmit({ valid, values }) {
            if (valid) {
                try {
                    const data = await this.$store.dispatch("loginUser", values);
                      window.location.href = '/';

                    this.$toast.add({ severity: 'success', summary: 'User Login successfully.', life: 3000 });
                } catch (error) {
                    this.$toast.add({ severity: 'warn', summary: 'Something went wrong.', life: 3000 });
                }
            }
        }
    }
};
</script>
