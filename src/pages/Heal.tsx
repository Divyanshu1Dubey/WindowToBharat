import { CategoryPage } from "@/components/site/CategoryPage";
import img from "@/assets/cat-heal.jpg";

const Heal = () => (
  <CategoryPage
    eyebrow="Programs · Heal"
    title="Heal in Bharat"
    image={img}
    description="World-class medical care, Ayurvedic retreats and wellness journeys across the subcontinent."
    highlights={[
      "Accredited hospitals and concierge medical coordination",
      "Ayurveda & Panchakarma retreats in Kerala",
      "Yoga and meditation residencies in Rishikesh",
      "End-to-end recovery and travel support",
    ]}
  />
);

export default Heal;
