import { CategoryPage } from "@/components/site/CategoryPage";
import { Programs } from "@/components/site/Programs";
import img from "@/assets/cat-explore.jpg";

const Explore = () => (
  <CategoryPage
    eyebrow="Programs · Explore"
    title="Explore Bharat"
    image={img}
    description="Wander through palaces, deserts, backwaters and Himalayan trails on guided cultural journeys."
    highlights={[
      "Heritage walks in Jaipur, Delhi & Varanasi",
      "Desert nights in the Thar with local musicians",
      "Houseboat stays on Kerala's backwaters",
      "Small group sizes — never more than 12 travellers",
    ]}
  >
    <Programs />
  </CategoryPage>
);

export default Explore;
