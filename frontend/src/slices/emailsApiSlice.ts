import { apiSlice } from "./apiSlice";

const EMAILS_URL = '/api'

export const emailsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${EMAILS_URL}/register`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useRegisterMutation } = emailsApiSlice