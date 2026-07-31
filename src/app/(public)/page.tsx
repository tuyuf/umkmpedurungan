export const revalidate = 300;

import { getActiveBanners } from "@/actions/banner";
import { getAllTestimonials } from "@/actions/testimonial";
import { getUmkmCards } from "@/actions/umkm";
import { getStats } from "@/actions/stats";
import { getAboutContent, getMetricsContent } from "@/actions/site-content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroBlock } from "@/components/hero-block";
import { AboutSection } from "@/components/about-section";
import { MetricsSection } from "@/components/metrics-section";
import { UmkmPreviewSection } from "@/components/umkm-preview-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { FaqSection } from "@/components/faq-section";

export default async function HomePage() {
  const [banners, { data: umkmList }, testimonials, stats, aboutContent, metricsContent] =
    await Promise.all([
      getActiveBanners(),
      getUmkmCards(1, "", "", "newest", "", 8),
      getAllTestimonials(),
      getStats(),
      getAboutContent(),
      getMetricsContent(),
    ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroBlock banners={banners} />
        <AboutSection
          title={aboutContent.title}
          paragraph1={aboutContent.paragraph1}
          paragraph2={aboutContent.paragraph2}
        />
        <MetricsSection
          totalUmkm={stats.totalUmkm}
          totalActiveUmkm={stats.totalActiveUmkm}
          totalCategories={stats.totalCategories}
          totalTestimonials={stats.totalTestimonials}
          sectionTitle={metricsContent.sectionTitle}
          label1={metricsContent.label1}
          label2={metricsContent.label2}
          label3={metricsContent.label3}
          label4={metricsContent.label4}
        />
        <UmkmPreviewSection umkmList={umkmList} />
        <TestimonialSection testimonials={testimonials} />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
