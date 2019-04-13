
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// Requires statements
require('./bootstrap');
require('./helpers.js');

// Imports statements
import Components from './components';
import VueRouter from 'vue-router';
import routes from './routes.js';

// Plugins
import VueSweetalert2 from 'vue-sweetalert2';

// Window attachments
window.Vue = require('vue');
window.moment = require('moment');

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
};

// Vue use statements
Vue.use(VueRouter);
Vue.use(VueSweetalert2, options);

// Frontend
    // Forms
        Vue.component('contact-form',      require('./components/front/forms/ContactForm.vue'));
        Vue.component('login-form',        require('./components/front/forms/LoginForm.vue'));
    // Modals
    // Includes
        Vue.component('front-nav',         require('./components/front/includes/Nav.vue'));
        Vue.component('front-footer',      require('./components/front/includes/Footer.vue'));
    //Generic
        Vue.component('particles',         require('./components/front/generic/Particles.vue'));
        Vue.component('tag',               require('./components/front/generic/Tag.vue'));
    //Lists
        Vue.component('languages',          require('./components/front/lists/Languages.vue'));
        Vue.component('projects',          require('./components/front/lists/Projects.vue'));
        Vue.component('tweets',            require('./components/front/lists/TwitterTimeline.vue'));
// Backend
    // Forms
    // Modals
        Vue.component('languages-create-modal',   require('./components/back/language/CreateLanguageModal.vue'));
    // Tables
        Vue.component('languages-table',   require('./components/back/language/LanguagesTable.vue'));
        Vue.component('contacts-table',    require('./components/back/contact/ContactTable.vue'));
        Vue.component('projects-table',    require('./components/back/project/ProjectsTable.vue'));
        Vue.component('repository-table',  require('./components/back/repository/RepositoryTable.vue'));
        Vue.component('tweets-table',      require('./components/back/twitter/TweetsTable.vue'));
    // Includes
        Vue.component('back-nav',          require('./components/back/includes/Nav.vue'));
    // Generic
// Generic
    Vue.component('back-modal',             require('./components/generic/Modal.vue'));
    Vue.component('back-nav-link',          require('./components/generic/NavLink.vue'));
    Vue.component('text-input',             require('./components/generic/TextInput.vue'));
    Vue.component('file-input',             require('./components/generic/FileInput.vue'));
    Vue.component('form-group',             require('./components/generic/FormGroup.vue'));
    Vue.component('form-error',             require('./components/generic/FormError.vue'));
    Vue.component('textarea-input',         require('./components/generic/TextareaInput.vue'));
    Vue.component('outline-button',         require('./components/generic/OutlineButton.vue'));

Vue.component('project-create',    require('./components/back/project/Create.vue'));
Vue.component('home-view',         require('./components/front/views/HomeView.vue'));
Vue.component('login-view',        require('./components/front/views/LoginView.vue'));
Vue.component('contact-view',      require('./components/back/views/ContactView.vue'));
Vue.component('privacy-policy-view',        require('./components/front/views/PrivacyPolicyView'));

// Filters
Vue.filter('format-moment-dd/mm/yyyy', (value) => {
    if (!value) return '';
    return moment(value).isValid() ? moment(value).format("DD/MM/YYYY") : '';
});

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

// Router
const router = new VueRouter({
    mode: "history",
    base: "/",
    routes,
});

// Vue App
const app = new Vue({
    el: '#app',
    router,
});
