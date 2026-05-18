import { CategoryPage } from "@/components/site/CategoryPage";
import img from "@/assets/cat-serve.jpg";

const Serve = () => (
  <CategoryPage
    eyebrow="Programs · Serve"
    title="Serve in Bharat"
    image={img}
    description="Volunteer, mentor and contribute to grassroots projects across education, technology and rural development."
    highlights={[
      "Teaching English & STEM in rural schools",
      "Tech-for-good fellowships with NGOs",
      "Healthcare outreach and community clinics",
      "1 to 12 month placements, fully supported",
    ]}
  />
);

export default Serve;
