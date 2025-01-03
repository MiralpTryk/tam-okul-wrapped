import { createRouter, createWebHistory } from "vue-router";
import WrappedView from "@/views/WrappedView.vue";
import OpticFormView from "@/views/OpticFormView.vue";
import BrowseView from "@/views/BrowseView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import AnalysisView from "@/views/AnalysisView.vue";
import store from '@/store';

const routes = [
  {
    path: "/",
    redirect: "/404"
  },
  {
    path: "/:code",
    name: "wrapped",
    component: WrappedView,
    beforeEnter: (to, from, next) => {
      const codeRegex = /^[A-Z0-9]{8}$/;
      if (codeRegex.test(to.params.code)) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/optic-form/:code",
    name: "optic-form",
    component: OpticFormView,
    meta: { requiresAnalysis: true },
    beforeEnter: (to, from, next) => {
      const codeRegex = /^[A-Z0-9]{8}$/;
      if (codeRegex.test(to.params.code)) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/browse/:code",
    name: "browse",
    component: BrowseView,
    meta: { requiresAnalysis: true },
    beforeEnter: (to, from, next) => {
      const codeRegex = /^[A-Z0-9]{8}$/;
      if (codeRegex.test(to.params.code)) {
        if (from.query.section) {
          to.query.section = from.query.section;
        }
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
    props: route => ({ 
      section: route.query.section 
    })
  },
  {
    path: "/analysis/:code",
    name: "analysis",
    component: AnalysisView,
    meta: { requiresAnalysis: true },
    beforeEnter: (to, from, next) => {
      const codeRegex = /^[A-Z0-9]{8}$/;
      if (codeRegex.test(to.params.code)) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFoundView,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFound" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  // If route requires analysis data
  if (to.meta.requiresAnalysis) {
    // Check if we have the analysis data in store
    if (!store.state.userDetails || !store.state.courses) {
      // If no analysis data, redirect to NotFound with a custom message
      next({ 
        name: "NotFound",
        query: { 
          message: "Bu sayfaya erişmek için önce QR kodunuzu taratmanız gerekmektedir." 
        }
      });
      return;
    }
  }
  next();
});

export default router;
