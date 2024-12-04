import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import QuestionView from "@/views/QuestionView.vue";
import RecordView from "@/views/RecordView.vue";
import StudentDashboardView from "@/views/StudentDashboardView.vue";
import StudentTestDetailsView from "@/views/StudentTestDetailsView.vue";
import StudentTestsView from "@/views/StudentTestsView.vue";
import StudentQuestionDetailsView from "@/views/StudentQuestionDetailsView.vue";
import StudentMessagesView from "@/views/StudentMessagesView.vue";
import StudentQuestionDetails from "@/components/StudentQuestionDetails.vue";
import StudentTrialsView from "@/views/StudentTrialsView.vue";
import StudentTrialDetailsView from "@/views/StudentTrialDetailsView.vue";
import SimpleTestView from "@/views/SimpleTestView.vue";
import WrappedView from "@/views/WrappedView.vue";
import OpticFormView from "@/views/OpticFormView.vue";
import AnalysisView from "@/views/AnalysisView.vue";
const routes = [
  {
    path: "/",
    name: "student-dashboard",
    component: StudentDashboardView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/canvas",
    name: "canvas",
    component: QuestionView,
    props: true,
  },
  {
    path: "/simple-test",
    name: "simple-test",
    component: SimpleTestView,
  },
  {
    path: "/record",
    name: "record",
    component: RecordView,
  },
  {
    path: "/tests/:testId",
    name: "StudentTestDetails",
    component: StudentTestDetailsView,
    props: true,
  },
  {
    path: "/tests",
    name: "StudentTests",
    component: StudentTestsView,
    props: true,
  },
  {
    path: "/trials",
    name: "StudentTrials",
    component: StudentTrialsView,
    props: true,
  },
  {
    path: "/student-test/:testId/question/:questionId",
    name: "QuestionDetails",
    component: StudentQuestionDetailsView,
  },
  {
    path: "/messages",
    name: "StudentMessages",
    component: StudentMessagesView,
  },
  {
    path: "/question-details",
    name: "question-details",
    component: StudentQuestionDetails,
  },
  {
    path: "/trials/:trialId",
    name: "StudentTrialDetails",
    component: StudentTrialDetailsView,
    props: true,
  },
  {
    path: "/wrapped",
    name: "Wrapped",
    component: WrappedView,
  },
  {
    path: "/optic-form",
    name: "OpticForm",
    component: OpticFormView,
  },
  {
    path: "/analysis",
    name: "Analysis",
    component: AnalysisView,
  },
];

const domain = window.location.hostname;
const subdomain = domain.substring(0, domain.indexOf("."));
const isLocal = process.env.VUE_APP_ENV === "local";

let baseURL = "";
if (isLocal) {
  baseURL = "https://34000010" + process.env.VUE_APP_URL;
} else {
  baseURL = "https://" + subdomain + process.env.VUE_APP_URL;
}

const router = createRouter({
  history: createWebHashHistory(baseURL),
  routes,
});

export default router;
