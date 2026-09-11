import { useParams } from 'react-router';
import { CaseLayout, type CaseStudyContent } from '../components/case-study/CaseLayout';
import { HireCta } from '../components/sections/HireCta';
import { aiProductInnovation } from '../content/case-studies/ai-product-innovation';
import { attGenaiVirtualAssistant } from '../content/case-studies/att-genai-virtual-assistant';
import { verizonDigitalCommerce } from '../content/case-studies/verizon-digital-commerce';
import { NotFoundPage } from './NotFoundPage';

const CONTENT: Record<string, CaseStudyContent> = Object.fromEntries(
  [attGenaiVirtualAssistant, verizonDigitalCommerce, aiProductInnovation].map((c) => [c.slug, c])
);

export function CaseStudyPage() {
  const { slug = '' } = useParams();
  const content = CONTENT[slug];
  if (!content) return <NotFoundPage />;
  return (
    <>
      <CaseLayout content={content} />
      <HireCta location={`case_${slug}`} />
    </>
  );
}
