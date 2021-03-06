<template>
    <form @submit.prevent="submitContactForm" :method="method" :action="url" class="w-full">
        <input type="hidden" name="_token" :value="csrfToken">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0 ">
                <div
                    class="border-b border-b-2"
                    :class="`border-${$store.getters.primaryThemeColour}-${$store.getters.primaryThemeColourShade}`">
                    <label
                        for="contact_name"
                        class="block uppercase tracking-wide text-xs font-bold mb-2"
                        :class="`text-${$store.getters.primaryThemeTextColour}`">
                    Name:
                </label>
                <input
                    type="text"
                    id="contact_name"
                    v-model="payload.name"
                    name="name"
                    placeholder="John Smith"
                    :class="`bg-${$store.getters.primaryThemeBgLighter} text-${$store.getters.primaryThemeTextColour} focus:bg-${$store.getters.primaryThemeBgDarkest}`"
                    class="appearance-none block w-full py-3 px-4 leading-tight focus:outline-none">
                </div>
                <form-error :errors="checkError('name')"></form-error>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
                <div
                    class="border-b border-b-2"
                    :class="`border-${$store.getters.primaryThemeColour}-${$store.getters.primaryThemeColourShade}`">
                    <label
                        for="contact_email"
                        class="block uppercase tracking-wide text-xs font-bold mb-2"
                        :class="`text-${$store.getters.primaryThemeTextColour}`">
                    Email:
                    </label>
                    <input
                        name="email"
                        id="contact_email"
                        type="email"
                        v-model="payload.email"
                        class="appearance-none block w-full py-3 px-4 leading-tight focus:outline-none"
                        :class="`bg-${$store.getters.primaryThemeBgLighter} text-${$store.getters.primaryThemeTextColour} focus:bg-${$store.getters.primaryThemeBgDarkest}`"
                        placeholder="john@example.com">
                </div>
                <form-error :errors="checkError('email')"></form-error>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <div
                    class="border-b border-b-2"
                    :class="`border-${$store.getters.primaryThemeColour}-${$store.getters.primaryThemeColourShade}`">
                    <label
                        for="contact_message"
                        class="block uppercase tracking-wide text-xs font-bold mb-2"
                        :class="`text-${$store.getters.primaryThemeTextColour}`">
                    Message:
                    </label>
                    <textarea
                        rows="10"
                        id="contact_message"
                        name="message"
                        v-model="payload.message"
                        placeholder="Hello, World!"
                        class="appearance-none block w-full py-3 px-4 leading-tight focus:outline-none"
                        :class="`bg-${$store.getters.primaryThemeBgLighter} text-${$store.getters.primaryThemeTextColour} focus:bg-${$store.getters.primaryThemeBgDarkest}`">
                    </textarea>
                </div>
                <form-error :errors="checkError('message')"></form-error>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 pl-3">
            <button
                type="submit"
                data-sitekey="6LeNtMYZAAAAAMfF8SBN1RijJJOyhu80ZxkZpSkk"
                data-callback='checkToken'
                data-action='submit'
                class="g-recaptcha flex-shrink-0 bg-transparent text-sm border py-1 px-2 rounded"
                :class="`border-${$store.getters.primaryThemeColour}-${$store.getters.primaryThemeColourShade} text-${$store.getters.primaryThemeColour}-${$store.getters.primaryThemeColourShade} hover:bg-${$store.getters.primaryThemeColour}-${$store.getters.primaryThemeColourShade} hover:text-${$store.getters.primaryThemeHoverTextColour}`">
                <font-awesome-icon :icon="['fas', 'check']" />
                Submit
            </button>
        </div>
    </form>
</template>
<script>

import FormErrors from '../../mixins/FormError';
import ContactService from '../../services/ContactService';
import RecaptureService from '../../services/RecaptureService';

export default{
    data: function(){
        return {
            list: '',
            payload: {
                name: '',
                email: '',
                message: '',
            },
        };
    },
    mixins: [FormErrors],
    props: {
        url: {
            type: String,
            default: "/"
        },
        method: {
            type: String,
            default: "GET"
        }
    },
    methods: {
        async submitContactForm(){

            await this.$recaptchaLoaded()
            const token = await this.$recaptcha('contact_me')
            const recaptureResponse = await RecaptureService.validateToken(token);

            if (recaptureResponse.data.success) {
                this.resetErrors();

                const contactResponse = await ContactService.store(this.payload).catch(error => {
                    if (error.response.status === 400) {
                        this.$swal(`Oops`, `Something went wrong.`, `error`);
                    }

                    this.errors = error.response.data.errors;
                });

                if (contactResponse.status === 201) {
                    await this.$swal(`Message Received`, `Thank you ${this.payload.name}`, `success`);
                    this.resetPayload();
                }
            }
        },
        resetPayload() {
            this.payload = {
                name: '',
                email: '',
                message: '',
            };
        }
    },
    computed: {
        csrfToken() {
            return document.head.querySelector('meta[name="csrf-token"]').content;
        },
    }
}
</script>
