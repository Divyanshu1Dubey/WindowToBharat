import { CategoryPage } from "@/components/site/CategoryPage";
import img from "@/assets/cat-study.jpg";

const Study = () => (
  <CategoryPage
    eyebrow="Programs · Study"
    title="Study in Bharat"
    image={img}
    description="Academic exchanges, language immersions and short courses with India's leading institutions."
    highlights={[
      "Sanskrit, Hindi & Tamil language intensives",
      "Semester exchanges with IITs and top universities",
      "Yoga, philosophy & classical arts residencies",
      "Visa, housing and mentorship support included",
    ]}
  />
);

export default Study;
